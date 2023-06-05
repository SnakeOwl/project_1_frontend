"use client"
import ContextLang from "@/context/Lang/ContextLang";
import ContextUser from "@/context/User/ContextUser";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import LoginForm from "./Components/LoginForm";

export default function Login() {
    const { stateLang } = useContext(ContextLang);
    const { lang } = stateLang;

    // перенаправление, если пользователь уже есть в приложении
    const {stateUser} = useContext(ContextUser);
    const router = useRouter();
    
    useEffect(()=>{
        if (stateUser.user !== null) 
            router.push("/user") // redirect
    }, []);


    return (
        <main className="xl:w-1/5 mx-auto text-center">
            <h1 className="mb-1">{lang["login"]}</h1>

            <LoginForm className="text-left mb-" />
            <Link href="/">{lang['ForgotPassword']}</Link>

            <div className="mt-3">
                {lang['newUser']} <br />
                <Link className={"text-xl"} href={'/user/signup'}>{lang['goRegister']}</Link>
            </div>
        </main>
    );
}