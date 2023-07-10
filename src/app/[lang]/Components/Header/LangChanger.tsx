'use client'

import { usePathname } from 'next/navigation'
import { i18n } from "@/i18n-config"
import { BlueLinkReversed } from '@/Components/Links/ColoredLinks'
import { useContext } from 'react'
import ContextDictionary from '@/context/DIctionary/ContextDictionary'


export default function LangChanger() {
    const pathName = usePathname()
    const redirectedPathName = (locale: string) => {
        if (!pathName) return '/'
        const segments = pathName.split('/')
        segments[1] = locale

        return segments.join('/')
    }

    
    const dictionary = useContext(ContextDictionary);


    return (
        <div>
            {i18n.locales.map((locale) => {
                if (locale !== dictionary["cl"])
                    return (
                        <BlueLinkReversed key={locale}
                            className="px-2 py-1 rounded"
                            href={redirectedPathName(locale)}
                        >
                            {locale}
                        </BlueLinkReversed>
                    )
            })}
        </div>
    )
}

