import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../auth/enum/environment';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { Cart, ClearRes, WishInter } from '../../../shares/interfaces/cart';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartNo = new BehaviorSubject<number>(0);
  cartNo$ = this.cartNo.asObservable();

  constructor(private _HttpClient: HttpClient) {
    if (typeof localStorage !== 'undefined') {
      this.getLoggedUserCart().subscribe({
        next: (cart) => {
          this.cartNo.next(cart.numOfCartItems);
        }
      });
    }
  }

  addToCart(productId: string): Observable<Cart> {
    return this._HttpClient.post<Cart>(`${Environment.BaseUrl}/api/v1/cart`, { productId }).pipe(
      tap(cart => this.cartNo.next(cart.numOfCartItems)) // تحديث العدد بعد الإضافة
    );
  }

  addToWishList(productId: string): Observable<WishInter> {
    const token = localStorage.getItem('userToken');
    if (!token) {
      console.error('User token is missing! Please log in.');
      return throwError(() => new Error('User is not logged in'));
    }

    return this._HttpClient.post<WishInter>(
      `${Environment.BaseUrl}/api/v1/wishlist`,
      { productId }
    );
  }

  getLoggedUserCart(): Observable<Cart> {
    return this._HttpClient.get<Cart>(`${Environment.BaseUrl}/api/v1/cart`);
  }

  updateLoggedUserCount(productId: string, count: string): Observable<Cart> {
    return this._HttpClient.put<Cart>(`${Environment.BaseUrl}/api/v1/cart/${productId}`, { count }).pipe(
      tap(cart => this.cartNo.next(cart.numOfCartItems))
    );
  }

  removeSpecificProductFromCart(productId: string): Observable<Cart> {
    return this._HttpClient.delete<Cart>(`${Environment.BaseUrl}/api/v1/cart/${productId}`).pipe(
      tap(cart => this.cartNo.next(cart.numOfCartItems))
    );
  }

  clearProductFromCart(): Observable<ClearRes> {
    return this._HttpClient.delete<ClearRes>(`${Environment.BaseUrl}/api/v1/cart`).pipe(
      tap(() => this.cartNo.next(0))
    );
  }
}
