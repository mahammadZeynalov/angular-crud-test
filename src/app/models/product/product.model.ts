export interface Product {
  id: number;
  name: string;
  madeInCounty: string;
  price: Date;
  isInStock: boolean;
  createdDate: Date;
  modifiedDate: Date | null;
}
