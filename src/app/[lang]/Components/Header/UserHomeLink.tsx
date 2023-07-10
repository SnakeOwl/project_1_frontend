"use client"

import { BlueLinkReversed } from "@/Components/Links/ColoredLinks";
import ContextUser from "@/context/User/ContextUser";
import { useContext } from "react";

export default function UserHomeLink() {
    const { stateUser } = useContext(ContextUser);

    
    if (stateUser.token === undefined)
        return <></>;


    return (
        <BlueLinkReversed
            className="px-2 py-1 rounded mr-4"
            href={"/user/personal-page"}
        >
            <i className="bi bi-person-fill"></i>
        </BlueLinkReversed>
    )
}