export type signInData ={
    email:string,
    password:string
}

export type signUpData = {
    name:string
    email:string,
    password:string,
    confirmPassword?:string
}

export type Link = {
        shortUrl: string;
        _id: string;
        orginalUrl: string;
        click: 0,
        createdAt: string;
        updatedAt: string;
}