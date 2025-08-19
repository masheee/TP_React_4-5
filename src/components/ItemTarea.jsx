import { ListGroup, Button } from "react-bootstrap";

const ItemTarea = ({tarea}) => {
    return (
            <ListGroup.Item className="d-flex justify-content-between"> {tarea} <Button variant="danger"> ✖ </Button></ListGroup.Item>
    );
};

export default ItemTarea;