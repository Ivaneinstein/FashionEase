import { Product } from './feature.types';

export var dataProducts: Product[] = [];

const mapProduct = (dbProduct: any): Product => ({
  name: dbProduct.nombre, 
  description: dbProduct.descripcion,  
  price: dbProduct.precio,
  stock: dbProduct.stock, 
  category_id: dbProduct.id_categoria, 
  imgPreview: dbProduct.imagen_url,
  id: dbProduct.id_producto  
});
 
const fetchProducts = async () => {
  try {
    const response = await fetch('https://us-central1-fashionease-438818.cloudfunctions.net/db-queries/getAllProducts');
    const dbProducts = await response.json(); 


    dataProducts = dbProducts.map((dbProduct: any) => mapProduct(dbProduct));

  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

fetchProducts();