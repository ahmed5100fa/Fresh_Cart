import { Component } from '@angular/core';
import { HomeSerService } from '../../../shared/services/homeSer/home-ser.service';
import { HomeInter, Product } from '../../../shared/interfaces/home-inter';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CartService } from '../../../shared/services/cart/cart.service';
import { Cart } from '../../../shares/interfaces/cart';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-prodeponbrand',
  imports: [RouterLink , CarouselModule],
  templateUrl: './prodeponbrand.component.html',
  styleUrls: ['./prodeponbrand.component.scss']
})
export class ProdeponbrandComponent {
  prductdepbrand: Product[] = [];
  products: Product[] = [];

  constructor(private _HomeSerService: HomeSerService, private _ActivatedRoute: ActivatedRoute ,private toastr: ToastrService ,private _CartService: CartService) {}

  getAllProducts() {
    this._HomeSerService.getHomeData().subscribe({
      next: (data: HomeInter) => {
        this.products = data.data;
        this._ActivatedRoute.params.subscribe(params => {
          const brandId = params['brandId'];
          this.prductdepbrand = this.products.filter(product => product.brand?._id === brandId);
        });
      },
      error: (error: any) => console.error(error)
    });
  }


    addProductToCart(productId: string) {
      this._CartService.addToCart(productId).subscribe({
        next: (res : Cart) => {
          const message = (res as unknown as { message: string }).message;
          this.toastr.success(message || 'Product added successfully!', 'Success', {
            toastClass: 'ngx-toastr custom-toast'
          });
        },
        error: (error: any) => console.error(error)
      });
    }


  ngOnInit(): void {
    this.getAllProducts();
  }
}
