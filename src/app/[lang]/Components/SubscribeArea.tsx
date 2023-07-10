import { BlueButton, BlueButtonReversed } from "@/Components/Buttons/ColoredButtons";
import { useContext, useState } from "react"
import SubscribeForm from "./SubscribeArea/SubscribeForm";
import ContextDictionary from "@/context/DIctionary/ContextDictionary";

export default function SubscribeArea({
    offerId,
}:{
    offerId: number
}) {

    const dictionary = useContext(ContextDictionary);
    
    const [formIsActive, setFormIsActive] = useState(false);

    if (formIsActive)
        return <SubscribeForm 
            dictionary={dictionary}
            offerId={offerId} 
        />


    return (
        <BlueButton
            onClick={()=>setFormIsActive(true)}
            className="py-2 rounded w-full"
        >
            {dictionary["subscribe"]}
        </BlueButton>
    )
}