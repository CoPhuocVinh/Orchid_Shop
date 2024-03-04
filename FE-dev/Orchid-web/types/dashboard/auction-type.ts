
export type IAuction = {
  id: number;
  productID: number;
  productName: string;
  productCode: string;
  startPrice: number;
  endPrice: number;
  status: string;
  depositPrice: number;
  description: string;
  // product: IProduct;
  biddingPrice?: string;
  image_url: string;
  quantity: number;
  modifiedBy: string;
  created_at: Date;
  updated_at: Date;
  remindAt: Date;
  endDate?: Date;
  startDate?: Date;
};
export type IAuctionCreateField = {
  quantity: number;
  depositPrice: number;
  startPrice: number;
  productID: number;
  startDate?: string;
  endDate?: string;
  remindAt?: string;
  image_url: string;
};


export enum AuctionStatus {
  LIVE = 'LIVE',
  COMING = 'COMING',
  END = 'END',
}