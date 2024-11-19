import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http'; 
import { baseUrl } from '../../environment';
import { FooterComponent } from '../footer/footer.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { toast } from 'ngx-sonner';
import { HlmToasterComponent } from '@spartan-ng/ui-sonner-helm';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, HttpClientModule, NavBarComponent,
    FooterComponent, HlmToasterComponent],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  readonly user: number = parseInt(localStorage.getItem('id') || '0', 10);
  allProducts: any[] = [];
  finalPrice: number = 0;

  constructor(private http: HttpClient) { 
    this.finalPrice = this.getPrice();
  }

  ngOnInit() {
    this.fetchProducts();
  }

  getPrice() {
    this.finalPrice = 0; 
    for (const item of this.allProducts) {
      this.finalPrice += item.precio * item.cantidad;
    }
    return this.finalPrice;
  }

  async fetchProducts() {
    try {
      const response = await fetch(
        `${baseUrl}/getCartByUserId?userId=${this.user}`
      );
      const dbProducts = await response.json();

      const idArray = dbProducts.map((product: { id_producto: string; cantidad: string }) => ({
        id_producto: product.id_producto,
        cantidad: product.cantidad,
      }));

      const ids = idArray.map((item: { id_producto: string }) => item.id_producto).join(',');

      const responseData = await fetch(
        `${baseUrl}/getProductsByIds?id_producto=${ids}`
      );
      const products = await responseData.json();

      this.allProducts = products.map((product: any) => {
        const matchedItem = idArray.find((item: { id_producto: string }) => item.id_producto === product.id_producto);
        return {
          ...product,
          cantidad: matchedItem ? parseInt(matchedItem.cantidad, 10) : 0,
        };
      });

      this.finalPrice = this.getPrice();
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  pay() {
    const userId = this.user;

    this.http.post<any>(
      `${baseUrl}/create-checkout-session/${userId}`,
      {}
    ).subscribe(
      (response: any) => {
        if (response.url) {
          window.location.href = response.url;
        } 
      },
      (error: any) => {
        console.error('Error initiating payment process:', error);
      }
    );
  }

  downloadReceipt() {
    const userId = this.user;

    this.http.get(
      `${baseUrl}/receipt/${userId}`,
      { responseType: 'blob' }
    ).subscribe(
      (response: Blob) => {
        const blob = new Blob([response], { type: 'application/xml' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'receipt.xml';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      (error: any) => {
      }
    );
  }

  increaseQuantity(item: any) {
    item.cantidad++;

    this.finalPrice = this.getPrice();
  }

  decreaseQuantity(item: any) {
    if (item.cantidad > 1) {
      item.cantidad--; 
    } else {
      console.log(item.id_producto);
  
      this.http.delete<any>(
        `http://localhost:8080/removeCart/${this.user}/${item.id_producto}`
      ).subscribe(
        (response: any) => {
          console.log('Item removed from cart:', response);
          this.showToast('Item removed from cart')
          this.fetchProducts();
        },
        (error: any) => {
          console.error('Error removing from cart:', error);
          this.showToast('Error removing from cart')

        }
      );
    }
  
    this.finalPrice = this.getPrice(); 
  }
  

  showToast(msg:string) {
    toast('Status cart', {
      description: msg,

    })
  }
}
