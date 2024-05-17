import { ProductType } from '@/types/products';

const Products: React.FC<{
  products: ProductType[];
  setProductToPurchase: React.Dispatch<React.SetStateAction<ProductType | null>>;
}> = ({ products, setProductToPurchase }) => {
  return products.map((product) => (
    <div className='relative' key={product._id}>
      <div className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80'>
        <img
          src='https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
          alt='Placeholder'
          className='h-full w-full object-cover object-center lg:h-full lg:w-full'
        />
      </div>
      <div className='mt-4 flex justify-between'>
        <div>
          <h3 className='text-md font-semibold text-gray-700'>{product.name}</h3>
          <p className='mt-1 text-sm text-gray-500'>{product.description}</p>
          <p className='mt-1 text-xs text-gray-400'>Stock: {product.quantity}</p>
        </div>
        <p className='text-sm font-medium text-gray-900'>
          {new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(
            product.price,
          )}
        </p>
      </div>
      <button
        onClick={() => setProductToPurchase(product)}
        type='button'
        className='justify-center w-full text-white my-2 bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-3 text-center inline-flex items-center me-2 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800'
      >
        <svg
          className='w-3.5 h-3.5 me-2'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='currentColor'
          viewBox='0 0 18 21'
        >
          <path d='M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z' />
        </svg>
        Purchase
      </button>
    </div>
  ));
};

export default Products;
