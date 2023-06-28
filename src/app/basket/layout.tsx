"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function BasketLayout({
    children
}: {
    children: React.ReactNode
}) {

    const router = useRouter();

    // если у пользователя нет товара в корзине, то перенапавить
    useEffect(() => {
        if (localStorage.getItem("bkey") === null) {
            router.push("/catalog");
        }
    });


    return (
        <div>
            {children}
        </div>

    )
}