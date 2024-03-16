
export type IBidList = {
  id: number,
  ratings: number,
  biddingPrice: number,
  top1: boolean,
  userID: number,
  auctionID: number
}


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
  bidList: IBidList[]
  biddingPrice?: number;
  image_url: string;
  quantity: number;
  modifiedBy: string;
  created_at: Date;
  updated_at: Date;
  remindAt: Date;
  endDate?: Date;
  startDate?: Date;
  rejected: boolean;
  approved: boolean
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