import { RedLink } from "@/Components/Links/ColoredLinks";
import ContextUser from "@/context/User/ContextUser";
import { useContext } from "react";

export default function BasketButton({
    className = ""
}: {
    className: string
}) {

    const {stateUser} = useContext(ContextUser);
    
    
    if (stateUser.bkey == null)
        return <></>;


    return (
        <RedLink
            href="/basket"
            className={className}
        >
            <i className="bi bi-cart-fill"></i>
        </RedLink>
    )
}