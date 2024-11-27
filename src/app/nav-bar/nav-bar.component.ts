import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { HlmAvatarComponent } from '@spartan-ng/ui-avatar-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { provideIcons } from '@ng-icons/core';
import { lucideUserCog, lucideSearch, lucideItalic, lucideHistory, lucideShoppingCart} from '@ng-icons/lucide';

import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';

import {
  BrnHoverCardComponent,
  BrnHoverCardContentDirective,
  BrnHoverCardTriggerDirective,
} from '@spartan-ng/ui-hovercard-brain';

import { HlmHoverCardContentComponent } from '@spartan-ng/ui-hovercard-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmToggleDirective } from '@spartan-ng/ui-toggle-helm';
import { BrnToggleDirective } from '@spartan-ng/ui-toggle-brain';
import { baseUrl, localhost } from '../../environment';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { toast } from 'ngx-sonner';
import { HlmToasterComponent } from '@spartan-ng/ui-sonner-helm';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'nav-bar',
  standalone: true,
  imports: [CommonModule,
    RouterLink,
    HlmToasterComponent,
    BrnToggleDirective,
    HlmToggleDirective,
    HlmAvatarComponent,
    BrnHoverCardComponent,
    HlmHoverCardContentComponent,
    BrnHoverCardContentDirective,
    BrnHoverCardTriggerDirective,
    HlmButtonDirective,
    HlmIconComponent,
    HlmInputDirective,
    HttpClientModule,
  ],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  providers: [provideIcons({ lucideUserCog, lucideItalic, lucideSearch, lucideHistory, lucideShoppingCart
  })],
})
export class NavBarComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getInfoUser();
  }

  readonly user: number = parseInt(localStorage.getItem('id') || '0', 10);

  email: string = '';
  password: string = '';
  name: string = '';
  address: string = '';
  phone: string = '';
  logout() {
    localStorage.removeItem('id');
    this.router.navigate(['/login']);
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

  SignUp() {
    const userData = {
      name: this.name,
      email: this.email,
      password: this.password,
      address: this.address,
      phone: this.phone,
      id_usuario: this.user,
    };

    console.log(userData);

    this.http.put(`${baseUrl}/updateUser`, userData).subscribe(
      (response: any) => {
        console.log(response);
        this.router.navigate(['/']);
        localStorage.setItem('id', response.userId);
        // this.showToast('User created successfully');
      },
      (error: any) => {
        console.log(error);
        if (error.message.contains('Duplicate entry')) {
          // this.showToast(error.message);
        }
      }
    );
  }

  isToggled: boolean = JSON.parse(localStorage.getItem('toggle') || 'false');

  toggleItalic(): void {
    this.isToggled = !this.isToggled;
    localStorage.setItem('toggle', JSON.stringify(this.isToggled));

    if (this.isToggled) {
      this.router.navigate(['/search']);
    } else {
      this.router.navigate(['/']);
    }

    console.log('Toggled:', this.isToggled);
  }

  getInfoUser() {
    const userId = this.user;

    this.http.get(`${baseUrl}/getUserInfo/${userId}`, {}).subscribe(
      (response: any) => {
        response;
        this.name = response.nombre;
        this.email = response.correo;
        this.password = response.contraseña;
        this.address = response.direccion;
        this.phone = response.telefono;
      },
      (error: any) => {
        console.log(error.error);
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
