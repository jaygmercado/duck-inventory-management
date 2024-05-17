import { ProductType } from '@/types/products';

const Products: React.FC<{
  products: ProductType[];
  setProductToPurchase: React.Dispatch<React.SetStateAction<ProductType | null>>;
}> = ({ products, setProductToPurchase }) => {
  return products.map((product) => (
    <div key={product._id}>
      <p>Name: {product.name}</p>
      <p>Description:{product.description}</p>
      <p>In stock:{product.quantity}</p>
      <p>
        Price:
        {new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(
          product.price,
        )}
      </p>
      <button onClick={() => setProductToPurchase(product)}>Purchase</button>
    </div>
  ));
};

export default Products;
