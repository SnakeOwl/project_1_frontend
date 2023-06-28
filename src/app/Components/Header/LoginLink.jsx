import { BlueLink } from "@/Components/Links/ColoredLinks";
import ContextLang from "@/context/Lang/ContextLang";
import { useContext } from "react";

export default function LoginLink() {
    const { stateLang } = useContext(ContextLang)
    const { lang } = stateLang;

    return (
        <BlueLink
            className="py-1 px-3 mr-3 rounded-md"
            href={"/login"}
        >
            {lang["login"]}
        </BlueLink>
    )
}