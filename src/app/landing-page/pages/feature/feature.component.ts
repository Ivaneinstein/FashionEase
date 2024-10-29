
import { Component } from '@angular/core';
import { dataProducts } from './feature.data';
import { CommonModule } from '@angular/common';
import { Product } from './feature.types';

@Component({
  selector: 'feature',
  standalone: true,
  imports: [CommonModule, ],
  templateUrl: './feature.component.html',
  styleUrl: './feature.component.css'
})
export class FeatureComponent {
  allProducts: Product[] = dataProducts
  
  async addToCart(usuario: number, producto: string, cantidad: string) {
    try {
      const randomId = Math.floor(Math.random() * 1000) + 1;
      const response = await fetch(
        `https://us-central1-fashionease-438818.cloudfunctions.net/db-queries/addCartProduct?id_carrito=${randomId}&id_usuario=${usuario}&id_producto=${producto}&cantidad=${cantidad}`
      );

      if (response.ok) {
        const data = await response.json();
        console.log('Product added to cart:', data);
      } else {
        console.error('Failed to add product to cart', response.statusText);
      }
    } catch (error) {
      console.error('Error occurred while adding product to cart:', error);
    }
  }
}
