"use client"

import Navigation from "./Components/Navigation";
import getDictionaryStatic from "@/utils/get-dictionary-static";
import { Locale } from "@/i18n-config";
import { useContext, useEffect } from "react";
import ContextUser from "@/context/User/ContextUser";
import { useRouter } from "next/navigation";


function useRedirect(){
    // перенаправление, если пользователя нет в локальном хранилище
    const { stateUser } = useContext(ContextUser);
    const router = useRouter();

    useEffect(() => {
        if (stateUser.token === undefined)
            router.push("/login") // redirect
    }, [stateUser.token]);
}


export default function UserLayout({
    children,
    params: {lang}
}: {
    children: React.ReactNode,
    params: {
        lang: Locale
    }
}) {

    const dictionary = getDictionaryStatic(lang);


    useRedirect();


    return (
        <div className="w-full xl:w-4/5 mx-auto flex flex-wrap">
            <div className="w-full xl:w-1/4">
                <Navigation dictionary={dictionary} />
            </div>

            <div className="w-full xl:w-3/4">
                {children}
            </div>
        </div>
    )

}