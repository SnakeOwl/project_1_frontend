import Link from "next/link";
import { getDictionary } from "@/utils/get-dictionary";
import { Locale } from "@/i18n-config";
import LoginForm from "./Components/LoginForm";

export default async function LoginPage({
    params: { lang }
}: {
    params: { lang: Locale }
}) {

    const dictionary = await getDictionary(lang)

    return (
        <main className="xl:w-1/5 mx-auto text-center">
            <h1 className="mb-1">{dictionary["login"]}</h1>

            <LoginForm dictionary={dictionary} />

            <div className="mt-3">
                {dictionary['newUser']} <br />
                <Link
                    className={"text-xl"}
                    href={'/login/signup'}
                >
                    {dictionary['goRegister']}
                </Link>
            </div>
        </main>
    );
}
