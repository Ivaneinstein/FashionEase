import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { TokenStorageService } from '../services/token-storange.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.tokenStorage.getToken()) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
