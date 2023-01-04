import { useState } from "react";

export const Paginacion = (snapshot) => {
    const datos = [];
    snapshot.forEach(element => {
        datos.push({
            id: element.id,
            ...element.data()
        });
    });

    
    return datos;
}
