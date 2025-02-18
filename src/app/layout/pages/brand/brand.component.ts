import { Component } from '@angular/core';
import { BrandService } from '../../../shared/services/brand/brand.service';
import { Daum } from '../../../shared/interfaces/brand';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brand',
  imports: [RouterLink],
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.scss'
})
export class BrandComponent {

  constructor(private _BrandService:BrandService) { }

  brands: Daum[] = [];

  ngOnInit(): void {
    this._BrandService.getAllBrands().subscribe(brands => {
      this.brands = brands.data;
    });
  }

}
