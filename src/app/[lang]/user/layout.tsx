import Navigation from "./Components/Navigation";
import getDictionaryStatic from "@/utils/get-dictionary-static";
import { Locale } from "@/i18n-config";

export default function UserLayout({
    children,
    params: {lang}
}: {
    children: React.ReactNode,
    params: {
        lang: Locale
    }
}) {

    const dictionary = getDictionaryStatic(lang);


    // перенаправление, если пользователя нет в локальном хранилище
    // const { stateUser } = useContext(ContextUser);
    // const router = useRouter();

    // useEffect(() => {
    //     if (stateUser.token === undefined)
    //         router.push("/login") // redirect
    // }, [stateUser.token]);


    return (
        <div className="w-full xl:w-4/5 mx-auto flex flex-wrap">
            <div className="w-full xl:w-1/4">
                <Navigation dictionary={dictionary} />
            </div>

            <div className="w-full xl:w-3/4">
                {children}
            </div>
        </div>
    )

}