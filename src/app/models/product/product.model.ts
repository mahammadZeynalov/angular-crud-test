export interface Product {
  id: number;
  name: string;
  madeInCountry: string;
  price: number;
  isInStock: boolean;
  createdDate: Date;
  modifiedDate: Date | null;
}
