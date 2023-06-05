import ContextLang from "@/context/Lang/ContextLang";
import { useContext, useState } from "react";
import { BlueButton } from '@/Components/Buttons/ColoredButtons'
import { Input, Textarea } from "@/Components/Inputs/Inputs"
import axiosClient from '@/axios-client'

export default function SupportForm({ className }) {
    const { stateLang } = useContext(ContextLang);
    const { lang } = stateLang;

    // данные для отправки на сервер
    const [data, setData] = useState({
        name: "",
        email: "",
        message: "",
    });

    // данные для визуализации формы
    const [side, setSide] = useState({
        errors: [],
        errMessage: null,
        successMessage: false
    });


    async function handleSubmit(e) {
        e.preventDefault();

        await axiosClient.post('message-store', data)
            .then(({ data }) => {
                setSide({
                    errors: [],
                    errMessage: null,
                    successMessage: lang[data.message]
                });
            }).catch(error => {
                // если нет респонса, значит нет ответа от сервера
                if (error.response !== undefined) {
                    setSide(s => {
                        return {
                            ...s,
                            errMessage: lang["server conn propblem"]
                        }
                    });

                    return;
                }

                const { response } = error
                // ошибка валидации
                if (response.data.errors === undefined) {
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
        <form onSubmit={handleSubmit} className={`${className} `}>
            {side.errMessage !== null &&
                <p className="text-red-600 border-red-200 border-2 text-justify py-3 px-2 rounded-md">{side.errMessage}</p>
            }
            <Input
                className="mb-3"
                labelText={lang["name"]}
                id="name"
                value={data.name}

                placeholder={"Walter White"}
                onChange={e => setData({ ...data, name: e.target.value })}
                error={side.errors.name}
                required
            />

            <Input
                className="mb-3"
                labelText={lang["email"]}
                id="email"
                type="email"

                value={data.email}
                placeholder={"WalterWhite@yandex.ru"}
                onChange={e => setData({ ...data, email: e.target.value })}
                error={side.errors.email}

                required
            />

            <Textarea
                id="message"
                labelText={lang["message"]}
                placeholder={"Я не доволен дешевизной товара"}
                onChange={e => setData({ ...data, message: e.target.value })}

                value={data.message}
                error={side.errors.message}
                required
            />

            {side.successMessage !== false ?
                <p className="py-4 mt-3 text-center border-2 border-green-400 text-green-500 radius-2 rounded-xl">{side.successMessage}</p>
                :
                <>
                    <BlueButton className={"w-full py-3 my-2"}>{lang["submit"]}</BlueButton>
                    <p className="text-center">{lang['contact form message']}</p>
                </>
            }
        </form>
    );
}