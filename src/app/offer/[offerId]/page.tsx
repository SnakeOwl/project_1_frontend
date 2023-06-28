"use client"
import { RedButton } from "@/Components/Buttons/ColoredButtons";
import Preloader from "@/Components/Preloader";
import axiosClient from "@/axios-client";
import ContextLang from "@/context/Lang/ContextLang"
import { useContext, useEffect, useState } from "react"
import Galery from "./Conmponents/Galery";
import Img from "@/Components/Img";
import { RedLinkReversed } from "@/Components/Links/ColoredLinks";
import ToBusketButton from "@/Components/Buttons/ToBusketButton";
import SubscribeArea from "@/app/Components/SubscribeArea";
import IOffer from "@/interfaces/IOffer";
import LinksToTheOtherOffers from "./Conmponents/LinksToTheOtherOffers";
import ILinkToOffer from "./Conmponents/ILinkToOffer";

export default function Offer({
    params
}: {
    params: { offerId: string }
}) {
    const { stateLang } = useContext(ContextLang);
    const { lang } = stateLang;

    // current offer
    const [offer, setOffer] = useState<IOffer>();


    // links to current Item Offers (include current offer)
    const [linksToOffers, setLinksToOffers] = useState<ILinkToOffer[]>();


    useEffect(() => {
        axiosClient.get(`catalog/${params.offerId}`)
            .then(({ data }) => {
                setOffer(data.offer);
                setLinksToOffers(Object.values(data.itemOffersLinks));
            })
    }, [params.offerId]);


    if (offer === undefined)
        return <Preloader />


    return (
        <main className="w-full mx-auto xl:w-3/4">
            {/* top of page */}
            <div className="flex flex-wrap">
                <div className="w-full xl:w-1/2 mb-4">
                    <Img isAPIimage={true} src={offer.short_image} />
                </div>

                <div className="w-full xl:w-1/2">
                    <h1>
                        { `${lang["buy"]} ` + (lang["cl"] === "ru" ? offer.item.name : offer.item.name_en) }
                    </h1>

                    {linksToOffers !== undefined &&
                        <LinksToTheOtherOffers
                            linksToOffers={linksToOffers}
                            offerOptions={offer.options}
                            lang={lang}
                        />

                    }

                    <p className="text-xl">{`${lang["price"]}: ${offer.price}`}</p>


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

                        <div className="w-full xl:w-1/2 mx-auto">
                            <SubscribeArea offerId={offer.id} />
                        </div>
                    }
                </div>
            </div>


            {/* Galery */}
            {offer.images !== null && offer.images.length > 0 &&
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
                <div className="overflow-auto">

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