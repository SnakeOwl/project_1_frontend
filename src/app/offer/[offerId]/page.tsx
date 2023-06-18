"use client"
import { RedButton } from "@/Components/Buttons/ColoredButtons";
import Preloader from "@/Components/Preloader";
import axiosClient from "@/axios-client";
import ContextLang from "@/context/Lang/ContextLang"
import { useContext, useEffect, useState } from "react"
import Galery from "./Conmponents/Galery";
import Img from "@/Components/Img";
import { RedLinkReversed } from "@/Components/Links/ColoredLinks";
import IItem from "@/interfaces/IItem";
import ToBusketButton from "@/Components/Buttons/ToBusketButton";
import SubscribeArea from "@/app/Components/SubscribeArea";

export default function Offer({
    params
}: {
    params: { offerId: string }
}) {
    const { stateLang } = useContext(ContextLang);
    const { lang } = stateLang;

    // current offer
    const [offer, setOffer] = useState({
        id: 0,
        count: 0,
        price: 0,
        images: [{ id: 0, url: "" }],
        short_image: "",

        options: [{
            id: 0,
            value: "",
            value_en: ""
        }],

        item: {
            id: 0,
            name: "",
            name_en: "",
            description: "",
            description_en: "",

            parameters: [{
                id: 0,
                param_name: "string",
                param_name_en: "string",
                param_value: "string",
                param_value_en: "string"
            }]
        }
    });


    // links to current Item Offers (include current offer)
    const [linksToOffers, setLinksToOffers] = useState([
        {
            name: "string",
            name_en: "string",
            options: [{
                id: 0,
                value: "string",
                value_en: "string",
                offerId: 0
            }]
        }
    ]);


    useEffect(() => {
        axiosClient.get(`catalog/${params.offerId}`)
            .then(({ data }: {
                data: {
                    offer: {
                        id: number,
                        count: number,
                        price: number,
                        images: [{ id: number, url: string }],
                        short_image: string,

                        options: [{
                            id: 0,
                            value: "",
                            value_en: ""
                        }],

                        item: IItem
                    },

                    itemOffersLinks: {
                        id: {
                            name: string,
                            name_en: string,
                            options: [{
                                id: number,
                                value: string,
                                value_en: string,
                                offerId: number
                            }]
                        }
                    }
                }
            }) => {
                setOffer(data.offer);
                setLinksToOffers(Object.values(data.itemOffersLinks));
            })
    }, [params.offerId]);


    if (offer.id === 0)
        return <Preloader />




    // создание ссылок на другие Офферы текущего Товара
    const linksToItemOffers = [];
    if (offer.id !== 0) {
        const currentOptions = offer.options.map(op => { return op.id });


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
                    <div key={option.id}>
                        {isCurrentOption ?
                            <RedButton
                                className="px-3 py-2 mx-2"
                            >
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
    }


    return (
        <main className="xl:mx-96 px-1">
            {/* top of page */}
            <div className="flex flex-wrap">
                <div className="w-full xl:w-1/2 p-3">
                    <Img isAPIimage={true} src={offer.short_image} />
                </div>

                <div className="w-full xl:w-1/2 p-3">
                    <h1>
                        {
                            `${lang["buy"]} ` + (lang["currentLocale"] === "ru" ? offer.item.name : offer.item.name_en)
                        }
                    </h1>

                    {linksToItemOffers}

                    <p>{`${lang["price"]}: ${offer.price}`}</p>



                    {offer.count > 0 ?
                        <div className="w-full mt-3 flex">
                            <ToBusketButton
                                offerId={offer.id}
                                className={"py-3 rounded-md text-xl mx-auto w-full xl:w-1/4"}
                            >
                                {lang["to basket"]}
                            </ToBusketButton>
                        </div>
                        :
                        
                            <div className="w-full xl:w-1/2 ">
                                <SubscribeArea offerId={offer.id} />
                            </div>
                        
                    }
                </div>
            </div>


            {/* Galery */}
            {offer.images.length > 0 &&
                <div className="w-full my-8">
                    <h2 className="text-center my-3">{lang["galery"]}</h2>
                    <Galery images={offer.images} />
                </div>
            }


            {/* Description */}
            <div className="my-8 w-full">
                <h2 className="text-center">{lang["description"]}</h2>
                <p>{lang["currentLocale"] === "ru" ? offer.item.description : offer.item.description_en}</p>
            </div>


            {/* Parameters of Item */}
            <div className="w-full my-8">
                <h2 className="text-center">{lang["item field parameters"]}</h2>
                <table className="w-full">
                    <tbody>
                        {
                            offer.item.parameters.map(parameter => {
                                return (
                                    <tr key={parameter.id}>
                                        <td>
                                            {lang["currentCurrency"] === "ru" ? parameter.param_name : parameter.param_name_en}
                                        </td>
                                        <td>
                                            {lang["currentCurrency"] === "ru" ? parameter.param_value : parameter.param_value_en}
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>


            {offer.count > 0 ?
                <div className="w-full mt-3 flex">
                    <ToBusketButton
                        offerId={offer.id}
                        className={"py-3 rounded-md text-xl mx-auto w-full xl:w-1/4"}
                    >
                        {lang["to basket"]}
                    </ToBusketButton>
                </div>
                :
                <div className="w-full flex justify-center">
                    <div className="w-full xl:w-1/4 ">
                        <SubscribeArea offerId={offer.id} />
                    </div>
                </div>
            }
        </main>
    )
}