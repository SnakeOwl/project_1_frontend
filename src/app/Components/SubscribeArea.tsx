import { BlueButton, BlueButtonReversed } from "@/Components/Buttons/ColoredButtons";
import { useContext, useState } from "react"
import SubscribeForm from "./SubscribeArea/SubscribeForm";
import ContextLang from "@/context/Lang/ContextLang";

export default function SubscribeArea({
    offerId
}:{
    offerId: number
}) {
    const {stateLang} = useContext(ContextLang);
    const {lang} = stateLang;

    const [formIsActive, setFormIsActive] = useState(false);

    if (formIsActive)
        return <SubscribeForm offerId={offerId} />


    return (
        <BlueButton
            onClick={()=>setFormIsActive(true)}
            className="py-2 rounded w-full"
        >
            {lang["subscribe"]}
        </BlueButton>
    )
}