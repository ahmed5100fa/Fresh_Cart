import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../auth/enum/environment';
import { shippingAddress } from '../../../shares/interfaces/cart';
import { Observable } from 'rxjs';
import { AllOrders } from '../../interfaces/all-orders';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _HttpClient:HttpClient) { }

  CheckOut(CartId: string , address : shippingAddress){
    return this._HttpClient.post(`${Environment.BaseUrl}/api/v1/orders/checkout-session/${CartId}?url=${Environment.Domain}`,{
      shippingAddress : address
    })
  }

  getAllOrders(UserId : string):Observable<AllOrders>{
    return this._HttpClient.get<AllOrders>(`${Environment.BaseUrl}/api/v1/orders/user/${UserId}`)
  }
}
