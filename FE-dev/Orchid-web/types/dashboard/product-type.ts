
export type Image = {
    image_url: string,
    isDelete: boolean
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
    images?: Image[]
}
