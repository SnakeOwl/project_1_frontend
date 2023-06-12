import IItem from "./IItem";
import IOption from "./IOption";

export default interface IOffer {
    id: number,
    short_image: string | null,
    price: number,

    item: IItem,
    options: [IOption]
}