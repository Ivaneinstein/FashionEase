import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import {
  HlmAvatarComponent,
} from '@spartan-ng/ui-avatar-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { provideIcons } from '@ng-icons/core';
import { lucideUserCog, lucideSearch, lucideItalic } from '@ng-icons/lucide';

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
@Component({
  selector: 'nav-bar',
  standalone: true,
  imports: [
    RouterLink,BrnToggleDirective,HlmToggleDirective,
    HlmAvatarComponent,
    BrnHoverCardComponent,
    HlmHoverCardContentComponent,
    BrnHoverCardContentDirective,
    BrnHoverCardTriggerDirective,
    HlmButtonDirective,
    HlmIconComponent,
    HlmInputDirective,

  ],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  providers: [provideIcons({ lucideUserCog , lucideItalic, lucideSearch})],
})
export class NavBarComponent {
  constructor(private router: Router) {}

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


  SignUp(){}

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
}
