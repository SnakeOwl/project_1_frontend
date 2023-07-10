"use client"
import axiosClient from "@/axios-client";
import { RedButtonReversed } from "@/Components/Buttons/ColoredButtons";
import ContextUser from "@/context/User/ContextUser";
import { useContext } from "react";

export default function LogoutButton() {
    
    const { stateUser } = useContext(ContextUser);


    async function handleClick() {
        await axiosClient.post('logout')
            .then(() => {
                // стереть с локального хранилища, 
                // чтобы приложение не начало получать данные по пользователю через токен
                localStorage.removeItem("ACCESS_TOKEN");
            });
    }


    if (stateUser.token === undefined)
        return <></>;


    return (
        <RedButtonReversed
            onClick={handleClick}
            className="px-2 py-1 mr-3 rounded-md"
        >
            <i className="bi bi-box-arrow-up-right"></i>
        </RedButtonReversed>
    )
}