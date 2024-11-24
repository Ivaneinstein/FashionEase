import { Component } from '@angular/core';
import { lucideChevronDown } from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardFooterDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';
import { provideIcons } from '@spartan-ng/ui-icon-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';

import { toast } from 'ngx-sonner';
import { HlmToasterComponent } from '@spartan-ng/ui-sonner-helm';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseUrl, localhost } from '../../../../environment';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'add-product',
  standalone: true,
  imports: [
    HlmToasterComponent,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardDescriptionDirective,
    HlmCardContentDirective,
    HlmInputDirective,
    HlmCardFooterDirective,
    HlmButtonDirective,FormsModule
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
  providers: [provideIcons({ lucideChevronDown })],
})
export class AddProductComponent {
  constructor(private http: HttpClient) {}
  price: string = '';
  name: string = '';
  qty: string = '';
 image: string = '';
  category: number = 0;

  add_product() {
    const body = {
      name: this.name,
      category: this.category,
      price: this.price,
      qty: this.qty,
      image: this.image,
    };

    console.log(body)
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    this.http.post(`${baseUrl}/newProduct`, body, { headers }).subscribe(
      (response: any) => {
        console.log(response);
        this.showToast('Product added successfully');
      },
      (error: any) => {
        console.log(error);
        this.showToast('There was an error adding the product');
      }
    );
  }

  showToast(msg: string) {
    toast('Status Product', {
      description: msg,
    });
  }
  
}
