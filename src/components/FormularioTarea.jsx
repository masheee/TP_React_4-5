import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ListaTareas from "./ListaTarea";
import { useForm } from "react-hook-form"
import { useState } from "react";



const FormularioTarea = () => {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const [tareas, setTareas] = useState([]);

    const postValidacion = (data) => {
        console.log(data.tarea);
        //guardar tarea en el array
        setTareas([...tareas, data.tarea])
        //limpiar el formulario
        reset()
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
             <ListaTareas tareas={tareas} />
        </section>
    );
};

export default FormularioTarea;