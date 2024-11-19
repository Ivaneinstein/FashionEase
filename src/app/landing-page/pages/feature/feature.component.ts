import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from './feature.types';
import { baseUrl } from '../../../../environment';
import { toast } from 'ngx-sonner';
import { HlmToasterComponent } from '@spartan-ng/ui-sonner-helm';
@Component({
  selector: 'feature',
  standalone: true,
  imports: [CommonModule, HlmToasterComponent],
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.css'],
})
export class FeatureComponent implements OnInit {
  allProducts: Product[] = []; 
  readonly user: number = parseInt(localStorage.getItem('id') || '0', 10);

  async ngOnInit() {
    await this.fetchProducts();
  }

  async fetchProducts() {
    try {
      const response = await fetch(
        `${baseUrl}/getAllProducts`
      );
      const dbProducts = await response.json();

      this.allProducts = dbProducts.map((dbProduct: any) => ({
        name: dbProduct.nombre,
        description: dbProduct.descripcion,
        price: dbProduct.precio,
        stock: dbProduct.stock,
        category_id: dbProduct.id_categoria,
        imgPreview: dbProduct.imagen_url,
        id: dbProduct.id_producto,
      }));
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  async addToCart( producto: string) {
    if(this.user!=0)
    try {
      const response = await fetch(
        `${baseUrl}/addCartProduct`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id_usuario: Number(this.user),
            id_producto: Number(producto),
            cantidad: Number(1),
          }),
          
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log('Product added to cart:', data);
        this.showToast('Product added to cart')
      } else {
        const errorDetails = await response.text();
        console.error(
          'Failed to add product to cart:',
          response.statusText,
          'Details:',
          errorDetails
        );
        this.showToast('There was an error adding this item to the cart')

      }
    } catch (error) {
      console.error('Error occurred while adding product to cart:', error);
      this.showToast('There was an error adding this item to the cart')

    }
  }

  showToast(msg:string) {
    toast('Status cart', {
      description: msg,

    })
  }
}
