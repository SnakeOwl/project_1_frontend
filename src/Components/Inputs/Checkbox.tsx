import { ChangeEventHandler } from "react";

export default function Checkbox({
    label,
    id,
    checked=false,
    className="",
    onChange=()=>{},
}:{
    label:string,
    id:string,
    checked:boolean,
    className: string,
    onChange: ChangeEventHandler,
} ){

    // todo: Придумать что-то с красивыми чекбоксами
    // clip-0 pointer-events-none after:content-['*'] absolute
    return (
        <div className={className}>
            <input type="checkbox"
                id={id}
                checked={checked}
                onChange={onChange}
                className="mr-2"
            />
            <label htmlFor={id}>{label}</label>
        </div>
    )
}