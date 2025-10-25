import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ListaTareas from "./ListaTarea";
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react";
import { crearTarea, listarTarea, borrarTarea } from '../helpers/queries.js'
import Swal from "sweetalert2";


const FormularioTarea = () => {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const [tareas, setTareas] = useState([]);

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
             <ListaTareas tareas={tareas} borrarTarea={eliminarTarea}/>
        </section>
    );
};

export default FormularioTarea;