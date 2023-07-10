"use client"
import CardsList from "./Components/CardsList";
import { RedLink } from "@/Components/Links/ColoredLinks";
import getDictionaryStatic from "@/utils/get-dictionary-static";
import { Locale } from "@/i18n-config";

export default function Page({
    params: {lang}
}:{
    params:{
        lang:Locale
    }
}) {

    const dictionary = getDictionaryStatic(lang)

    
    return (
        <div className="w-full xl:w-3/4 mx-auto">
            <h1 className="text-center mb-4">{dictionary["basket"]}</h1>

            <CardsList />

            <div className="w-full xl:w-1/5 mx-auto text-center mt-8 ">
                <RedLink className="w-full py-2" href="/basket/checkout">{dictionary["checkout"]}</RedLink>
            </div>
        </div>
    )
}