import { useState } from "react";
import { ListGroup, Button, Form } from "react-bootstrap";

const ItemTarea = ({ tarea, borrarTarea, editarTarea }) => {

  const [editar, setEditar] = useState(false)
  const [nuevoNombre, setNuevoNombre] = useState(tarea.nombreTarea)

  const guardarCambios = () => {
    if (nuevoNombre.trim() !== tarea.nombreTarea && nuevoNombre.trim().length > 0) {
            editarTarea(tarea._id, { nombreTarea: nuevoNombre.trim() });
        } else {
            setNuevoNombre(tarea.nombreTarea);
        }

        setEditar(false)
  }

  return (
    <ListGroup.Item className="d-flex justify-content-between">
     
      {editar ? (
        <>
          <Form.Control
              type="text"
              value={nuevoNombre}
              onChange={(e) => setNuevoNombre(e.target.value)}
              autoFocus                    
              className="flex-grow-1 me-2"
          />
            
          <Button
              variant="success"
              className="me-2"
              onClick={guardarCambios} 
          >
            💾
          </Button>
        </>
      ) : (
          <span className="flex-grow-1">
              {tarea.nombreTarea}
          </span>
      )}
    
      { !editar && (
        <div>
          <Button
            variant="warning"
            className="me-2"
            onClick={() => setEditar(true)}
          >
            ✍️
          </Button>
          <Button 
            variant="danger" 
            onClick={() => borrarTarea(tarea._id)}>
              ✖
          </Button>
        </div>
      )}
    </ListGroup.Item>
  );
};

export default ItemTarea;
