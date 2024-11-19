import { Component } from '@angular/core';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

import {
  HlmCarouselComponent,
  HlmCarouselContentComponent,
  HlmCarouselItemComponent,
} from '@spartan-ng/ui-carousel-helm';
import { CommonModule } from '@angular/common';
import { baseUrl, localhost } from '../../environment';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { toast } from 'ngx-sonner';
import { HlmToasterComponent } from '@spartan-ng/ui-sonner-helm';
@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    HlmInputDirective,
    HlmButtonDirective,
    HlmCarouselComponent,
    HlmCarouselContentComponent,
    HlmCarouselItemComponent,
    HttpClientModule,
    HlmToasterComponent,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  constructor(private http: HttpClient, private router: Router) {}
  carouselItems: string[] = ['/Banner1.png', '/Banner2.png', '/Banner3.png'];
  email: string = '';
  password: string = '';
  name: string = '';
  address: string = '';
  phone: string = '';

  trackById(index: number, item: string): string {
    return item;
  }

  SignUp() {
    const userData = {
      name: this.name,
      email: this.email,
      password: this.password,
      address: this.address,
      phone: this.phone,
    };

    console.log(userData);

    this.http.post(`${baseUrl}/SignUp`, userData).subscribe(
      (response: any) => {
        console.log(response);
        this.router.navigate(['/']);
        localStorage.setItem('id', response.userId);
        this.showToast('User created successfully');

      },
      (error: any) => {
        console.log(error);
        if (error.message.contains('Duplicate entry')) {
          this.showToast(error.message);
        }
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
  nameField(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.name = inputElement.value;
  }
  addressField(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.address = inputElement.value;
  }
  phoneField(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.phone = inputElement.value;
  }

  showToast(msg: string) {
    toast('Status Sign Up', {
      description: msg,
    });
  }
}
