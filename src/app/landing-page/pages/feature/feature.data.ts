import { baseUrl } from '../../../../environment';
import { Product } from './feature.types';

export var dataProducts: Product[] = [];

const fetchProducts = async () => {
  try {
    const response = await fetch(`${baseUrl}/getAllProducts`);
    const dbProducts = await response.json();

    dataProducts = [];
    for (const dbProduct of dbProducts) {
      const product: Product = {
        name: dbProduct.nombre,
        description: dbProduct.descripcion,
        price: dbProduct.precio,
        stock: dbProduct.stock,
        category_id: dbProduct.id_categoria,
        imgPreview: dbProduct.imagen_url,
        id: dbProduct.id_producto,
      };
      dataProducts.push(product);
    }
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

fetchProducts();
