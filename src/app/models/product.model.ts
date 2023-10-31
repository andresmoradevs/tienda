export interface Product {
    id: string,
    name: string,
    description: string,
    price: number,
    images: {
        image1?: string,
        image2?: string,
        image3?: string,
    } ,
    soldUnits: string
}