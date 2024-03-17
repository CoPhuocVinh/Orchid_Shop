export type IOrder = {
    id: number,
    status: string,
    paymentMethod: string,
    total: number,
    phone: number,
    address: string,
    auctionTitle: string,
    expiredAt: Date,
    productName: string,
    productCode: string,
    quantity: number,
    note: string,
    auctionID: number,
    userID: number,
    created_at: Date,
    updated_at: Date,
    confirmed: boolean
  };
  