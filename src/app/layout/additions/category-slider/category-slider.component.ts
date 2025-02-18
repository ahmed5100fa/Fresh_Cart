import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { CategoryService } from '../../../shared/services/category/category.service';
import { Data } from '../../../shared/interfaces/category';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-category-slider',
  standalone: true,
  imports: [CarouselModule, CommonModule , NgFor],
  templateUrl: './category-slider.component.html',
  styleUrl: './category-slider.component.scss'
})
export class CategorySliderComponent {
  constructor(private _CategoryService: CategoryService) {}

  ImagesDataList: Data[] = [];

  getCategoriesImages() {
    this._CategoryService.getCategories().subscribe({
      next: (response: any) => {
        this.ImagesDataList = response.data;
      },
      error: (error) => console.error('❌ Error fetching categories:', error)
    });
  }

  trackById(index: number, item: Data): string {
    return item._id;
  }

  ngOnInit(): void {
    this.getCategoriesImages();
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: { items: 4 },
      600: { items: 6 },
      1000: { items: 7 }
    },
    nav: false,
    autoplay: true,
    autoplaySpeed: 800
  };
}
