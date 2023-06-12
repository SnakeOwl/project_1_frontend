import { RedButton, RedButtonReversed } from "@/Components/Buttons/ColoredButtons";
import Preloader from "@/Components/Preloader";
import axiosClient from "@/axios-client";
import { useState } from "react"

export default function ToBusketButton({
    offerId,
    className = "",
    children
}: {
    offerId: number,
    className: string,
    children: React.ReactNode
}) {
    
    const [inBasket, setInBasket] = useState(false);
    const [error, setError] = useState(false);


    async function handleClick(){
        const bkey = localStorage.getItem("basketKey") || null;

        await axiosClient.get(`/basket/add/${offerId}`, {
            params: { key: bkey }
        })
        .then( ({data})=>{
            setInBasket(true);

            if(bkey === null){
                localStorage.setItem("basketKey", data.bkey);
            }
        })
        .catch(error => {
            console.log(error);
            setError(true);
        });
    }

    // произошла ошибка
    if (error)
        return <Preloader />;

    // товар добавлен
    if (inBasket)
        return <RedButtonReversed className={className}>I Love You ❤</RedButtonReversed>

    return (
        <RedButton
            className={className}
            onClick={handleClick}
        >
            {children}
        </RedButton>
    )
}