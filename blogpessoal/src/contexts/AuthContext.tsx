/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, type ReactNode } from "react"
import { login } from "../service/Service"
import type UsuarioLogin from "../models/UsuarioLogin"

interface AuthContextProps {
    usuario: UsuarioLogin
    handleLogout(): void
    handleLogin(usuario: UsuarioLogin): Promise<void>
    isLoading: boolean
}

interface AuthProviderProps {
    children: ReactNode
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

// Removemos o 'async' da função principal do componente
export function AuthProvider({ children }: AuthProviderProps) {

    const [usuario, setUsuario] = useState<UsuarioLogin>({
        id: 0,
        nome: "",
        usuario: "",
        senha: "",
        foto: "",
        token: ""
    })

    const [isLoading, setIsLoading] = useState(false)

    async function handleLogin(usuarioLogin: UsuarioLogin) {
        setIsLoading(true)
        try {
            await login(`/Usuario/logar`, usuarioLogin, setUsuario)
            alert("O Usuário foi autenticado com sucesso!")
            setIsLoading(false)
        } catch(error){
            console.log(error)
            alert("Os Dados do usuário estão inconsistentes!")
        setIsLoading(false)
    }
    }
    function handleLogout() {
        setUsuario({
            id: 0,
            nome: "",
            usuario: "",
            senha: "",
            foto: "",
            token: ""
        })
    }

    return (
        <AuthContext.Provider value={{ usuario, handleLogout, handleLogin, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}
