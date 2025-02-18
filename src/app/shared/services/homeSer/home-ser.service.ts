import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HomeInter } from '../../interfaces/home-inter';
import { Environment } from '../auth/enum/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeSerService {


  constructor(private _HttpClient: HttpClient) { }

  getHomeData(): Observable<HomeInter> {
    return this._HttpClient.get<HomeInter>(`${Environment.BaseUrl}/api/v1/products`);
  }
}
