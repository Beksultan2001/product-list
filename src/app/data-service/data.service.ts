import { Injectable } from '@angular/core';
import { FilterCriteria } from '../../shared/types';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}

  filterData(
    data: FilterCriteria[],
    criteria: FilterCriteria
  ): FilterCriteria[] {
    return data.filter((row) => {
      const brandMatch =
        !criteria.brand ||
        row.brand.toLowerCase().includes(criteria.brand.toLowerCase());
      const articleMatch =
        !criteria.article ||
        row.article.toLowerCase().includes(criteria.article.toLowerCase());
      const productNameMatch =
        !criteria.productName ||
        row.productName
          .toLowerCase()
          .includes(criteria.productName.toLowerCase());
      const priceMatch =
        !criteria.price ||
        row.price.toLowerCase().includes(criteria.price.toLowerCase());
      const availabilityMatch =
        criteria.availability === null ||
        row.availability === criteria.availability;

      return (
        brandMatch &&
        articleMatch &&
        productNameMatch &&
        priceMatch &&
        availabilityMatch
      );
    });
  }
}
