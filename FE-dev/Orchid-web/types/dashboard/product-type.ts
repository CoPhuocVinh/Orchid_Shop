
export type Image = {
    image_url: string,
    // isDelete: boolean
    // is_deleted: boolean
    image_code: string
}

export type IProduct = {
    id: number,
    productName: string,
    category_id:number,
    description: string,
    quantity: number,
    version?: number,
    productCode: string,
    actived: boolean,
    created_at: Date,
    updated_at: Date,
    productImages?: Image[]
}

export type IProductCreate = {
    productName:string,
    category_id:number,
    quantity: number,
    productImages: Image[],
    description:string,
}


export type IProductForm = {
    productID: number,
    productName: string,
}