import { Component, DoCheck } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { CartService } from '../../../shared/services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements DoCheck {
  isLogin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  cartNo: number = 0;
  private lastCheckedToken: string | null = null; 

  constructor(private _AuthService: AuthService, private _Router: Router, public _CartService: CartService) {
    this._CartService.cartNo$.subscribe(cartCount => {
      this.cartNo = cartCount;
    });
  }

  logout(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('userToken');
    }
    this.isLogin.next(false);
    this._Router.navigate(['login']);
  }

  ngDoCheck(): void {
    if (typeof localStorage === 'undefined') {
      return;
    }

    const currentToken = localStorage.getItem('userToken');

    if (currentToken && currentToken !== this.lastCheckedToken) {
      this.lastCheckedToken = currentToken;

      this._AuthService.verfyToken().subscribe({
        next: () => this.isLogin.next(true),
        error: () => {
          console.warn("❌ Token verification failed. Logging out...");
          this.logout();
        },
      });
    } else if (!currentToken && this.isLogin.value) {
      this.isLogin.next(false);
    }
  }
}
