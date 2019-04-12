export interface Props{
    children?: React.ReactNode | JSX.Element[] | JSX.Element,
    back?: boolean,
    currentPath?: string,
    toolbar? :any,
    enableToolbar? : boolean,
    match? :any,
    location?:any,
    history? : any
}


export interface RoutesDef {
    title: string,
    path: string,
    component: React.ComponentProps<any>,
    exact?: boolean,
    thumbnail? : string,
    icon?: string,
    menu? : SVGAElement | any
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

export const icon : object = {
    width : "25px",
    margin : "15px"
}