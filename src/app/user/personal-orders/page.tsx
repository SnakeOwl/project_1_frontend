"use client"
import ContextLang from "@/context/Lang/ContextLang";
import { useContext } from "react"
import OrdersList from "./Components/OrdersList";


export default function PersonalOrders() {

    const { stateLang } = useContext(ContextLang);
    const { lang } = stateLang;


    return (

        <main>
            <h1 className="text-center">
                {lang["orders"]}
            </h1>

            <OrdersList />
        </main>
    )
}