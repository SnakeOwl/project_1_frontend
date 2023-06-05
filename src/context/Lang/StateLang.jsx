import lang_ru from "../../lang/ru.json"
import lang_en from "../../lang/en.json"

const clang = (typeof window === "undefined")? "ru" : window.localStorage.getItem("lang", "ru")

const StateLang = {
    lang: clang === "ru"? lang_ru: lang_en
};

export default StateLang;
