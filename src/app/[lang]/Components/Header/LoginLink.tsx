import { BlueLink } from "@/Components/Links/ColoredLinks";
import ContextDictionary from "@/context/DIctionary/ContextDictionary";
import { useContext } from "react";

export default function LoginLink() {
    const dictionary = useContext(ContextDictionary);

    return (
        <BlueLink
            className="py-1 px-3 mr-3 rounded-md"
            href={"/login"}
        >
            {dictionary["login"]}
        </BlueLink>
    )
}