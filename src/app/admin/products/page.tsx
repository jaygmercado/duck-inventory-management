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

export default function Products() {
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
      accessorKey: 'price',
    },
    {
      id: 'quantity',
      header: 'Quantity',
      accessorKey: 'quantity',
    },
    {
      id: 'category',
      header: 'category',
      accessorKey: 'category',
    },
    {
      id: 'supplier',
      header: 'Supplier',
      accessorKey: 'supplier',
    },
    {
      id: 'actions',
      header: 'Actions',
      accessorKey: '_id',
      cell: (item) => (
        <div className='space-x-2'>
          <EditButton updateLink={`/admin/products/update/${item.getValue()}`} />
          <DeleteButton
            onDelete={() =>
              deleteProduct(item.getValue() as string)
                .then((deletedProduct) =>
                  setProducts((state) =>
                    state.filter((productItem) => productItem._id !== deletedProduct._id),
                  ),
                )
                .catch(() => notify('Error', 'Unable to delete product'))
            }
          />
        </div>
      ),
      enableSorting: false,
    },
  ];
  return <Table itemClass='Products' DATA={products} COLUMNS={columns} />;
}
