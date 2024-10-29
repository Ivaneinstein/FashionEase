import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router'; 
import { CartComponent } from '../cart/cart.component';
import { LandingPageComponent } from '../landing-page/landing-page.component';

@Component({
  selector: 'nav-bar',
  standalone: true,
  imports: [RouterLink, CartComponent, LandingPageComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  constructor(private router: Router) {}

  goToCart() {
    this.router.navigate(['cart']);
  }
}
