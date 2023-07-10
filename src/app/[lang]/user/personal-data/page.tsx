"use client"

import Preloader from "@/Components/Preloader";
import axiosClient from "@/axios-client";
import IUser from "@/interfaces/IUser";
import { useContext, useEffect, useState } from "react"
import Form from "./Components/Form";
import ContextDictionary from "@/context/DIctionary/ContextDictionary";


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

    const dictionary = useContext(ContextDictionary);


    const [user, setUser] = useState<IUser>();


    // получeние данных от api
    useEffect(() => {
        updateData(setUser);
    }, []);


    if (user === undefined)
        return <Preloader />


    return (
        <div>
            <h1 className="text-center">{dictionary["personal data"]}</h1>

            <Form user={user} />
        </div>
    )
}

