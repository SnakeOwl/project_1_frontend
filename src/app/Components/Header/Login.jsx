import { BlueLink } from "@/Components/Links/ColoredLinks";
import ContextLang from "@/context/Lang/ContextLang";
import { useContext } from "react";

export default function Login({className}){
    const {stateLang} = useContext(ContextLang)
    const {lang} = stateLang;

    return (
        <BlueLink className={className} href={"/user/login"}>
            {lang["login"]}
        </BlueLink>
    )
}