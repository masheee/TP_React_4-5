import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ListaTareas from "./ListaTarea";
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react";
import { crearTarea, listarTarea, borrarTarea, editarTarea } from '../helpers/queries.js'
import Swal from "sweetalert2";


const FormularioTarea = () => {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const [tareas, setTareas] = useState([]);

    //estado para buscar tareas en el front
    const [buscar, setBuscar] = useState('')

    //logica para la busqueda de tareas cuyo nombre coincida con el texto de busqueda
    const buscarTareas = tareas.filter(tarea =>
        //filtra las tareas 
        tarea.nombreTarea.toLowerCase().includes(buscar.toLowerCase())
    )

    //funcion para obtener las tareas del backend 
    const obtenerTareas = async() => {
        try {
            const respuesta = await listarTarea()
            if (respuesta.status === 200) {
                const tareasObtenidas = await respuesta.json()
                setTareas(tareasObtenidas)
            }
        } catch (error) {
            console.error("Error al obtener tareas: ",error)
        }
    }

    useEffect(()=>{
        obtenerTareas() 
    },[])

    const postValidacion = async (data) => {
        
        const nuevaTarea = {
            nombreTarea: data.tarea
        }

        const respuesta = await crearTarea(nuevaTarea)
        if(respuesta.status === 201){
            Swal.fire({
                title: "Tarea Creada",
                text: `La tarea "${data.tarea}" se agregó correctamente`,
                icon: "success",
            })
            reset()
            obtenerTareas()
        } else {
            Swal.fire({
                title: "Error",
                text: "No se pudo crear la tarea. Inténtalo más tarde.",
                icon: "error",
            });
        }
    }

    //logica para borrar tareas del backend
    const eliminarTarea = async (idTarea) => {

        const respuesta = await borrarTarea(idTarea)
        if (respuesta.status === 200) {
            Swal.fire({
                title: "Tarea Eliminada",
                text: `La tarea fue eliminada correctamente`,
                icon: "success",
            });
            obtenerTareas()
        } else {
            Swal.fire({
                title: "Error",
                text: "La tarea no pudo ser eliminada",
                icon: "error",
            })
        }
    }

    //logica para editar tareas del backend
    const updateTarea = async (idTarea, datosActualizados) => {
        try {
            const respuesta = await editarTarea(idTarea, datosActualizados)

            if(respuesta.status === 200) {
                const tareaActualizada = await respuesta.json()

                setTareas((prevTareas) =>
                    prevTareas.map((tarea) => 
                        tarea._id === idTarea ? tareaActualizada : tarea
                    )
                )

                Swal.fire({
                    title: "Tarea Editada",
                    text: `La tarea fue actualizada correctamente`,
                    icon: "success",
                    showConfirmButton: false,
                });
                return true
            } else {
                Swal.fire({
                    title: "Error",
                    text: "La tarea no pudo ser editada. Intentelo nuevamente",
                    icon: "error",
                });
                return false;
            }
        } catch (error) {
            console.error(error)
            Swal.fire({
                title: "Error de Conexion",
                text: "Hubo un problema al comunicarse con el servidor",
                icon: "error",
            });
            return false;
        }
    }

    return (
        <section>
             <Form onSubmit={handleSubmit(postValidacion)}>
                <Form.Group className="mb-3 d-flex justify-content-between" controlId="formBasicEmail">
                <Form.Control type="text" placeholder="Ingresa una tarea" {...register("tarea",{
                    required: "La tarea es un dato obligatorio",
                    minLength:{
                        value: 2, 
                        message: "La tarea debe tener al menos 2 caracteres"
                    },
                    maxLength:{
                        value: 50,
                        message: "La tarea debe tener como maximo 50 caracteres"
                    },

                })}/>
                <Button variant="primary" type="submit" className="ms-2">
                    ➕
                </Button>
                </Form.Group>
            <Form.Text className="text-danger">{errors.tarea?.message}</Form.Text>
             </Form>

             <hr />

             <Form.Group className="mb-3">
                <Form.Control 
                    type="text" 
                    placeholder="Buscar tarea..." 
                    onChange={(e) => setBuscar(e.target.value)} 
                    value={buscar} 
                />
             </Form.Group>

             <ListaTareas 
                tareas={buscarTareas} 
                borrarTarea={eliminarTarea}
                editarTarea={updateTarea}
             />
        </section>
    );
};

export default FormularioTarea;