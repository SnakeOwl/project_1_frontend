"use client"
import ContextLang from "@/context/Lang/ContextLang";
import { useContext, useEffect, useState } from "react"
import CardsList from "./Components/CardsList";
import { RedLink } from "@/Components/Links/ColoredLinks";
import { useRouter } from "next/navigation";

export default function Page() {
    const { stateLang } = useContext(ContextLang);
    const { lang } = stateLang;

    const router = useRouter();

    
    // если у пользователя нет товара в корзине, то перенапавить
    useEffect(()=>{
        if (stateLang.bkey === undefined &&
            localStorage.getItem("bkey") === null){
            router.push("/catalog");
        }
    })


    return (
        <div className="w-full xl:w-3/4 mx-auto">
            <h1 className="text-center mb-4">{lang["basket"]}</h1>

            <CardsList />

            <div className="w-full xl:w-1/5 mx-auto text-center mt-8 ">
                <RedLink className="w-full py-2" href="/basket/checkout">{lang["checkout"]}</RedLink>
            </div>
        </div>
    )
}