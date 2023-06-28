import ContextLang from "@/context/Lang/ContextLang";
import Link from "next/link";
import { useContext } from "react";

export default function Navigation() {

    const { stateLang } = useContext(ContextLang)
    const { lang } = stateLang;



    const links = [
        {
            text: lang["personal page"],
            href: "/user/personal-page",
            key: 1,
        },
        {
            text: lang["personal data"],
            href: "/user/personal-data",
            key: 2,
        },
        {
            text: lang["personal orders"],
            href: "/user/personal-orders",
            key: 3,
        },
    ];

// todo: подумать как перенести эти ссылки в меню-гамбургер на мобилках
    return (
        <div className="flex flex-col text-center mx-auto">
            <h3>
                {lang["navigation"]}
            </h3>
            
            {
                links.map(link => {
                    return (
                        <Link
                            key={link.key}
                            className="py-2"
                            href={link.href}
                        >
                            {link.text}
                        </Link>
                    )
                })
            }
        </div>
    );
}