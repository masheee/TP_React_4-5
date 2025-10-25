
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