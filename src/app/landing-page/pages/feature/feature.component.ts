
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { dataProducts } from './feature.data';

@Component({
  selector: 'feature',
  standalone: true,
  imports: [CommonModule, ],
  templateUrl: './feature.component.html',
  styleUrl: './feature.component.css'
})
export class FeatureComponent {
  allProducts =  dataProducts
  
  async addToCart(usuario: number, producto: string, cantidad: string) {
    try {
  
      const response = await fetch('https://fashion-ease-db-queries-840520918801.us-central1.run.app/addCartProduct',
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
        const errorDetails = await response.text(); // Get more details from the response
        console.error('Failed to add product to cart:', response.statusText, 'Details:', errorDetails);
      }
    } catch (error) {
      console.error('Error occurred while adding product to cart:', error);
    }
  }
  
}
