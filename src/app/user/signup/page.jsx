"use client"

import axiosClient from "@/axios-client";
import { BlueButton } from "@/Components/Buttons/ColoredButtons";
import { Input } from "@/Components/Inputs/Inputs";
import ContextLang from "@/context/Lang/ContextLang"
import ContextUser from "@/context/User/ContextUser";
import { useRouter } from "next/navigation";
import { useContext, useRef, useState } from "react"

export default function Sighup() {

    // перенаправление, если пользователь уже есть в приложении
    const { stateUser,dispatchUser } = useContext(ContextUser);
    const router = useRouter();

    useEffect(() => {
        if (stateUser.user !== null)
            router.push("/user") // redirect
    }, [stateUser.user]);


    const { stateLang } = useContext(ContextLang);
    const { lang } = stateLang;

    const password_confirmationRef = useRef();

    // данные для отправки на сервер
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
    });

    // данные для визуализации формы
    const [side, setSide] = useState({
        errors: [],
        errMessage: null,
    })


    async function handleSubmit(e) {
        e.preventDefault();

        await axiosClient.post("signup", data)
            .then(({ data }) => {
                // обновление записи пользователя в приложении
                dispatchUser({
                    type: 'SET_USER',
                    user: data.user,
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
                            errMessage: lang["server conn propblem"]
                        }
                    });

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

    function handleChangePassword(e) {
        if (e.target.value === data.password_confirmation) {
            password_confirmationRef.current.classList.remove("border-red-800")
        } else {
            password_confirmationRef.current.classList.add("border-red-800")
        }

        setData({ ...data, password: e.target.value });
    }

    function handleChangePasswordConfirmation(e) {
        if (e.target.value === data.password) {
            password_confirmationRef.current.classList.remove("border-red-800")
        } else {
            password_confirmationRef.current.classList.add("border-red-800")
        }

        setData({ ...data, password_confirmation: e.target.value });
    }

    return (
        <main className="xl:w-1/4 mx-auto">
            <h1 className="text-center">{lang["registration"]}</h1>

            {side.errMessage !== null &&
                <p className="text-red-600 border-red-200 border-2 text-justify py-3 px-2 rounded-md">{side.errMessage}</p>
            }

            <form onSubmit={handleSubmit}>
                <Input
                    id="name"
                    labelText={lang["name"]}
                    value={data.name}
                    className={"mb-2"}

                    onChange={e => setData({ ...data, name: e.target.value })}
                    error={side.errors.name}
                    required
                    placeholder="Walter White"
                />

                <Input
                    id="email"
                    type="email"
                    labelText={lang["email"]}
                    value={data.email}

                    className={"mb-2"}
                    onChange={e => setData({ ...data, email: e.target.value })}
                    error={side.errors.email}
                    required

                    placeholder="WalterWhite@gmail.com"
                />

                <Input
                    id="password"
                    type="password"
                    labelText={lang["password"]}
                    value={data.password}

                    className={"mb-2"}
                    onChange={handleChangePassword}
                    error={side.errors.password}
                    required

                    minLeght
                />

                <Input
                    id="name"
                    type="password"
                    labelText={lang["confirm password"]}
                    value={data.password_confirmation}

                    className={"mb-2"}
                    onChange={handleChangePasswordConfirmation}
                    useRef={password_confirmationRef}
                    error={side.errors.name}

                    required
                />

                <BlueButton className={"w-full py-3"}>{lang["goRegister"]}</BlueButton>
            </form>
        </main>
    )
}