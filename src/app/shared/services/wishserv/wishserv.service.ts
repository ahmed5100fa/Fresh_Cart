import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../auth/enum/environment';
import { deletedPro, WishInter } from '../../interfaces/wish-inter';
import { Observable } from 'rxjs';
import { Product } from './../../interfaces/home-inter';

@Injectable({
  providedIn: 'root'
})
export class WishservService {

  constructor(private _HttpClient: HttpClient) { }

  getWishlist() : Observable<WishInter> {
    return this._HttpClient.get<WishInter>(`${Environment.BaseUrl}/api/v1/wishlist`);
  }

  DeleteProductFromWishlist(ProductId : string) : Observable<deletedPro>{
    return this._HttpClient.delete<deletedPro>(`${Environment.BaseUrl}/api/v1/wishlist/${ProductId}`);
  }
}
