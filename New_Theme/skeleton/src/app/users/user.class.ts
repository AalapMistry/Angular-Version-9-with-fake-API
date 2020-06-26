export class UserModel {
    id: number;
    FirstName: string;
    LastName: string;
    EmailAddress: string;
    MobileNumber: number;
    Age: number;
    BirthDate: Date;
    Skills: string;
    AboutUser: string;
    Address1: string;
    Address2: string;
    Country: string;
    State: string;
    City: string;
    PostalCode: string;
    IsActive: boolean;
    languagesData: string;
    Password: string;
    ConfirmPassword: string;
    ProfileImage: string;
    IsChecked: boolean = false;
    WebsiteUrl: string;
    TwitterUrl:string;
    LinkedinUrl:string;
    constructor(init?: Partial<UserModel>) {
        Object.assign(this, init);
    }
}