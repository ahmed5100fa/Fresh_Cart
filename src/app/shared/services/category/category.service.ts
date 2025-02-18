import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../auth/enum/environment';
import { Observable } from 'rxjs';
import { Category, Subcategory } from '../../interfaces/home-inter';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private _HttpClient: HttpClient) {}

  getCategories(): Observable<Category> {
    return this._HttpClient.get<Category>(`${Environment.BaseUrl}/api/v1/categories`);
  }

  GetAllSubCategoriesOnCategory(catId: string): Observable<Subcategory> {
    return this._HttpClient.get<Subcategory>(`${Environment.BaseUrl}/api/v1/categories/${catId}/subcategories`);
  }
}
