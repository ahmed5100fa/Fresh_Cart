import { Component } from '@angular/core';
import { CartService } from '../../../shared/services/cart/cart.service';
import { Cart, CartData } from '../../../shares/interfaces/cart';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  constructor(private _CartService:CartService){}

  data !: CartData;
  CartId !: string;
  getLoggedCart(){
    return this._CartService.getLoggedUserCart().subscribe({
      next: (cartData) => {
        this.data = cartData.data;
        this.CartId = cartData.cartId;
      },
      error: (error) => console.error(error)
    });
  }


  updateLoggedUserCount(productId : string , count : number){
    return this._CartService.updateLoggedUserCount(productId , count.toString()).subscribe({
      next: (cartData) => {
        this.data = cartData.data;
        this.CartId = cartData.cartId;
      },
      error: (error) => console.error(error)
    });
  }

  removeSpecificProductFromCart(productId : string){
    return this._CartService.removeSpecificProductFromCart(productId).subscribe({
      next: (cartData) => {
        this.data = cartData.data;
        this.CartId = cartData.cartId;
      },
      error: (error) => console.error(error)
    });
  }

    clearProductFromCart(){
    return this._CartService.clearProductFromCart().subscribe({
      next: (cartData) => {
        this.data.totalCartPrice = 0;
        this.data.products = [];
      },
      error: (error) => console.error(error)
    });
  }



  ngOnInit(): void {
    this.getLoggedCart();
  }
}



