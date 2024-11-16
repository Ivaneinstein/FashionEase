import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-orders',
  templateUrl: './order.component.html',
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  userId = 1; // ID del usuario actual (puedes obtenerlo de un token)

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.authService.getOrdersByUser(this.userId).subscribe((data) => {
      this.orders = data;
    });
  }
}
