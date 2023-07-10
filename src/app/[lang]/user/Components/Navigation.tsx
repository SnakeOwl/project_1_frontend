import Link from "next/link";
import { useContext } from "react";

export default function Navigation({
    dictionary
}: {
    dictionary: any
}) {


    const links = [
        {
            text: dictionary["personal page"],
            href: "/user/personal-page",
            key: 1,
        },
        {
            text: dictionary["personal data"],
            href: "/user/personal-data",
            key: 2,
        },
        {
            text: dictionary["personal orders"],
            href: "/user/personal-orders",
            key: 3,
        },
    ];

// todo: подумать как перенести эти ссылки в меню-гамбургер на мобилках
    return (
        <div className="flex flex-col text-center mx-auto">
            <h3>
                {dictionary["navigation"]}
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