import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './../../interfaces/home-inter';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(ProductList: Product[], userWord: string): Product[] {
    if (!ProductList || !Array.isArray(ProductList) || !userWord) {
      return ProductList || [];  
    }

    return ProductList.filter((product) => {
      return product.title.toLowerCase().includes(userWord.toLowerCase());
    });
  }
}
