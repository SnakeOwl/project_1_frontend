import { RedButtonReversed } from "@/Components/Buttons/ColoredButtons"
import Img from "@/Components/Img"
import Link from "next/link"
import ToBusketButton from "@/Components/Buttons/ToBusketButton"
import IOffer from "@/interfaces/IOffer"
import SubscribeArea from "../../../Components/SubscribeArea"
import { useContext } from "react"
import ContextDictionary from "@/context/DIctionary/ContextDictionary"

export default function Card({
    offer
}: {
    offer: IOffer
}) {

    const offerLink = `/offer/${offer.id}`;

    const dictionary = useContext(ContextDictionary)

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
                        {dictionary["currentLocale"] === "ru" ?
                            offer.item.name
                            :
                            offer.item.name_en
                        }
                    </div>
                </Link>

                <div className="flex justify-between mb-2">
                    <span>{dictionary["price"]}</span>
                    <span>{offer.price}</span>
                </div>

                {offer.count > 0 ?
                    <div className="flex justify-between">
                        <ToBusketButton
                            offerId={offer.id}
                            className={"py-2 px-5 rounded-md"}
                        >
                            {dictionary["to basket"]}
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