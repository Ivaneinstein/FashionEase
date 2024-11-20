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
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { toast } from 'ngx-sonner';
import { HlmToasterComponent } from '@spartan-ng/ui-sonner-helm';
@Component({
  selector: 'login-page',
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
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  constructor(private http: HttpClient, private router: Router) {}
  
  carouselItems: string[] = ['/Banner1.png', '/Banner2.png', '/Banner3.png'];
  trackById(index: number, item: string): string {
    return item;
  }


  email: string = '';
  password: string = '';

  passwordField(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.password = inputElement.value;
  }
  emailField(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.email = inputElement.value;
  }
  

  SignIn() {
    console.log(`email: ${this.email}, password ${this.password}`);
    this.http
      .get(`${baseUrl}/SignIn/${this.email}/${this.password}`, {})
      .subscribe(
        (response: any) => {
          if (response.rol == 'cliente') {
            this.router.navigate(['/']);
            localStorage.setItem('id', response.id_usuario);
            this.showToast('Login successfully');
          } else {
            this.router.navigate(['/admin']);
          }
        },
        (error: any) => {
          console.log(error);
          this.showToast('There was an error loggin in');
        }
      );
  }

  

  showToast(msg: string) {
    toast('Status Sign In', {
      description: msg,
    });
  }

  recoverPassword() {
    const password = this.generateRandomPassword();

    const body = {
      txt: `Your one time password recover is: ${password}\nPlease dont forget to change your password on User Profile to prevent forgetting it again.\n\nFashion Ease Corporation.`,
      sender: this.email,
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.http.post(`${baseUrl}/sendTextEmail`, body, { headers }).subscribe(
      (response: any) => {
        console.log(response);
        this.showToast('Email sent successfully');
      },
      (error: any) => {
        console.log(error);
        this.showToast('There was an error sending email');
      }
    );

    this.http
      .put(`${baseUrl}/updatePassword/${this.email}/${password}`, {})
      .subscribe(
        (response: any) => {
          console.log(response);
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  generateRandomPassword(): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
    let password = '';
    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }
    return password;
  }
}
