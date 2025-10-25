import { ListGroup, Button } from "react-bootstrap";

const ItemTarea = ({tarea, borrarTarea}) => {
    return (
            <ListGroup.Item className="d-flex justify-content-between">     
                {tarea.nombreTarea} 
                <Button variant="danger" onClick={()=>borrarTarea(tarea._id)}>
                    ✖ 
                </Button>
            </ListGroup.Item>
    );
};

export default ItemTarea;