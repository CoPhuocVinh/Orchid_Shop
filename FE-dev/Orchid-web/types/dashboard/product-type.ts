
export type Image = {
    image_url: string,
    isDelete: boolean
}

export type IProduct = {
    id: string,
    name: string,
    description: string,
    quantity: number,
    version?: number,
    code: string,
    images: Image[]
}