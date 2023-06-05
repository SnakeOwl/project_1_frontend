import { RedButton, RedButtonReversed } from "@/Components/Buttons/ColoredButtons"
import Img from "@/Components/Img"
import ContextLang from "@/context/Lang/ContextLang"
import Link from "next/link"
import { useContext } from "react"

export default function Card({
    offer
}: {
    offer: {
        id: BigInt,
        short_image: string | null,
        price: number,

        item: {
            name: string,
            name_en: string,
            description: string,
            description_en: string,
        }
    }
}) {

    const { stateLang } = useContext(ContextLang);
    const { lang } = stateLang;

    const offerLink = `/offer/${offer.id}`;

    function toCart() {
        alert("В разработке")
    }

    function fastBuy() {
        alert("В разработке")
    }

    return (
        <div className="p-2 ml-1 mb-8 w-full xl:w-1/6">
            <div className="h-64 rounded-xl overflow-hidden">
                <Link href={offerLink} className="h-full w-full" >
                    <Img
                        className=" h-full w-full object-cover"
                        src={offer.short_image}
                        isAPIimage={true}
                    />

                </Link>
            </div>

            <div className="px-3">
                <Link href={offerLink} >
                    <div className="mb-3 h3">
                        {lang["currentLocale"] === "ru" ?
                            offer.item.name
                            :
                            offer.item.name_en
                        }
                    </div>
                </Link>

                <div className="flex justify-between mb-2">
                    <span>{lang["price"]}</span>
                    <span>{offer.price}</span>
                </div>

                <div className="flex justify-between">
                    <RedButton
                        className={"py-2 px-5 rounded-md"}
                        onClick={toCart}
                    >
                        {lang["to basket"]}
                    </RedButton>

                    <RedButtonReversed
                        className={"py-2 px-3 rounded-md"}
                        onClick={fastBuy}
                    >
                        <i className="bi bi-hand-index-thumb"></i>
                    </RedButtonReversed>
                </div>
            </div>

        </div>
    )
}