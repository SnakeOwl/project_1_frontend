import ContextUser from "@/context/User/ContextUser";
import Link from "next/link";
import { useContext } from "react";
import Logo from "../../Components/Logo";
import LangChanger from "./Header/LangChanger";
import LoginLink from "./Header/LoginLink";
import LogoutButton from "./Header/LogoutButton";
import BasketButton from "./Header/BasketButton";
import UserHomeLink from "./Header/UserHomeLink";

export default function Header() {
    const { stateUser } = useContext(ContextUser);
    const { token } = stateUser;

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
                        <BasketButton className="mr-2 rounded px-3 py-1" />

                        {token == undefined ?
                            <LoginLink />
                            :
                            <>
                                <UserHomeLink />
                                <LogoutButton />
                            </>
                        }

                        <LangChanger className="rounded-md  h-max p-1 px-2" />
                    </div>
                </div>
            </div>
        </header>
    );
}