import { Component } from '@angular/core';
import { DetailsService } from '../../../shared/servics/details/details.service';
import { ActivatedRoute } from '@angular/router';
import { Data, ProductDet } from '../../../shared/interfaces/details-inter';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../../shared/services/cart/cart.service';
import { Cart, CartData } from '../../../shares/interfaces/cart';
import { ToastrService } from 'ngx-toastr';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports : [CarouselModule ,NgIf],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
  productDetails!: Data;
  data !: CartData;

  constructor(private _DetailsService: DetailsService, private _ActivatedRoute: ActivatedRoute, private _CartService: CartService  ,private toastr: ToastrService) {}

  WishList !: any;

  addProductToWishList(productId: string) {
    if (!productId) {
      console.error('Invalid product ID!');
      return;
    }

    this._CartService.addToWishList(productId).subscribe({
      next: (response) => {
        this.WishList = response.data;
        const message1 = response?.message || 'Product added successfully!';
        this.toastr.success(message1, 'Success', {
          toastClass: 'ngx-toastr custom-toast'
        });
      },
      error: (error) => {
        console.error('Error adding product to wishlist:', error);
        this.toastr.error('Failed to add product to wishlist.', 'Error');
      }
    });
  }



  getProductDetails(id: string) {
    this._DetailsService.getProductDetails(id).subscribe((data: ProductDet) => {
      this.productDetails = data.data;
    });
  }

  addProductToCart(productId: string) {
    this._CartService.addToCart(productId).subscribe({
      next: (res) => {
        const message = (res as unknown as { message: string }).message;
        this.toastr.success(message || 'Product added successfully!', 'Success', {
          toastClass: 'ngx-toastr custom-toast'
        });
      },
      error: (error: any) => console.error(error)
    });
  }


  ngOnInit(): void {
    this._ActivatedRoute.params.subscribe(params => {
      this.getProductDetails(params['id']);
    });
  }


}
