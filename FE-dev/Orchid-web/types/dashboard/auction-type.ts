import { IProduct } from "./product-type";

export type IAuction = {
  id: string;
  productName: string;
  productCode: string;
  startPrice: number;
  endPrice: number;
  status: string;
  depositPrice: number;
  product: IProduct;
  quantity: number;
  modifiedBy: string;
  created_at: Date;
  updated_at: Date;
  remindAt: Date;
};

export type IAuctionCreateField = {
  quantity: number;
  depositPrice: string;
  startPrice: string;
  productID: string;
  startDate: Date;
  endDate: Date;
};
