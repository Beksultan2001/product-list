export interface TableColumn {
  label: string;
  width: string;
  field: keyof FilterCriteria;
}

export interface FilterCriteria {
  brand: string;
  article: string;
  productName: string;
  price: string;
  availability: boolean | null;
}
