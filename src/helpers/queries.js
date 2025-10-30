
const tareasBackend = import.meta.env.VITE_API_TAREAS

export const listarTarea = async () => {
    try {
        const respuesta = await fetch(tareasBackend)
        return respuesta
    } catch (error) {
        console.error(error)
        return null
    }
}

export const crearTarea = async (tarea) => {
    try {
        const respuesta = await fetch(tareasBackend,{
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(tarea)
        })
        return respuesta
    } catch (error) {
        console.error(error)
        return null
    }
}

export const borrarTarea = async (id) => {
    try {
        const respuesta = await fetch(tareasBackend+'/'+id, {
            method: 'DELETE'
        })
        return respuesta
    } catch (error) {
        console.error(error)
        return null
    }
}

export const editarTarea = async (id, tarea) => {
    try {
        const urlFinal = tareasBackend + '/' + id;
        
        // Agrega este log para ver la URL completa antes de hacer la llamada
        console.log("URL de PUT siendo llamada:", urlFinal); // <-- ¡Añade esto!

        const respuesta = await fetch(tareasBackend+'/'+id,{
            method: 'PUT',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(tarea)
        })
        console.log(respuesta)
        return respuesta
    } catch (error) {
        console.error(error)
        return null
    }
}