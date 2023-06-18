import configRoutes from "@/config/API_routes"
import { BlueLink } from "@/Components/Links/ColoredLinks";
import ContextLang from "@/context/Lang/ContextLang";
import ContextUser from "@/context/User/ContextUser";
import { useContext } from "react";

export default function UserInfo() {
    const { stateUser } = useContext(ContextUser);
    const { user } = stateUser;

    const { stateLang } = useContext(ContextLang);
    const { lang } = stateLang;

    // информация пользователя
    const userInfo = [];
    if (user != undefined) {
        if (user.rights === 10) {
            // admin link
            userInfo.push(
                <BlueLink className={"px-2 py-1 mr-2 rounded-md"} target="_blank" href={configRoutes.BASE_ADMIN_ROUTE} key="admin-button">
                    <i className="bi bi-nut-fill"></i>
                </BlueLink>
            );
        }

        userInfo.push(<span key={"user-greeting"}> {`${lang["hi"]} ${user.email}`} </span>);
    }

    return (
        <>
            {userInfo}
        </>
    );
}