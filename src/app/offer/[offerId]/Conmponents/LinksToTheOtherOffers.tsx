import { RedButton } from "@/Components/Buttons/ColoredButtons";
import { RedLinkReversed } from "@/Components/Links/ColoredLinks";
import ILinkToOffer from "./ILinkToOffer";
import IOption from "@/interfaces/IOption";

export default function LinksToTheOtherOffers({
    linksToOffers, // подготовленные ссылки из API
    offerOptions, // текущие (выбранные) опции ТП
    lang,
}:{
    linksToOffers: ILinkToOffer[],
    offerOptions: IOption[],
    lang: any
}) {

    // создание ссылок на другие Офферы текущего Товара
    const linksToItemOffers = [];
    const currentOptions = offerOptions.map(op => { return op.id });


    // прогон по Шейпам предмета (в Шейпах есть Опции, по ним создают разные Офферы)
    for (let k in linksToOffers) {

        const shape = linksToOffers[k];
        const options = [];


        // прогон по Опциям одного Шейпа
        for (let k2 in shape.options) {
            const option = shape.options[k2];


            // если текущая опция подходит под текущий Оффер, тогда она активная и не кликабельная
            const isCurrentOption = currentOptions.includes(option.id);

            options.push(
                <div key={option.id} className="py-2">
                    {isCurrentOption ?
                        <RedButton className="px-3 py-2 mx-2">
                            {lang["cl"] == "en" ? option.value_en : option.value}
                        </RedButton>
                        :
                        <RedLinkReversed
                            href={`/offer/${option.offerId}`}
                            className="rounded-md py-2 px-3 mx-2"
                        >
                            {lang["cl"] === "en" ? option.value_en : option.value}
                        </RedLinkReversed>
                    }
                </div>
            );
        }


        // упаковка ссылок на отрисовку
        linksToItemOffers.push(
            <div className="mb-4" key={shape.name}>
                {lang["cl"] == "en" ? shape.name_en : shape.name}
                <div className="flex flex-wrap justify-around mt-2">
                    {options}
                </div>
            </div>
        )
    }

    return <> {linksToItemOffers} </> 
}