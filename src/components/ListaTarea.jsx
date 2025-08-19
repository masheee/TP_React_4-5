import ListGroup from 'react-bootstrap/ListGroup';
import ItemTarea from './ItemTarea';

const ListaTareas = ({tareas}) => {
    return (
        <ListGroup className='mt-5'>
            {
                tareas.map((tarea, indice) => <ItemTarea key={indice} tarea={tarea}/>)
            }
        </ListGroup>
    );
};

export default ListaTareas;