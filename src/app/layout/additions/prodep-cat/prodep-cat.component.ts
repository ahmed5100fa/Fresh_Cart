import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../shared/services/category/category.service';
import { ActivatedRoute } from '@angular/router';
import { Daum } from '../../../shared/interfaces/category';

@Component({
  selector: 'app-prodep-cat',
  templateUrl: './prodep-cat.component.html',
  styleUrls: ['./prodep-cat.component.scss']
})
export class ProdepCatComponent implements OnInit {
  SubcategoryList!: Daum[];
  CategoryId!: string;

  constructor(private _CategoryService: CategoryService, private _ActivatedRoute: ActivatedRoute) {}

  getSubCategoriesByCategoryId(catId: string) {
    this._CategoryService.GetAllSubCategoriesOnCategory(catId).subscribe({
      next: (response : any) => {
        this.SubcategoryList = response.data;
      },
      error: (err) => {
        console.error('Error fetching subcategories:', err);
      }
    });
  }
  ngOnInit(): void {
    this.CategoryId = this._ActivatedRoute.snapshot.params['catId'];
    this.getSubCategoriesByCategoryId(this.CategoryId);
  }


}
