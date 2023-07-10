"use client"

import axiosClient from "@/axios-client";
import { BlueButton } from "@/Components/Buttons/ColoredButtons";
import { Input } from "@/Components/Inputs/Inputs";
import ContextDictionary from "@/context/DIctionary/ContextDictionary";
import ContextUser from "@/context/User/ContextUser";
import { useContext, useRef, useState } from "react"

export default function SighupPage() {

    const { dispatchUser } = useContext(ContextUser);

    const dictionary = useContext(ContextDictionary);


    // данные для отправки на сервер
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
    });

    function _setData(e: React.ChangeEvent<HTMLInputElement>) {
        setData({
            ...data,
            [e.target.id]: e.target.value
        })
    }


    // данные для визуализации формы
    const [side, setSide] = useState({
        errors: {
            name: undefined,
            email: undefined,
            password: undefined,
            password_confirmation: undefined
        },
        errMessage: null,
    })


    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        await axiosClient.post("signup", data)
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
                    console.log(dictionary["server conn propblem"]);

                    return;
                }

                const { response } = error
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
            })
    }


    // изменение бордера input#password_confirmation, в зависимости от соответствия к его значению
    function handleChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
        const input = document.getElementById("password_confirmation");

        if (input !== null) {
            if (e.target.value === data.password_confirmation) {
                input.classList.remove("border-red-800")
            } else {
                input.classList.add("border-red-800")
            }
        }

        setData({ ...data, password: e.target.value });
    }


    // изменение бордера input#password_confirmation, в зависимости от соответствия паролю
    function handleChangePasswordConfirmation(e: React.ChangeEvent<HTMLInputElement>) {
        const input = document.getElementById("password_confirmation");

        if (input !== null) {
            if (e.target.value === data.password) {
                input.classList.remove("border-red-800")
            } else {
                input.classList.add("border-red-800")
            }
        }

        setData({ ...data, password_confirmation: e.target.value });
    }


    return (
        <main className="xl:w-1/4 mx-auto">
            <h1 className="text-center">{dictionary["registration"]}</h1>

            {side.errMessage !== null &&
                <p className="text-red-600 border-red-200 border-2 text-justify py-3 px-2 rounded-md">{side.errMessage}</p>
            }

            <form onSubmit={handleSubmit}>
                <Input
                    id="name"
                    labelText={dictionary["name"]}
                    value={data.name}
                    className={"mb-4"}

                    onChange={_setData}
                    error={side.errors.name}
                    required
                    placeholder="Walter White"
                />

                <Input
                    id="email"
                    type="email"
                    labelText={dictionary["email"]}
                    value={data.email}

                    className={"mb-4"}
                    onChange={_setData}
                    error={side.errors.email}
                    required

                    placeholder="WalterWhite@gmail.com"
                />

                <Input
                    id="password"
                    type="password"
                    labelText={dictionary["password"]}
                    value={data.password}

                    className={"mb-4"}
                    onChange={handleChangePassword}
                    error={side.errors.password}
                    required

                    minLength="8"
                />

                <Input
                    id="password_confirmation"
                    type="password"
                    labelText={dictionary["confirm password"]}
                    value={data.password_confirmation}

                    className={"mb-4"}
                    onChange={handleChangePasswordConfirmation}
                    error={side.errors.password_confirmation}

                    required
                />

                <BlueButton className={"w-full py-3"}>{dictionary["goRegister"]}</BlueButton>
            </form>
        </main>
    )
}