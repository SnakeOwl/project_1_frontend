export function Input({
    className="",
    labelText,
    value,
    onChange,
    id,
    type = "text",
    maxLength = "255",
    minLength = "1",
    placeholder = "",
    disabled = false,
    error=undefined,
    required=false,
    useRef=null
}) {
    const classes = "p-3 w-full rounded-md text-inherit bg-inherit \
        border-2 border-gray-150 \
        dark:border-gray-700 \
        focus:border-gray-300 ";

    const errClasses = "text-red-600 border-red-200 border-2 text-justify py-3 px-2 rounded-b-xl";
    
    return (
        <div className={className}>
            <label htmlFor={id}>{labelText}</label>
            <input
                id={id}
                type={type}
                maxLength={maxLength}
                minLength={minLength}

                placeholder={placeholder}
                className={classes}
                value={value}
                onChange={e => onChange(e)}

                disabled={disabled}
                required={required}
                ref={useRef}
            />
            { error!== undefined &&
                <p className={errClasses}>{error}</p>
            }
        </div>
    )
}

export function Textarea({
    className,
    labelText,
    value="",
    onChange,
    id,
    rows=5,
    placeholder = "",
    disabled = false,
    error=undefined,
    required=false
}) {
    const classes = "p-3 w-full rounded-md text-inherit bg-inherit \
        border-2 border-gray-150 \
        dark:border-gray-700 \
        focus:border-gray-300 ";

    const errClasses = "text-red-600 border-red-200 border-2 text-justify py-3 px-2 rounded-b-xl";
        
    return (
        <div className={className}>
            <label htmlFor={id}>{labelText}</label>
            <textarea
                className={classes}
                id={id}
                rows="5"
                placeholder={placeholder}
                
                onChange={e => onChange(e)}
                disabled={disabled}
                value={value}
                required={required}
            ></textarea>
            { error!== undefined &&
                <p className={errClasses}>{error}</p>
            }
        </div>
    )
}