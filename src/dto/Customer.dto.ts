export interface RegisterInputForCustomer {
    _id: string;
    name: string;
    email: string;
    password: string;
}

export interface LoginInputForCustomer {
    email: string;
    password: string;
}