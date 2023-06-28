"use client"
import Header from './Header'
import Footer from './Footer'

import { useReducer } from 'react'

import ReducerLang from "../../context/Lang/ReducerLang"
import StateLang from "../../context/Lang/StateLang"
import ContextLang from "../../context/Lang/ContextLang"

import ReducerUser from "../../context/User/ReducerUser"
import StateUser from "../../context/User/StateUser"
import ContextUser from "../../context/User/ContextUser"


export default function Wrapper({ children }) {
    const [stateLang, dispatchLang] = useReducer(ReducerLang, StateLang);
    const [stateUser, dispatchUser] = useReducer(ReducerUser, StateUser);

    return (
        <>
            <ContextLang.Provider value={{ stateLang, dispatchLang }}>
                <ContextUser.Provider value={{ stateUser, dispatchUser }}>
                    <Header />
                    {children}
                </ContextUser.Provider>

                <Footer />
            </ContextLang.Provider>
        </>
    )
}