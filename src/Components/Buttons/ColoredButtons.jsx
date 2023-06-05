export function BlueButton({children, className, onClick=()=>{}}){
    return (
        <button 
        onClick={onClick}
        className={" \
            text-white \
            bg-blue-600 \
            hover:bg-inherit \
            hover:ring-1 \
            hover:ring-blue-600 \
            hover:text-blue-600 \
            duration-300 \
             " + className }>
            {children}
        </button>
    )
}

export function BlueButtonReversed({children, className, onClick=()=>{}}){
    return (
        <button 
        onClick={onClick}
        className={" \
            text-blue-600\
            hover:text-white\
            bg-inherit \
            hover:bg-blue-600 \
            ring-1 \
            ring-blue-600 \
            duration-300 \
             " + className }>
            {children}
        </button>
    )
}

export function RedButton({children, className, onClick=()=>{}}){
    return (
        <button 
        onClick={onClick}
        className={" \
            text-white \
            bg-red-500 \
            hover:bg-inherit \
            hover:ring-1 \
            hover:ring-red-500 \
            hover:text-red-500 \
            duration-300 \
             " + className }>
            {children}
        </button>
    )
}

export function RedButtonReversed({children, className, onClick=()=>{}}){
    return (
        <button 
        onClick={onClick}
        className={" \
            text-red-500\
            hover:text-white\
            bg-inherit \
            hover:bg-red-500 \
            ring-1 \
            ring-red-500 \
            duration-300 \
             " + className }>
            {children}
        </button>
    )
}