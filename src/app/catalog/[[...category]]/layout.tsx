"use client"
import StateCatalog from "@/context/Catalog/StateCatalog";
import LeftSide from "./Components/LeftSide";
import { useEffect, useReducer } from "react";
import ReducerCatalog from "@/context/Catalog/ReducerCatalog";
import ContextCatalog from "@/context/Catalog/ContextCatalog";
import axiosClient from "@/axios-client";

export default function Layout({
    params,
    children
}: {
    children: React.ReactNode,
    params: { category: [string | undefined] }
}) {
    // определение названия категории, которая приходит через строку браузера
    const activeCategoryAlias = params.category !== undefined ? params.category[0] : null;


    // переменная для передачи state в reducer
    const newStateCatalog = {
        ...StateCatalog,
        activeCategoryAlias: activeCategoryAlias
    };

    const [stateCatalog, dispatchCatalog] = useReducer(ReducerCatalog, newStateCatalog);

    return (
        <div className="flex">
            <ContextCatalog.Provider value={{ stateCatalog, dispatchCatalog }}>

                <LeftSide className={"hidden xl:block lx:w-1/6 px-3"} />

                <main className="w-full xl:w-5/6">
                    {children}
                </main>

            </ContextCatalog.Provider >
        </div>
    )

}