import axiosClient from "@/axios-client";
import {  RedButtonReversed } from "@/Components/Buttons/ColoredButtons";
import ContextUser from "@/context/User/ContextUser";
import { useContext } from "react";

export default function Logout({className}) {
    const {dispatchUser} = useContext(ContextUser);
    
    async function handleClick() {
        await axiosClient.post('logout')
            .then(() => {
                // стереть из памяти
                dispatchUser({
                    type: 'SET_USER',
                    user: null
                });

                // стереть с локального хранилища, 
                // чтобы приложение не начало получать данные по пользователю через токен
                localStorage.removeItem("ACCESS_TOKEN");
            });
    }

    return (
        <RedButtonReversed
            onClick={handleClick}
            className={className}
        >
            <i className="bi bi-box-arrow-up-right"></i>
        </RedButtonReversed>
    )
}