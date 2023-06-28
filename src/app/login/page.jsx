"use client"
import ContextLang from "@/context/Lang/ContextLang";
import Link from "next/link";
import { useContext } from "react";
import LoginForm from "./Components/LoginForm";

export default function Login() {
    const { stateLang } = useContext(ContextLang);
    const { lang } = stateLang;


    return (
        <main className="xl:w-1/5 mx-auto text-center">
            <h1 className="mb-1">{lang["login"]}</h1>

            <LoginForm />

            <div className="mt-3">
                {lang['newUser']} <br />
                <Link
                    className={"text-xl"}
                    href={'/login/signup'}
                >
                    {lang['goRegister']}
                </Link>
            </div>
        </main>
    );
}