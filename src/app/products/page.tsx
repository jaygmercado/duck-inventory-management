'use client';

import { ColumnDef } from '@tanstack/react-table';
import Table from '@/components/Table';
import DeleteButton from '@/components/Table/DeleteButton';
import EditButton from '@/components/Table/EditButton';
import { useProductsContext } from './layout';
import { ProductType } from '@/types/products';
import notify from '@/utils/notify';

const deleteProduct = async (itemId: string) => {
  const res = await fetch(`/api/products/${itemId}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('unable to delete product');
  return await res.json().then((res) => res.data as ProductType);
};

export default function Users() {
  const { products, setProducts } = useProductsContext();

  const columns: ColumnDef<ProductType>[] = [
    {
      id: 'name',
      header: 'Name',
      accessorKey: 'name',
    },
    {
      id: 'price',
      header: 'Price',
      accessorKey: 'email',
    },
    {
      id: 'quantity',
      header: 'Quantity',
      accessorKey: 'email',
    },
    {
      id: 'category',
      header: 'category',
      accessorKey: 'email',
    },
    {
      id: 'supplier',
      header: 'Supplier',
      accessorKey: 'email',
    },
    {
      id: 'actions',
      header: 'Actions',
      accessorKey: '_id',
      cell: (item) => (
        <div className='space-x-2'>
          <EditButton updateLink={`/portal/users/update/${item.getValue()}`} />
          <DeleteButton
            onDelete={() =>
              deleteProduct(item.getValue() as string)
                .then((deletedUser) =>
                  setProducts((state) =>
                    state.filter((userItem) => userItem._id != deletedUser._id),
                  ),
                )
                .catch(() => notify('Error', 'Unable to delete user'))
            }
          />
        </div>
      ),
      enableSorting: false,
    },
  ];
  return <Table itemClass='Users' DATA={products} COLUMNS={columns} />;
}
