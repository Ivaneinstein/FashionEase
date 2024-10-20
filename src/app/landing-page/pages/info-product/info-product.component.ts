import { Component, Input } from '@angular/core';

@Component({
  selector: 'info-product',
  standalone: true,
  imports: [],
  templateUrl: './info-product.component.html',
  styleUrl: './info-product.component.css'
})
export class InfoProductComponent {
  
  
  @Input() product: any; 

}
