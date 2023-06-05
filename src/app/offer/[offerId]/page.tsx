"use client"
import { RedButton } from "@/Components/Buttons/ColoredButtons";
import Preloader from "@/Components/Preloader";
import axiosClient from "@/axios-client";
import ContextLang from "@/context/Lang/ContextLang"
import { useContext, useEffect, useState } from "react"
import Galery from "./Conmponents/Galery" ;

export default function Offer({
    params
}: {
    params: { offerId: string }
}) {
    const { stateLang } = useContext(ContextLang);
    const { lang } = stateLang;

    const [offer, setOffer] = useState({
        id: 0,
        count: 0,
        price: 0,
        images: [{ id:0, url:"" }],

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
    const [linksToAnotherOffers, setLinksToAnotherOffers] = useState({
        name: "string",
        name_en: "string",
        options: [{
            id: 0,
            value: "string",
            value_en: "string",
            offerId: 0
        }]
    })


    useEffect(() => {
        axiosClient.get(`catalog/${params.offerId}`)
            .then(({ data }: {
                data: {
                    offer: {
                        id: number,
                        count: number,
                        price: number,
                        images: [{ id:number, url:string }],

                        item: {
                            id: number,
                            name: string,
                            name_en: string,
                            description: string,
                            description_en: string,

                            parameters: [{
                                id: number,
                                param_name: string,
                                param_name_en: string,
                                param_value: string,
                                param_value_en: string
                            }]
                        }
                    },

                    itemOffersLinks: {
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
            }) => {
                setOffer(data.offer);
                setLinksToAnotherOffers(data.itemOffersLinks);
            })
    }, [params.offerId]);



    if (offer.id === 0) {
        return <Preloader />
    }


    function handleToBusketClick() {
        alert("zaglushka");
    }

    return (
        <main className="xl:mx-96 px-1">
            <div className="flex flex-wrap">
                <div className="w-full xl:w-1/2 p-3">
                    <Galery images={offer.images} />
                </div>

                <div className="w-full xl:w-1/2 p-3">
                    <h1>
                        {
                            `${lang["buy"]} ` + (lang["currentLocale"] === "ru" ? offer.item.name : offer.item.name_en)
                        }
                    </h1>

                    <p>{`${lang["price"]}: ${offer.price}`}</p>

                    {offer.count > 0 ?
                        <RedButton
                            className={"px-5 py-2 rounded-md text-xl w-full xl:w-auto"}
                            onClick={handleToBusketClick}
                        >
                            {lang["to basket"]}
                        </RedButton>
                        :
                        <span>{lang["no more offers"]}</span>
                    }
                </div>
            </div>

            <div className="w-full px-1">
                <p>{lang["currentLocale"] === "ru"? offer.item.description : offer.item.description_en}</p>

                <h3>{lang["item field parameters"]}</h3>
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

            

            <div className="w-full mt-3 flex">
                <RedButton
                    className={"py-3 rounded-md text-xl mx-auto w-full xl:w-1/4"}
                    onClick={handleToBusketClick}
                >
                    {lang["to basket"]}
                </RedButton>
            </div>
        </main>
    )
}