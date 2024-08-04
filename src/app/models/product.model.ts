export interface Product {
    id: string,
    name: string,
    description: string,
    price: string,
    images: {
        image1: string;
        [key: string]: string;
    },
    techs: string
}