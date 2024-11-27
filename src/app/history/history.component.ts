import { Component } from '@angular/core';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { FooterComponent } from "../footer/footer.component";
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseUrl, localhost } from '../../environment';
import { toast } from 'ngx-sonner';
import { HlmSheetComponent } from "../../../components/ui-sheet-helm/src/lib/hlm-sheet.component";
import { HlmSheetContentComponent } from "../../../components/ui-sheet-helm/src/lib/hlm-sheet-content.component";
import { FormsModule } from '@angular/forms';
import { HlmSheetFooterComponent } from "../../../components/ui-sheet-helm/src/lib/hlm-sheet-footer.component";
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
interface Order {
  date: string;
  total: string;
  state: string;
  id: string;
}
@Component({
  selector: 'app-history',
  standalone: true,
  imports: [NavBarComponent, FooterComponent, CommonModule, FormsModule, HlmButtonDirective],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})


export class HistoryComponent {
  allOrders: Order[] = [];
  constructor(private http: HttpClient) {}
  date: string = '';
  total: string = '';
  state: string = '';
  id: string = '';

  ngOnInit() {
    this.fetchOrders();
  }

  readonly user: number = parseInt(localStorage.getItem('id') || '0', 10);


  async fetchOrders() {
    try {
      const response = await fetch(`${baseUrl}/getAllOrders/${this.user}`);
      const dbOrders = await response.json();

      this.allOrders = dbOrders.map((dbProduct: any) => ({
        date: dbProduct.fecha,
        total: dbProduct.total,
        state: dbProduct.estado,
        id: dbProduct.id_orden,
      }));
    } catch (error) {
      console.error('Error fetching Orders:', error);
    }
  }

  deleteOrder(id: string) {
    this.http.delete<any>(`${baseUrl}/cancelOrder/${id}`).subscribe(
      (response: any) => {
        console.log('Item removed :', response);
        this.showToast('Item removed ');
        this.fetchOrders();
      },
      (error: any) => {
        console.error('Error removing :', error);
        this.showToast('Error removing ');
      }
    );
  }

  showToast(msg: string) {
    toast('Status Order', {
      description: msg,
    });
  }
}







