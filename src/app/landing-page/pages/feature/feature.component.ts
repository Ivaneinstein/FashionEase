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

}
