export interface CreateProductInputs{
    name: string;
    content: string;
    price: number;
    discount: number;
    discount_percentage: string,
    vendorId: string,
    image?: string[];
    product_type: string;
    quantity: number;
    sold_quantity: number;
    size?: [];
    sku_code: string;
    category: any;
    color?:string[]; 
    is_trending: boolean;
    flash_sale: boolean;
    in_stock: boolean;
    view_count: number;
    custom_outfit: boolean;
}

export interface CreateProductColorInterface {
    name: string,
    color_code: string,
    image?: string[],
}