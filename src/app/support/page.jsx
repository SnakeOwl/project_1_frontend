"use client"
import ContextLang from "@/context/Lang/ContextLang";
import { useContext } from "react"
import SupportForm from "./Components/SupportForm"


export default function SupportPage(){
    const {stateLang} = useContext(ContextLang);
    const {lang} = stateLang;

    return (
        <main className="mx-auto text-center xl:w-1/4">
            <h1>{lang['contact form']}</h1>
            
            <SupportForm 
                lang={lang}
                className="" 
            />
        </main>
    )
}