import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from './feature.types';
import { baseUrl } from '../../../../environment';

@Component({
  selector: 'feature',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.css'],
})
export class FeatureComponent implements OnInit {
  allProducts: Product[] = []; // Local state for products

  async ngOnInit() {
    await this.fetchProducts();
  }

  async fetchProducts() {
    try {
      const response = await fetch(
        `${baseUrl}/getAllProducts`
      );
      const dbProducts = await response.json();

      this.allProducts = dbProducts.map((dbProduct: any) => ({
        name: dbProduct.nombre,
        description: dbProduct.descripcion,
        price: dbProduct.precio,
        stock: dbProduct.stock,
        category_id: dbProduct.id_categoria,
        imgPreview: dbProduct.imagen_url,
        id: dbProduct.id_producto,
      }));
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  async addToCart(usuario: number, producto: string, cantidad: string) {
    try {
      const response = await fetch(
        `${baseUrl}/addCartProduct`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id_usuario: usuario,
            id_producto: producto,
            cantidad: cantidad,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log('Product added to cart:', data);
      } else {
        const errorDetails = await response.text();
        console.error(
          'Failed to add product to cart:',
          response.statusText,
          'Details:',
          errorDetails
        );
      }
    } catch (error) {
      console.error('Error occurred while adding product to cart:', error);
    }
  }
}
