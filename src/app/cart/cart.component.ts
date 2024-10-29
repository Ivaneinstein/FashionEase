import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'] // Corrected property name
})
export class CartComponent {
  allProducts: any[] = []; // Initialize with an empty array

  constructor() {
    this.loadCartData(); // Call method to load cart data on initialization
  }

  async loadCartData() {
    const ids = await this.getCartIds(); // Await the promise to get cart IDs
    this.allProducts = await this.getCardData(ids); // Await the promise to get card data
  }

  async getCartIds(): Promise<string[]> {
    const response = await fetch('getCart'); // Fetch the cart IDs
    return response.json(); // Return parsed JSON data
  }

  async getCardData(ids: string[]): Promise<any[]> {
    const response = await fetch('getCardData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ids }), // Send IDs in the request body
    });
    return response.json(); // Return parsed JSON data
  }
}
