import lang_ru from "../../lang/ru.json"
import lang_en from "../../lang/en.json"

export default function ReducerLang (state, action) {
    switch(action.type){
        case 'UPDATE_LANG':
            return {
                lang: action.lang === "ru"? lang_ru: lang_en
            }

        default:
            return state;
    }
}