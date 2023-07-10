"use client"

import axiosClient from "@/axios-client";
import { BlueButton } from "@/Components/Buttons/ColoredButtons";
import { Input } from "@/Components/Inputs/Inputs";
import ContextUser from "@/context/User/ContextUser";
import { useContext, useState } from "react";

export default function LoginForm({
    dictionary
}:{
    dictionary: any
}) {

    // form's data
    const [data, setData] = useState({
        email: "",
        password: ""
    });

    function _setData(e: React.ChangeEvent<HTMLInputElement>){
        setData({
            ...data,
            [e.target.id]: e.target.value
        })
    }

    // form's side data
    const [side, setSide] = useState({
        errors: {
            email: undefined,
            password: undefined
        },
        errMessage: null,
    });


    const {dispatchUser} = useContext(ContextUser);


    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        await axiosClient.post('login', data)
            .then(({ data }) => {
                // обновление записи пользователя в приложении
                dispatchUser({
                    type: 'SET_TOKEN',
                    token: data.token,
                });

                // запись токена для проверки в API, на сервере
                if (data.token) {
                    localStorage.setItem('ACCESS_TOKEN', data.token);
                } else {
                    localStorage.removeItem('ACCESS_TOKEN');
                }
            })
            .catch(error => {
                // если нет респонса, значит нет ответа от сервера
                if (error.response === undefined) {
                    setSide(s => {
                        return {
                            ...s,
                            errMessage: dictionary["server conn propblem"]
                        }
                    });

                    return;
                }

                const { response } = error;
                if (response.data.errors !== undefined) {
                    setSide(s => {
                        return {
                            ...s,
                            errors: response.data.errors
                        }
                    });
                }

                // общие ошибки
                setSide(s => {
                    return {
                        ...s,
                        errMessage: response.data.message
                    }
                });
            });
    }


    return (
        <form onSubmit={handleSubmit} className="text-left px-4">
            {side.errMessage !== null &&
                <p className="text-red-600 border-red-200 border-2 text-justify py-3 px-2 rounded-md">{side.errMessage}</p>
            }
            <Input
                id="email"
                type="email"
                value={data.email}
                onChange={_setData}
                labelText={dictionary["email"]}
                placeholder="WalterWhite@gmail.com"
                className="mb-8"

                error={side.errors.email}
                required
            />

            <Input
                id="password"
                type="password"
                onChange={_setData}
                labelText={dictionary["password"]}
                className="mb-8"
                value={data.password}

                error={side.errors.password}
                required
            />

            <BlueButton className={"w-full py-3"}>{dictionary["log in"]}</BlueButton>
        </form>
    );
}