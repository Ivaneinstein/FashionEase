import { Component } from '@angular/core';
import { CarrouselComponent } from "./pages/carrousel/carrousel.component";
import { FeatureComponent } from "./pages/feature/feature.component";  
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'landing-page',
  standalone: true,
  imports: [ CarrouselComponent, FeatureComponent, NavBarComponent,
    FooterComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

ngOnInit() {
  const receiptUrl = this.route.snapshot.queryParamMap.get('receiptUrl');

  if (receiptUrl) {
    this.downloadReceipt(receiptUrl);
  }
}

downloadReceipt(receiptUrl: string) {
  this.http.get(receiptUrl, { responseType: 'blob' }).subscribe(
    (response: Blob) => {
      const blob = new Blob([response], { type: 'application/xml' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'receipt.xml';
      a.click();
      window.URL.revokeObjectURL(url);
      this.router.navigate(['/']);
    },
    (error) => {
      console.error("Error downloading receipt:", error);
    }
  );
}
}

