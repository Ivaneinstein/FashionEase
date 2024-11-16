import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  private TOKEN_KEY = 'auth-token';

  signOut(): void {
    window.sessionStorage.clear();
  }

  saveToken(token: string): void {
    window.sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return window.sessionStorage.getItem(this.TOKEN_KEY);
  }
}
