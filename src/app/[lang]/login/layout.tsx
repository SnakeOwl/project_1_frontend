"use client"

import ContextUser from "@/context/User/ContextUser";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function Layout({
    children
}: {
    children: React.ReactNode
}) {
    
    // перенаправление, если пользователь уже есть в приложении
    // const { stateUser } = useContext(ContextUser);
    // const router = useRouter();

    // useEffect(() => {
    //     if (stateUser.token !== undefined)
    //         router.push("/user/personal-data") // redirect
    // }, [stateUser.token]);

    
    return (
        <div className="w-full">
            {children}
        </div>
    )
}