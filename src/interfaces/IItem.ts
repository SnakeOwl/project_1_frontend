import IParameter from "./IParameter"

export default interface IItem {
    id: number,
    name: string,
    name_en: string,
    description: string,
    description_en: string,

    parameters: [IParameter]
}