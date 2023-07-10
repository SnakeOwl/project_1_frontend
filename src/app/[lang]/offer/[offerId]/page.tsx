"use client"
import Preloader from "@/Components/Preloader";
import axiosClient from "@/axios-client";
import { useContext, useEffect, useState } from "react"
import Galery from "./Conmponents/Galery";
import Img from "@/Components/Img";
import ToBusketButton from "@/Components/Buttons/ToBusketButton";
import SubscribeArea from "../../Components/SubscribeArea";
import IOffer from "@/interfaces/IOffer";
import LinksToTheOtherOffers from "./Conmponents/LinksToTheOtherOffers";
import ILinkToOffer from "./Conmponents/ILinkToOffer";
import ContextDictionary from "@/context/DIctionary/ContextDictionary";


export default function Offer({
    params
}: {
    params: { offerId: string }
}) {

    const dictionary = useContext(ContextDictionary);


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
                        { `${dictionary["buy"]} ` + (dictionary["cl"] === "ru" ? offer.item.name : offer.item.name_en) }
                    </h1>

                    {linksToOffers !== undefined &&
                        <LinksToTheOtherOffers
                            linksToOffers={linksToOffers}
                            offerOptions={offer.options}
                        />

                    }

                    <p className="text-xl">{`${dictionary["price"]}: ${offer.price}`}</p>


                    {offer.count > 0 ?
                        <div className="w-full mt-3 flex">
                            <ToBusketButton
                                offerId={offer.id}
                                className={"py-3 rounded-md text-xl mx-auto w-full xl:w-1/4"}
                            >
                                {dictionary["to basket"]}
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
                    <h2 className="text-center my-3">{dictionary["galery"]}</h2>
                    <Galery images={offer.images} />
                </div>
            }


            {/* Description */}
            <div className="my-8 w-full">
                <h2 className="text-center">{dictionary["description"]}</h2>
                <p>{dictionary["currentLocale"] === "ru" ? offer.item.description : offer.item.description_en}</p>
            </div>


            {/* Parameters of Item */}
            <div className="w-full my-8">
                <h2 className="text-center">{dictionary["item field parameters"]}</h2>
                <div className="overflow-auto">

                    <table className="w-full">
                        <tbody>
                            {
                                offer.item.parameters.map(parameter => {
                                    return (
                                        <tr key={parameter.id}>
                                            <td>
                                                {dictionary["cl"] === "ru" ? parameter.param_name : parameter.param_name_en}
                                            </td>
                                            <td>
                                                {dictionary["cl"] === "ru" ? parameter.param_value : parameter.param_value_en}
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
                        {dictionary["to basket"]}
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