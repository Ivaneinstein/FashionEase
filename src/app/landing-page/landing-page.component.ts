import { Component } from '@angular/core';
import { CarrouselComponent } from "./pages/carrousel/carrousel.component";
import { FeatureComponent } from "./pages/feature/feature.component";  
@Component({
  selector: 'landing-page',
  standalone: true,
  imports: [ CarrouselComponent, FeatureComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
}

