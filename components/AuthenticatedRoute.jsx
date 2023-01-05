import React, { useState, useContext, useEffect } from 'react';
import { FirebaseContext } from '../firebase';
import { useRouter } from "next/router";

const AuthenticatedRoute = ({ children }) => {

    const { usuario, firebase } = useContext(FirebaseContext)
    const router = useRouter();

    const adminId = [
        { id: "Vm2RAm2MUjMCeNA7Zb47883GkOM2" },
        { id: "YqzdUuBuFBflRsR1C6uVYTXvsu53" }
    ]

    useEffect(() => {

        if (!usuario) {
            router.push('/login');
        }

        if (usuario) {
            adminId.forEach(item => {
                if (!usuario.uid === item.id) {
                   return router.push("/");
                }
            })
        }
    }, []);

    return children
}

export default AuthenticatedRoute;
