import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { FeatureComponent } from './landing-page/pages/feature/feature.component';
import { CarrouselComponent } from './landing-page/pages/carrousel/carrousel.component';

@Component({
  selector: 'Wrapper',
  standalone: true,
  imports: [
    RouterOutlet,
    NavBarComponent,
    SidebarComponent,
    LandingPageComponent,
    FooterComponent,
    HttpClientModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'FashionEase';

}
