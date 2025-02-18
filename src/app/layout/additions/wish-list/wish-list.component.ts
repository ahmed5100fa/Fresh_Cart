import { Component } from '@angular/core';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishservService } from '../../../shared/services/wishserv/wishserv.service';
import { Daum } from '../../../shared/interfaces/wish-inter';
import { RouterLink } from '@angular/router';
import { Cart } from '../../../shares/interfaces/cart';
@Component({
  selector: 'app-wish-list',
  imports: [RouterLink],
templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss'
})
export class WishListComponent {
  constructor(private _WishservService: WishservService , private _CartService:CartService  ,private toastr: ToastrService ){}
  wishData: Daum[] = [];


  displayWishListData() {
    this._WishservService.getWishlist().subscribe({
      next: (wishData: any) => {
        this.wishData = wishData?.data ?? [];
        console.log('Wishlist Data:', this.wishData);
      },
      error: (error: any) => {
        console.error('Error fetching wishlist data:', error);
        this.toastr.error('Failed to load wishlist.', 'Error');
        this.wishData = [];
      }
    });
  }


  addProductToCart(productId: string) {
    this._CartService.addToCart(productId).subscribe({
      next: (res) => {
        const message = (res as unknown as { message: string }).message;
        this.toastr.success(message || 'Product added successfully!', 'Success', {
          toastClass: 'ngx-toastr custom-toast'
        });
        console.log(res);
      },
      error: (error: any) => console.error(error)
    });
  }

  deleteProductFromWishlist(productId: string) {
    this._WishservService.DeleteProductFromWishlist(productId).subscribe({
      next: (res) => {
        const message = (res as unknown as { message: string }).message;
        this.toastr.warning(message || 'Product deleted successfully!', 'Warning', {
          toastClass: 'ngx-toastr custom-toast'
        });
        console.log(res);
        this.displayWishListData();
      },
      error: (error: any) => console.error(error)
    });
  }


  ngOnInit(): void {
    this.displayWishListData();
  }

}
