"use client"
import { useContext } from "react"
import OrdersList from "./Components/OrdersList";
import ContextDictionary from "@/context/DIctionary/ContextDictionary";


export default function PersonalOrders() {

    const dictionary = useContext(ContextDictionary);


    return (

        <main>
            <h1 className="text-center">
                {dictionary["orders"]}
            </h1>

            <OrdersList />
        </main>
    )
}