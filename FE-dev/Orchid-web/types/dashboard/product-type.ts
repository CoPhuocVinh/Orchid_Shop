
export type Image = {
    image_url: string,
    // isDelete: boolean
}

export type IProduct = {
    id: string,
    productName: string,
    description: string,
    quantity: number,
    version?: number,
    productCode: string,
    created_at: Date,
    updated_at: Date,
    productImages?: Image[]
}

export type IProductCreate = {
    productName:string,
    category_id:string,
    quantity: number,
    productImages: Image[],
    description:string,
}
