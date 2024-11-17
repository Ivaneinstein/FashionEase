import { Component } from '@angular/core';
import { CarrouselComponent } from "./pages/carrousel/carrousel.component";
import { FeatureComponent } from "./pages/feature/feature.component";  
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';
@Component({
  selector: 'landing-page',
  standalone: true,
  imports: [ CarrouselComponent, FeatureComponent, NavBarComponent,
    FooterComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
  
}

