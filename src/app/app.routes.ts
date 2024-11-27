import { Routes } from "@angular/router";
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { CartComponent } from "./cart/cart.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { SearchComponent } from "./search/search.component";
import { AdminComponent } from "./admin/admin.component";
import { HistoryComponent } from "./history/history.component";

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'cart', component: CartComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'SignUp', component: SignUpComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'search', component: SearchComponent },
  { path: 'history', component: HistoryComponent },
];
