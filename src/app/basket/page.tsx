"use client"
import ContextLang from "@/context/Lang/ContextLang";
import { useContext, useEffect, useState } from "react"
import CardsList from "./Components/CardsList";
import { RedLink } from "@/Components/Links/ColoredLinks";

export default function Page() {
    const { stateLang } = useContext(ContextLang);
    const { lang } = stateLang;


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