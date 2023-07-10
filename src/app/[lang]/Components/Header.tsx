"use client"
import Link from "next/link";
import Logo from "@/Components/Logo";
import LangChanger from "./Header/LangChanger";
import LogoutButton from "./Header/LogoutButton";
import BasketButton from "./Header/BasketButton";
import UserHomeLink from "./Header/UserHomeLink";
import LoginLink from "./Header/LoginLink";
import { useContext } from "react";
import ContextDictionary from "@/context/DIctionary/ContextDictionary";
import ContextUser from "@/context/User/ContextUser";

export default function Header() {
    const dictionary = useContext(ContextDictionary);

    const { stateUser } = useContext(ContextUser);
console.log(stateUser.token)
    return (
        <header className="border-b-2 dark:border-gray-900 py-4 mb-4">

            <div className="flex flex-wrap xl:mx-96 xl:my-5 items-center">
                <div className="hidden xl:block xl:w-1/3">
                </div>

                <div className="w-full xl:w-2/3 px-4 flex items-center">

                    <div className="w-1/2 xl:text-center">
                        <Link href="/" className="h1"> <Logo /> </Link>
                    </div>

                    <div className="w-1/2 h-full text-sm flex items-center justify-end ">
                        {stateUser.bkey !== undefined &&
                            <BasketButton />
                        }

                        {stateUser.token !== undefined ?
                            <>
                                <UserHomeLink />
                                <LogoutButton />
                            </>
                            :
                            <LoginLink />
                        }

                        <LangChanger />
                    </div>
                </div>
            </div>
        </header>
    );
}