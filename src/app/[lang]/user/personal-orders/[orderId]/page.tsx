"use client"
import axiosClient from "@/axios-client";
import ContextLang from "@/context/Lang/ContextLang";
import IOrder from "@/interfaces/IOrder";
import { useContext, useEffect, useState } from "react";
import GeneralInfo from "./Components/GeneralInfo";
import Preloader from "@/Components/Preloader";
import ListOfOffers from "./Components/ListOfOffers";


function updateOrder(
    orderId: string,
    setOrder: Function
) {
    axiosClient.get(`/user/orders/${orderId}`)
        .then(({ data }) => {
            setOrder(data.order)
        })
        .catch(() => {
            console.log("can't get Order data from API");
        })
}


export default function Page({
    params
}: {
    params: {
        orderId: string
    }
}) {

    const { orderId } = params;

    const { stateLang } = useContext(ContextLang)
    const { lang } = stateLang;


    const [order, setOrder] = useState<IOrder>();


    useEffect(() => {
        updateOrder(orderId, setOrder);
    }, [orderId])


    if (order === undefined)
        return <Preloader />


    return (
        <main>
            <h2 className="text-center mb-4">
                {lang["general information"]}
            </h2>

            <GeneralInfo
                lang={lang}
                order={order}
            />

            <h2 className="text-center mt-8 mb-4">
                {lang["list of offers in order"]}
            </h2>

            <ListOfOffers
                offers={order.basket.offers}
                lang={lang}
            />
        </main>
    )
}