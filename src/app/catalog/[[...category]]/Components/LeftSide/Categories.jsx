import {  BlueLinkReversed } from "@/Components/Links/ColoredLinks";
import axiosClient from "@/axios-client";
import ContextCatalog from "@/context/Catalog/ContextCatalog";
import { useContext, useEffect, useState } from "react";
import Options from "./Options";
import { BlueButton } from "@/Components/Buttons/ColoredButtons";

export default function Categories({ className = "" }) {

    const { stateCatalog } = useContext(ContextCatalog)
    const { activeCategoryAlias } = stateCatalog;
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axiosClient.get("catalog/get-categories")
            .then(({ data }) => {
                setCategories(data.categories);
            })
    }, [activeCategoryAlias])


    return (
        <div className={`${className} flex flex-col`}>
            {categories.map((category) => {
                return (stateCatalog.activeCategoryAlias === category.alias) ?
                    (
                        <div 
                            key={category.id}
                            
                        >
                            <BlueButton className={"py-2 text-center mb-3 w-full"} >
                                {category.name}
                            </BlueButton>

                            <Options categoryId={category.id}/>
                        </div>
                    )
                    :
                    (
                        <BlueLinkReversed
                            key={category.id}
                            href={`/catalog/${category.alias}`}
                            className={"py-2 text-center mb-3 rounded"}
                        >
                            {category.name}
                        </BlueLinkReversed>
                    );
            })}
        </div>
    );
}
