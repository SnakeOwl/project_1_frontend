import axiosClient from "@/axios-client";
import { BlueButton } from "@/Components/Buttons/ColoredButtons";
import { Input } from "@/Components/Inputs/Inputs";
import ContextLang from "@/context/Lang/ContextLang";
import ContextUser from "@/context/User/ContextUser";
import { useContext, useState } from "react";

export default function LoginForm({ className = "" }) {
    const { stateLang } = useContext(ContextLang);
    const { dispatchUser } = useContext(ContextUser);
    const { lang } = stateLang;

    // form's data
    const [data, setData] = useState({
        email: "",
        password: ""
    });

    // form's side data
    const [side, setSide] = useState({
        errors: [],
        errMessage: null,
    });


    async function handleSubmit(e) {
        e.preventDefault();

        await axiosClient.post('login', data)
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
        <form onSubmit={handleSubmit} className={className}>
            {side.errMessage !== null &&
                <p className="text-red-600 border-red-200 border-2 text-justify py-3 px-2 rounded-md">{side.errMessage}</p>
            }
            <Input
                id="email"
                type="email"
                value={data.email}
                onChange={e => setData({ ...data, email: e.target.value })}
                labelText={lang["email"]}
                placeholder="WalterWhite@gmail.com"
                className={"mb-3"}

                error={side.errors.email}
                required
            />

            <Input
                id="password"
                type="password"
                onChange={e => setData({ ...data, password: e.target.value })}
                labelText={lang["password"]}

                error={side.errors.password}
                required
            />

            <BlueButton className={"w-full py-3 my-2"}>{lang["log in"]}</BlueButton>
        </form>
    );
}