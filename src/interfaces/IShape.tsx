import IOption from "./IOption"

export default interface IShape {
    id: number,
    name: string,
    name_en: string,
    options: [IOption]
}