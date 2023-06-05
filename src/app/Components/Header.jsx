import ContextUser from "@/context/User/ContextUser";
import Link from "next/link";
import { useContext } from "react";
import Logo from "../../Components/Logo";
import LangChanger from "./Header/LangChanger";
import Login from "./Header/Login";
import Logout from "./Header/Logout";
import UserInfo from "./Header/UserInfo";

export default function Header() {
    const { stateUser } = useContext(ContextUser);
    const { user } = stateUser;

    return (
        <header className="border-b-2 dark:border-gray-900 mb-8">
            <div className="flex flex-wrap xl:mx-96 xl:my-5 items-center">
                <div className="hidden xl:block xl:w-1/3">
                    <UserInfo />
                </div>
                
                <div className="w-full xl:w-1/3 text-center">
                    <Link href="/" className="h1"><Logo /></Link>
                </div>

                <div className="w-full xl:w-1/3 h-full text-sm flex items-center justify-end">

                    {user === null ?
                        <Login className={"py-1 px-2 mr-3 rounded-md"} />
                        :
                        <Logout className={"px-2 py-1 mr-3 rounded-md"} />
                    }
                    <LangChanger className="rounded-md  h-max p-1 px-2" />

                </div>
            </div>
        </header>
    );
}