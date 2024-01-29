export interface CreateVendorInput{
    name: string;
    email: string;
    password: string;
    products?: string[];
}

export interface LoginVendorInput{
    email: string;
    password: string
}

export interface VendorInput {
    _id: string;
    email: string;
    password: string;
}