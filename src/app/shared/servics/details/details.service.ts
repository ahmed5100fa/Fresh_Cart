import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../services/auth/enum/environment';
import { Observable } from 'rxjs';
import { ProductDet } from '../../interfaces/details-inter';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  constructor(private _HttpClient:HttpClient) { }

  getProductDetails(id: string):Observable<ProductDet>{
    return this._HttpClient.get<ProductDet>(`${Environment.BaseUrl}/api/v1/products/${id}`)
  }
}
