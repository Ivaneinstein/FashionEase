import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { dataProducts } from './cart.data';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'] 
})
export class CartComponent {
  readonly user: number = 6;
  allProducts: any[] = dataProducts; 


  
}
