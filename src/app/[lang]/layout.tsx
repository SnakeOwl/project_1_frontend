"use client"
import "./globals.css";

import localFont from "next/font/local";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import { Locale, i18n } from '@/i18n-config'
import getDictionaryStatic from "@/utils/get-dictionary-static";
import ContextDictionary from "@/context/DIctionary/ContextDictionary";
import { useReducer } from "react";
import ReducerUser from "@/context/User/ReducerUser";
import ContextUser from "@/context/User/ContextUser";
import UserContextType from "@/context/User/UserContextType";

const comfortaa = localFont({
    src: [
        {
            path: "../../fonts/Comfortaa.ttf",
        },
    ],
});



export async function generateStaticParams() {
    return i18n.locales.map((locale) => ({ lang: locale }))
}


export default function RootLayout({
    children,
    params,
}: {
    params: { lang: Locale }
    children: React.ReactNode;
}) {

    const dictionary = getDictionaryStatic(params.lang);


    const updatedStateUser : UserContextType = {
        token: undefined,
        bkey: undefined
    };

    if (typeof window !== "undefined") {
        updatedStateUser.token = localStorage?.getItem("ACCESS_TOKEN") || undefined;
        updatedStateUser.bkey = localStorage?.getItem("bkey") || undefined;
    }

    const [stateUser, dispatchUser] = useReducer(ReducerUser, updatedStateUser);


    return (
        <html lang={params.lang}>
            <body className={`${comfortaa.className} bg-white dark:bg-gray-950 dark:text-gray-300 px-4 xl:px-0`}>
                <ContextDictionary.Provider value={dictionary}>
                    <ContextUser.Provider value={{ stateUser, dispatchUser }}>
                        <Header />

                        {children}

                        <Footer />
                    </ ContextUser.Provider>

                </ContextDictionary.Provider >
            </body>
        </html>
    );
}
