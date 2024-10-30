import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { dataProducts } from './cart.data';
import { Product } from '../landing-page/pages/feature/feature.types';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  readonly user: number = 1;
  allProducts: any[] =  dataProducts;
  finalPrice: number = 0;

  constructor() {
    this.finalPrice = this.getPrice();
  }

  getPrice() {
    for (const item of this.allProducts) {
      this.finalPrice += item.price * item.cantidad;
    }
    return this.finalPrice;
  }

  
}
