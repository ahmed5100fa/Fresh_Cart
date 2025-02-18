import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../auth/enum/environment';
import { Observable } from 'rxjs';
import { Brand } from '../../interfaces/brand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private _HttpClient:HttpClient) { }

  getAllBrands():Observable<Brand>{
    return this._HttpClient.get<Brand>(`${Environment.BaseUrl}/api/v1/brands`)
  }
}
