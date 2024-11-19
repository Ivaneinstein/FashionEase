import { Component } from '@angular/core';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

import {
  HlmCarouselComponent,
  HlmCarouselContentComponent,
  HlmCarouselItemComponent,
} from '@spartan-ng/ui-carousel-helm';
import { CommonModule } from '@angular/common';
import { baseUrl } from '../../environment';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule,
    HlmInputDirective,
    HlmButtonDirective,
    HlmCarouselComponent,
    HlmCarouselContentComponent,
    HlmCarouselItemComponent,
    HttpClientModule,],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  constructor(private http: HttpClient, private router: Router) {}
  carouselItems: string[] = ['/Banner1.png', '/Banner2.png', '/Banner3.png'];
  email: string = '';
  password: string = '';

  trackById(index: number, item: string): string {
    return item;
  }

  SignIn() {
    console.log(`email: ${this.email}, password ${this.password}`);
    this.http
      .get(`${baseUrl}/SignIn/${this.email}/${this.password}`, {})
      .subscribe(
        (response: any) => {
          if (response.rol == 'cliente') {
            this.router.navigate(['/']);
            localStorage.setItem("id", response.id_usuario)
          } else {
            this.router.navigate(['/admin']);
          }
        },
        (error: any) => {
          console.log(error);
        }
      );



  }

  passwordField(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.password = inputElement.value;
  }
  emailField(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.email = inputElement.value;
  }
}
