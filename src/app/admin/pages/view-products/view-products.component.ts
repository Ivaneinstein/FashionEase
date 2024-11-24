import { Component, OnInit } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import {
  BrnSheetContentDirective,
  BrnSheetTriggerDirective,
} from '@spartan-ng/ui-sheet-brain';
import {
  HlmSheetComponent,
  HlmSheetContentComponent,
  HlmSheetDescriptionDirective,
  HlmSheetFooterComponent,
  HlmSheetHeaderComponent,
  HlmSheetTitleDirective,
} from '@spartan-ng/ui-sheet-helm';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseUrl, localhost } from '../../../../environment';
import { toast } from 'ngx-sonner';
import { HlmToasterComponent } from '@spartan-ng/ui-sonner-helm';
interface Product {
  name: string;
  price: number;
  qty: number;
  image: string;
  category: number;
  id: number;
}

@Component({
  selector: 'view-products',
  standalone: true,
  imports: [
    HlmButtonDirective,
    FormsModule,
    BrnSheetTriggerDirective,
    CommonModule,
    BrnSheetContentDirective,
    HlmSheetComponent,
    HlmSheetContentComponent,
    HlmSheetFooterComponent,
    HlmSheetTitleDirective,
    HlmSheetDescriptionDirective,
    HlmButtonDirective,
    HlmInputDirective,
    HlmInputDirective,
    HlmButtonDirective,
    FormsModule,
  ],
  templateUrl: './view-products.component.html',
  styleUrl: './view-products.component.css',
})
export class ViewProductsComponent implements OnInit {
  allProducts: Product[] = [];
  constructor(private http: HttpClient) {}
  price: string = '';
  name: string = '';
  qty: string = '';
  image: string = '';
  category: number = 0;
  priceEdit: number = 0;
  nameEdit: string = '';
  qtyEdit: number = 0;
  imageEdit: string = '';
  categoryEdit: number = 0;
  idEdit: number = 0;

  ngOnInit() {
    this.fetchProducts();
  }

  async fetchProducts() {
    try {
      const response = await fetch(`${baseUrl}/getAllProducts`);
      const dbProducts = await response.json();

      this.allProducts = dbProducts.map((dbProduct: any) => ({
        name: dbProduct.nombre,
        price: dbProduct.precio,
        qty: dbProduct.stock,
        category: dbProduct.id_categoria,
        image: dbProduct.imagen_url,
        id: dbProduct.id_producto,
      }));
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  setValue(item: Product) {
    this.nameEdit = item.name;
    this.priceEdit = item.price;
    this.qtyEdit = item.qty;
    this.categoryEdit = item.category;
    this.imageEdit = item.image;
    this.idEdit = item.id;
  }

  add_product() {
    const body = {
      name: this.name,
      category: this.category,
      price: this.price,
      qty: this.qty,
      image: this.image,
    };

    console.log(body);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    this.http.post(`${baseUrl}/newProduct`, body, { headers }).subscribe(
      (response: any) => {
        console.log(response);
        this.showToast('Product added successfully');
        this.fetchProducts()
      },
      (error: any) => {
        console.log(error);
        this.showToast('There was an error adding the product');
      }
    );
  }

  updateProduct(){
    const userData = {
      name: this.nameEdit ,
      category: this.categoryEdit,
      image: this.imageEdit,
      qty: this.qtyEdit ,
      price: this.priceEdit,
      id: this.idEdit 
    };

    console.log(userData);

    this.http.put(`${baseUrl}/updateProduct`, userData).subscribe(
      (response: any) => {
        console.log(response);
        this.fetchProducts()
      },
      (error: any) => {
        console.log(error);
        
      }
    );
  }

  deleteProduct(id:number) {
    this.http
      .delete<any>(`${baseUrl}/removeProduct/${id}`)
      .subscribe(
        (response: any) => {
          console.log('Item removed :', response);
          this.showToast('Item removed ');
          this.fetchProducts();
        },
        (error: any) => {
          console.error('Error removing :', error);
          this.showToast('Error removing ');
        }
      );
  }

  showToast(msg: string) {
    toast('Status Product', {
      description: msg,
    });
  }
}
