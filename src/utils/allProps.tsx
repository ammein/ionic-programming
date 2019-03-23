export interface Props{
    children?: JSX.Element | React.ReactNode,
    back?: boolean,
    currentPath?: string,
    toolbar? :any,
    enableToolbar? : boolean
}


export interface RoutesDef {
    title: string,
    path: string,
    component: React.ComponentProps<any>,
    exact?: boolean,
    thumbnail? : string,
    icon?: string
}

export interface Laptops{
    name : string,
    brand : string,
    price : number,
    specification: string[],
    delivery?:string,
    imgProduct?:string
}

export interface Desktops{
    name: string,
    brand: string,
    price: number,
    specification: string[],
    delivery?: string,
    imgProduct?: string
}

export interface Accessories{
    name: string,
    brand: string,
    price: number,
    specification: string[],
    delivery?: string,
    imgProduct?: string
}

export const space : any = {
    marginTop : "20px"
}