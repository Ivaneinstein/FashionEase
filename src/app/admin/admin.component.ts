import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { ViewProductsComponent } from './pages/view-products/view-products.component';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [NavBarComponent, FooterComponent, AddProductComponent, ViewProductsComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',

})
export class AdminComponent {
  

  
}
