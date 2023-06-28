import IOffer from "@/interfaces/IOffer"
import Link from "next/link"

export default function ListOfOffers({
    offers,
    lang
}: {
    offers: IOffer[],
    lang: any
}) {

    const classes = "border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400";

    console.log(offers)
    return (
        <div>
            <table className="w-full">
                <thead>
                    <tr  className="border-b border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400">
                        <td className="p-4">#</td>
                        <td className="p-4">{lang["name"]}</td>
                        <td className="p-4">{lang["count"]}</td>
                        <td className="p-4">{lang["price"]}</td>
                    </tr>
                </thead>

                <tbody>
                    {
                        offers.map(offer => {
                            return (
                                <tr key={offer.id} className="border-b border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400">
                                    <td className="p-4">
                                        <Link href={`/offer/${offer.id}`}>
                                            {offer.id}
                                        </Link>
                                    </td>
                                    <td className="p-4">
                                        {lang["cl"] === "ru" ? offer.item.name : offer.item.name_en}
                                    </td>
                                    <td className="p-4">
                                        {offer.pivot?.count}
                                    </td>
                                    <td className="p-4">
                                        {offer.price}
                                    </td>

                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}