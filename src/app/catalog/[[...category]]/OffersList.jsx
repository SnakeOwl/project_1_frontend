import Card from "./Components/Card"

export default function OfferList({
    className,
    offers
}){
    return (
        <div className={`px-3 flex flex-wrap justify-between ${className}`}>
            {
                offers.map(offer=>{
                    return (
                        <Card 
                            key={`offer-${offer.id}`}
                            offer={offer}
                        />
                    )
                })
            }
        </div>
    )
}