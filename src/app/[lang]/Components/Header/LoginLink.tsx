import { BlueLink } from "@/Components/Links/ColoredLinks";
import ContextDictionary from "@/context/DIctionary/ContextDictionary";
import ContextUser from "@/context/User/ContextUser";
import { useContext } from "react";

export default function LoginLink() {
    const dictionary = useContext(ContextDictionary);
    const {stateUser} = useContext(ContextUser);


    if (stateUser.token !== undefined)
        return <></>;


    return (
        <BlueLink
            className="py-1 px-3 mr-3 rounded-md"
            href={"/login"}
        >
            {dictionary["login"]}
        </BlueLink>
    )
}