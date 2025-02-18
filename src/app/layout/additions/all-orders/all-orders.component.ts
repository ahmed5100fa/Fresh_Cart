import { Component } from '@angular/core';
import { OrderService } from '../../../shared/services/order/order.service';
import { Daum } from '../../../shared/interfaces/all-orders';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-all-orders',
  imports: [],
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.scss'
})
export class AllOrdersComponent {
  orders: Daum[] = [];
  constructor(private _OrderService:OrderService , private _ActivatedRoute:ActivatedRoute) { }
  getAllOrders(UserId : string){
    this._OrderService.getAllOrders(UserId).subscribe({
      next: (orders) => {
        this.orders = orders.data;
        console.log(this.orders);
      }
    })
  }

  ngOnInit(): void {
    this._ActivatedRoute.params.subscribe(params => {
      this.getAllOrders(params['Userid']);
    });
  }
}
