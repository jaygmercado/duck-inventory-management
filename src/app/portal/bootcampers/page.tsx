'use client';

import { ColumnDef } from '@tanstack/react-table';
import Table from '@/components/Table';
import DeleteButton from '@/components/Table/DeleteButton';
import EditButton from '@/components/Table/EditButton';
import { useBootcampers } from './layout';
import { User } from '@/types/users';
import notify from '@/utils/notify';

const deleteUser = async (itemId: string) => {
  const res = await fetch(`/api/users/${itemId}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('unable to delete user');
  return await res.json().then((res) => res.data as User);
};

export default function Home() {
  const { bootcampers, setBootcampers } = useBootcampers();

  const columns: ColumnDef<User>[] = [
    {
      id: 'name',
      header: 'Name',
      accessorKey: 'name',
    },
    {
      id: 'email',
      header: 'Email',
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
              deleteUser(item.getValue() as string)
                .then((deletedUser) =>
                  setBootcampers((state) =>
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

  return <Table itemClass='Users' DATA={bootcampers} COLUMNS={columns} />;
}
