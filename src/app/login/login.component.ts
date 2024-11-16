import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storange.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  onSubmit(correo: string, contraseña: string): void {
    const form = { correo, contraseña }; // Ajustado para coincidir con el backend
    this.authService.login(form).subscribe({
      next: (data) => {
        this.tokenStorage.saveToken(data.token);
        if (data.rol === 'administrador') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        this.errorMessage = err.error.message;
      },
    });
  }
}
