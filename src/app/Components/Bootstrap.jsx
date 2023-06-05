import ContextUser from "@/context/User/ContextUser";
import { useContext, useEffect } from "react";
import axiosClient from "@/axios-client";

/*
 по идее тут должны производиться операции по получению данных.
 к примеру получение пользователя по токену(если таковой имеется)
 */
export default function Bootstrap() {
    // обновление данных пользователя по токену
    const { stateUser, dispatchUser } = useContext(ContextUser);
    const { user } = stateUser;

    useEffect(()=>{
        const token = (typeof window === "undefined") ? null : window.localStorage.getItem("ACCESS_TOKEN", null)

        if (user === null && token !== null) {
            // если у пользователя уже есть токен, то проверить/обновить его данные через api
            if (token !== null) {
                axiosClient.get('/user')
                    .then(({ data }) => {
                        dispatchUser({
                            type: "SET_USER",
                            user: data
                        })
                    })
                    .catch(error => {
                        console.log("Error getting user information.");
                        console.log(error);
                    });
            }
        }
    },[])


    return (<></>);
}