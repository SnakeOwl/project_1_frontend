import ActiveOrdersList from "./Components/ActiveOrdersList";
import Head from "next/head";
import { getDictionary } from "@/utils/get-dictionary";
import { Locale } from "@/i18n-config";


export default async function PersonalPage({
    params
}: {
    params: {
        lang: Locale
    }
}) {

    const dictionary = await getDictionary(params.lang);

    return (

        <div>
            <Head>
                <title>dadada</title>
                <meta property="og:title" content={dictionary["personal page"]} key="title" />
            </Head>

        <main>
            <h1 className="text-center">
                {dictionary["active orders"]}
            </h1>

            <ActiveOrdersList dictionary={dictionary} />
        </main>
        </div>
    )
}