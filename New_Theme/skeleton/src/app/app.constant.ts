export class AppConstant {
    static APIURL: string = "http://localhost:3000";
    static APIRULProduct: string = "http://localhost:3000/products/";
    static APIRULEmail: string = "http://localhost:3000/emails/";
    static APIURLCategory: string = "http://localhost:3000/categorys/";
    static getUrl(): string {
        return this.APIURL;
    }
    static getProductUrl() : string
    {
        return this.APIRULProduct;
    }
    static getEmailUrl() : string
    {
        return this.APIRULEmail;
    }

    static getCategoryUrl() : string
    {
        return this.APIURLCategory;
    }
}  