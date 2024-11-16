import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storange.service';
const jwt_decode = require('jwt-decode');



@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private tokenStorage: TokenStorageService, private router: Router) {}

  canActivate(): boolean {
    const token = this.tokenStorage.getToken();
    if (token) {
      const decoded: any = jwt_decode(token);
      if (decoded.rol === 'administrador') {
        return true;
      }
    }
    this.router.navigate(['/']);
    return false;
  }
}
