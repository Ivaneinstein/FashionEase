import { Component } from '@angular/core';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';



@Component({
  selector: 'login-page',
  standalone: true,
  imports: [HlmInputDirective],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

}
