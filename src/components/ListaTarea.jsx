import ListGroup from 'react-bootstrap/ListGroup';
import ItemTarea from './ItemTarea';

const ListaTareas = ({tareas, borrarTarea, editarTarea}) => {
    return (
        <ListGroup className='mt-5'>
            {
                tareas.map((tarea, indice) => 
                <ItemTarea 
                key={indice} 
                tarea={tarea} 
                borrarTarea={borrarTarea}
                editarTarea={editarTarea}
                />)
            }
        </ListGroup>
    );
};

export default ListaTareas;