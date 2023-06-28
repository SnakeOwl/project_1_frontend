"use client"
import ContextUser from "@/context/User/ContextUser";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import Navigation from "./Components/Navigation";

export default function UserLayout({
    children
}: {
    children: React.ReactNode
}) {
    // перенаправление, если пользователя нет в локальном хранилище
    const { stateUser } = useContext(ContextUser);
    const router = useRouter();

    useEffect(() => {
        if (stateUser.token === undefined)
            router.push("/login") // redirect
    }, [stateUser.token]);


    return (
        <div className="w-full xl:w-4/5 mx-auto flex flex-wrap">
            <div className="w-full xl:w-1/4">
                <Navigation />
            </div>

            <div className="w-full xl:w-3/4">
                {children}
            </div>
        </div>
    )

}