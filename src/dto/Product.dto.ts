export interface CreateProductInputs{
    name: string;
    content: string;
    price: number;
    discount: number;
    discount_percentage: string,
    // vendorId: any,
    image?: string[];
    product_type: string;
    quantity: number;
    sold_quantity: number;
    size?: [];
    sku_code: string;
    category: any;
}