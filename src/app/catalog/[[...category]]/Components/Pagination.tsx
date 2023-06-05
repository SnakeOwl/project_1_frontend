import { BlueButtonReversed } from "@/Components/Buttons/ColoredButtons"
import axiosClient from "@/axios-client"
import ContextCatalog from "@/context/Catalog/ContextCatalog"
import { useContext } from "react"

export default function Pagination({
    links
}: {
    links: [{
        url: string,
        label: string,
        active: boolean
    }]
}) {

    const { dispatchCatalog } = useContext(ContextCatalog);

    async function handleClick(url: string) {
        await axiosClient.get(url)
            .then(({ data }: { data: { offers: [] } }) => {
                
                dispatchCatalog({
                    type: "SET_OFFERS",
                    offers: data.offers
                });
            })
            .catch(error => {
                console.log(error);
            })
    }



    return (
        <div className="w-fit flex mx-auto">
            {
                
                links.map(link => {
                    const activeC = link.active === true ? "ring-blue-950 cursor-default" : "";
                    return (
                        <BlueButtonReversed
                            key={link.label}
                            className={`py-1 px-3 first:rounded-l-md last:rounded-r-md ${activeC}`}
                            onClick={() => handleClick(link.url)}
                        >
                            {link.label}
                        </BlueButtonReversed>
                    )
                })
            }
        </div>
    )
}