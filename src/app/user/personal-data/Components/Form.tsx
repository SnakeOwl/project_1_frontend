import { BlueButtonReversed } from "@/Components/Buttons/ColoredButtons";
import { Input } from "@/Components/Inputs/Inputs";
import axiosClient from "@/axios-client";
import IUser from "@/interfaces/IUser";
import { useState } from "react";

export default function Form({
    lang,
    user
}: {
    lang: any,
    user: IUser
}) {

    // данные для отправки формы
    const [data, setData] = useState(user);

    function _setData(e: React.ChangeEvent<HTMLInputElement>) {
        setData({
            ...data,
            [e.target.id]: e.target.value
        });
    }

    // данные для визуализации формы
    const [side, setSide] = useState({
        errors: {
            name: undefined,
            phone: undefined,
            email: undefined,
        },
        errMessage: undefined,
        sucsess: false
    });


    // попытка Апдейта Юзера
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        await axiosClient.post("/user/update", data)
            .then(() => {
                setSide({
                    errors: {
                        name: undefined,
                        phone: undefined,
                        email: undefined,
                    },
                    errMessage: undefined,
                    sucsess: true
                })
            })
            .catch(error => {
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
            })
    }


    return (
        <div>
            {side.errMessage !== undefined &&
                <p className="text-red-600 border-red-200 border-2 text-justify py-3 px-2 rounded-md">{side.errMessage}</p>
            }
            
            <form className="w-full xl:w-1/3 mx-auto px-4" onSubmit={handleSubmit}>
                <p># {data.id}</p>

                <Input
                    labelText={lang["name"]}
                    value={data.name}
                    id="name"
                    className="mb-2"
                    onChange={_setData}
                    error={side.errors.name}
                />

                <Input
                    labelText={lang["email"]}
                    value={data.email}
                    id="email"
                    className="mb-2"
                    onChange={false}
                    error={side.errors.email}

                    disabled
                />

                <Input
                    labelText={"phone"}
                    value={data.phone}
                    id="phone"
                    className="mb-4"
                    onChange={_setData}
                    error={side.errors.phone}
                />

                {side.sucsess === false ?
                    <BlueButtonReversed
                        className="py-2 w-full"
                    >
                        {lang["submit"]}
                    </BlueButtonReversed>
                    :
                    <p className="py-4 mt-3 text-center border-2 border-green-400 text-green-500 radius-2 rounded-xl">
                        {lang["data changed"]}
                    </p>
                }
            </form>
        </div>
    )
}