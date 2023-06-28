"use client"

import Preloader from "@/Components/Preloader";
import axiosClient from "@/axios-client";
import ContextLang from "@/context/Lang/ContextLang"
import IUser from "@/interfaces/IUser";
import { useContext, useEffect, useState } from "react"
import Form from "./Components/Form";


function updateData(setFunc: Function) {

    axiosClient.get("/user")
        .then(({
            data
        }: {
            data: IUser
        }) => {
            setFunc({
                id: data.id,
                email: data.email,
                phone: data.phone || "",
                name: data.name
            });
        })
}


export default function Page() {

    const { stateLang } = useContext(ContextLang);
    const { lang } = stateLang;


    const [user, setUser] = useState<IUser>();


    // получeние данных от api
    useEffect(() => {
        updateData(setUser);
    }, []);


    if (user === undefined)
        return <Preloader />


    return (
        <div>
            <h1 className="text-center">{lang["personal data"]}</h1>

            <Form 
                lang={lang}
                user={user}
            />
        </div>
    )
}

