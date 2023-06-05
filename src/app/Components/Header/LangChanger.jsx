import { useContext, useEffect } from "react";
import ContextLang from "@/context/Lang/ContextLang"
import { BlueButtonReversed } from "@/Components/Buttons/ColoredButtons";

export default function LangChanger({className}){
    const {dispatchLang} = useContext(ContextLang);

    function setLang(lang="ru"){
        localStorage.setItem("lang", lang);
        
        dispatchLang({
            type: 'UPDATE_LANG',
            lang: lang
        });
    }

    const targetLang = localStorage.getItem("lang", "ru") === "ru"? "En": "Ru";
    

    return (
        <BlueButtonReversed className={className} onClick={()=>setLang(targetLang.toLowerCase())}>
            {targetLang}
        </BlueButtonReversed>
    )
}