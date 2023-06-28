import IImage from "./IImage";
import IItem from "./IItem";
import IOption from "./IOption";

export default interface IOffer {
    id: number,
    short_image: string | null,
    price: number,
    count: number,

    item: IItem,
    options: IOption[],

    pivot: {
        basket_id: number,
        count: number,
        offer_id: number
    } | null,

    images: IImage[] | null
}