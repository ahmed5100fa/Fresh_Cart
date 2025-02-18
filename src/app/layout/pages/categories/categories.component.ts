import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../shared/services/category/category.service';
import { Data , Category } from './../../../shared/interfaces/category';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: Data[] = [];
  categoryId !: string;

  constructor(private _CategoryService: CategoryService) {}

  ngOnInit(): void {
    this._CategoryService.getCategories().subscribe({
      next: (response: any) => {
        this.categories = response.data;
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      }
    });
  }
}
