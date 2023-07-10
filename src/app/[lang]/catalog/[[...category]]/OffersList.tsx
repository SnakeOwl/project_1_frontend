import IOffer from "@/interfaces/IOffer"
import Card from "./Components/Card"

export default function OfferList({
    offers
}: {
    offers: IOffer[]
}) {
    return (
        <main className="flex flex-wrap justify-around">
            {
                offers.map(offer => {
                    return (
                        <Card
                            key={`offer-${offer.id}`}
                            offer={offer}
                        />
                    )
                })
            }
        </main>
    )
}