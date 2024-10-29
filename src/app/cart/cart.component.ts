import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'] 
})
export class CartComponent {
  readonly user: number = 6;
  allProducts: any[] = []; 

  constructor() {
    this.loadCartData(); 
  }

  async loadCartData() {
    try {
      this.allProducts = await this.getCardData(this.user); 
    } catch (error) {
      console.error('Error loading cart data:', error);
      // Puedes agregar más lógica para manejar el error, como mostrar un mensaje al usuario
    }
  }

  async getCardData(userId: number): Promise<any[]> { // Especifica que devuelve un array
    const response = await fetch(`https://us-central1-fashionease-438818.cloudfunctions.net/db-queries/getCartByUserId/${userId}`); // Usa userId
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json(); 
  }
}
