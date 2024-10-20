import { Component } from '@angular/core';
import { dataProducts } from './feature.data';
import { CommonModule } from '@angular/common';
import { InfoProductComponent } from '../info-product/info-product.component';
import { Product } from './feature.types';

@Component({
  selector: 'feature',
  standalone: true,
  imports: [CommonModule, InfoProductComponent],
  templateUrl: './feature.component.html',
  styleUrl: './feature.component.css'
})
export class FeatureComponent {
  allProducts: Product[] = dataProducts
  selectedProduct: Product | null = null

  infoProduct(item: Product) {
    this.selectedProduct = item;
    console.log('Selected Product:', this.selectedProduct);
  }
}
