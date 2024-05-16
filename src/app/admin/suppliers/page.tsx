'use client';

import { ColumnDef } from '@tanstack/react-table';
import Table from '@/components/Table';
import DeleteButton from '@/components/Table/DeleteButton';
import EditButton from '@/components/Table/EditButton';
import { useSuppliersContext } from './layout';
import { SupplierType } from '@/types/suppliers';
import notify from '@/utils/notify';

const deleteSupplier = async (itemId: string) => {
  const res = await fetch(`/api/suppliers/${itemId}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('unable to delete supplier');
  return await res.json().then((res) => res.data as SupplierType);
};

export default function Products() {
  const { suppliers, setSuppliers } = useSuppliersContext();

  const columns: ColumnDef<SupplierType>[] = [
    {
      id: 'name',
      header: 'Name',
      accessorKey: 'name',
    },
    {
      id: 'contactNumber',
      header: 'Contact Number',
      accessorKey: 'contactNumber',
    },
    {
      id: 'email',
      header: 'Email',
      accessorKey: 'email',
    },
    {
      id: 'website',
      header: 'Website',
      accessorKey: 'website',
    },
    {
      id: 'actions',
      header: 'Actions',
      accessorKey: '_id',
      cell: (item) => (
        <div className='space-x-2'>
          <EditButton updateLink={`/admin/suppliers/update/${item.getValue()}`} />
          <DeleteButton
            onDelete={() =>
              deleteSupplier(item.getValue() as string)
                .then((deletedSupplier) => {
                  setSuppliers((state) =>
                    state.filter((supplierItem) => supplierItem._id !== deletedSupplier._id),
                  );
                })
                .catch(() => notify('Error', 'Unable to delete supplier'))
            }
          />
        </div>
      ),
      enableSorting: false,
    },
  ];
  return <Table itemClass='Suppliers' DATA={suppliers} COLUMNS={columns} />;
}
