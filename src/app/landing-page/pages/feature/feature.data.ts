import { Product } from './feature.types';

export var dataProducts: Product[] = [];

const mapProduct = (dbProduct: any): Product => ({
  name: dbProduct.nombre, 
  description: dbProduct.descripcion,  
  price: dbProduct.precio,
  stock: dbProduct.stock, 
  category_id: dbProduct.id_categoria, 
  imgPreview: dbProduct.imagen_url   
});

const fetchProducts = async () => {
  try {
    const response = await fetch('http://34.27.183.203:8080/products/getAllProducts');
    const dbProducts = await response.json(); 


    dataProducts = dbProducts.map((dbProduct: any) => mapProduct(dbProduct));

    console.log(dataProducts);  
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

fetchProducts();