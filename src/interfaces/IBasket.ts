import IOffer from "./IOffer";

export default interface IBasket {
    id: number,
    key: string,
    price: number,
    status: string,

    offers: IOffer[],
}