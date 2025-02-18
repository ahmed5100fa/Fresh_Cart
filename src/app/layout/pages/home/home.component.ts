import { Component } from '@angular/core';
import { HomeInter, Product } from '../../../shared/interfaces/home-inter';
import { HomeSerService } from '../../../shared/services/homeSer/home-ser.service';
import { RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { SliderComponent } from "../../additions/slider/slider.component";
import { FormsModule, NgModel } from '@angular/forms';
import { SearchPipe } from '../../../shared/pipes/search/search.pipe';
import { CartService } from '../../../shared/services/cart/cart.service';
import { Cart } from '../../../shares/interfaces/cart';
import { CategorySliderComponent } from "../../additions/category-slider/category-slider.component";

@Component({
  selector: 'app-home',
  imports: [RouterLink, CarouselModule, SliderComponent, SearchPipe, FormsModule, CategorySliderComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  searchWord : string = ''
  dataList !: Product[];
  constructor(private _HomeSerService: HomeSerService, private _CartService:CartService ,private toastr: ToastrService) {}

  getAllProducts() {
    this._HomeSerService.getHomeData().subscribe({
      next: (data: HomeInter) => {
        this.dataList = data.data;
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
