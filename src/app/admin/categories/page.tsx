'use client';

import { ColumnDef } from '@tanstack/react-table';
import Table from '@/components/Table';
import DeleteButton from '@/components/Table/DeleteButton';
import EditButton from '@/components/Table/EditButton';
import { useCategoriesContext } from './layout';
import { CategoryType } from '@/types/categories';
import notify from '@/utils/notify';

const deleteCategory = async (itemId: string) => {
  const res = await fetch(`/api/categories/${itemId}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('unable to delete category');
  return await res.json().then((res) => res.data as CategoryType);
};

export default function Categories() {
  const { categories, setCategories } = useCategoriesContext();

  const columns: ColumnDef<CategoryType>[] = [
    {
      id: 'name',
      header: 'Name',
      accessorKey: 'name',
    },
    {
      id: 'actions',
      header: 'Actions',
      accessorKey: '_id',
      cell: (item) => (
        <div className='space-x-2'>
          <EditButton updateLink={`/admin/categories/update/${item.getValue()}`} />
          <DeleteButton
            onDelete={() =>
              deleteCategory(item.getValue() as string)
                .then((deletedCategory) =>
                  setCategories((state) =>
                    state.filter((categoryItem) => +categoryItem._id !== +deletedCategory._id),
                  ),
                )
                .catch(() => notify('Error', 'Unable to delete category'))
            }
          />
        </div>
      ),
      enableSorting: false,
    },
  ];
  return <Table itemClass='Categories' DATA={categories} COLUMNS={columns} />;
}
