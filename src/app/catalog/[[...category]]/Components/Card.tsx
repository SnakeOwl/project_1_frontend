import { RedButtonReversed } from "@/Components/Buttons/ColoredButtons"
import Img from "@/Components/Img"
import ContextLang from "@/context/Lang/ContextLang"
import Link from "next/link"
import { useContext } from "react"
import ToBusketButton from "@/Components/Buttons/ToBusketButton"
import IOffer from "@/interfaces/IOffer"
import SubscribeArea from "../../../Components/SubscribeArea"

export default function Card({
    offer
}: {
    offer: IOffer
}) {

    const { stateLang } = useContext(ContextLang);
    const { lang } = stateLang;

    const offerLink = `/offer/${offer.id}`;

    function fastBuy() {
        alert("В разработке")
    }

    return (
        <div className="p-2 pb-4 ml-1 mb-8 w-full xl:w-1/6 ring-1 rounded-lg ring-gray-800">
            <div className="h-64 rounded-xl overflow-hidden mb-2">
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

                {offer.count > 0 ?
                    <div className="flex justify-between">
                        <ToBusketButton
                            offerId={offer.id}
                            className={"py-2 px-5 rounded-md"}
                        >
                            {lang["to basket"]}
                        </ToBusketButton>

                        <RedButtonReversed
                            className={"py-2 px-3 rounded-md"}
                            onClick={fastBuy}
                        >
                            <i className="bi bi-hand-index-thumb"></i>
                        </RedButtonReversed>
                    </div>
                    :
                    <SubscribeArea offerId={offer.id} />
                }
            </div>
        </div>
    )
}