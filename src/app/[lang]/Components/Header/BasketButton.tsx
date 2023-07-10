"use client"
import { RedLink } from "@/Components/Links/ColoredLinks";
import ContextUser from "@/context/User/ContextUser";
import { useContext } from "react";

export default function BasketButton() {
    const { stateUser } = useContext(ContextUser);

    
    // todo: поставить на прослушку ключа из локального хранилища
    if (stateUser.bkey == null)
        return <></>;


    return (
        <RedLink
            href="/basket"
            className="mr-2 rounded px-3 py-1"
        >
            <i className="bi bi-cart-fill"></i>
        </RedLink>
    )
}