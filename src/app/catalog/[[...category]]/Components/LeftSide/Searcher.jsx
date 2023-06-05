"use client"
import axiosClient from "@/axios-client";
import { Input } from "@/Components/Inputs/Inputs";
import ContextLang from "@/context/Lang/ContextLang"
import { useContext, useState } from "react"
import ListOffers from "./Searcher/ListOffers";


export default function Searcher({className}){
    const {stateLang} = useContext(ContextLang);
    const {lang} = stateLang;

    const [search, setSearch] = useState("");
    const [matches, setMatches] = useState([]);

    async function handleChange(e){
        const val = e.target.value;
        setSearch(val);

        if (val.length < 3)
            return;


        const data = {name: e.target.value}
        await axiosClient.post('catalog/search', data)
            .then(({data})=>{
                setMatches(data);
            })
            .catch(error=>{
                // ошибки не нужно выводить
            })
    }

    
    return (
        <div className={className}>
            <Input
                id="itemName"
                className="p-2"
                value={search}
                placeholder={lang["search"]}
                onChange={handleChange}
            />

            <ListOffers 
                matches={matches}
            />
        </div>
    )
}