"use client"
import ContextLang from "@/context/Lang/ContextLang";
import { useContext } from "react"
import ActiveOrdersList from "./Components/ActiveOrdersList";
import Head from "next/head";


export default function PersonalPage() {

    const { stateLang } = useContext(ContextLang);
    const { lang } = stateLang;


    return (

        <div>
            <Head>
                <title>dadada</title>
                <meta property="og:title" content={lang["personal page"]} key="title" />
            </Head>

        <main>
            <h1 className="text-center">
                {lang["active orders"]}
            </h1>

            <ActiveOrdersList />
        </main>
        </div>
    )
}