import React from 'react'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'

// Redux
import { useDispatch } from 'react-redux'
import { borrarProductoAction, obtenerProductoEditarAction } from '../actions/productosActions'

const Producto = ({ producto }) => {

    const { nombre, precio, id } = producto

    const history = useHistory()
    const dispatch = useDispatch()
    
    const confirmarEliminarProducto = id => {

        // Confirmar
        Swal.fire({
            title: 'Estas seguro?',
            text: "Un Producto que se elimina no se puede recuperar!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                // Llamar al action y enviarle el id        
                dispatch(borrarProductoAction(id))
            }
        })
    }

    // Funcion q redirige de forma programada
    const redireccionarEdicion = producto => {
        dispatch( obtenerProductoEditarAction(producto) )
        history.push(`/productos/editar/${producto.id}`)
    }

    return (
        <tr>
            <td>{nombre}</td>
            <td><span className="font-weight-bold">$ {precio}</span></td>
            <td className="acciones">
                <button
                    type="button"
                    className="btn btn-primary mr-2"
                    onClick={() => redireccionarEdicion(producto)}
                >
                    Editar
                </button>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => confirmarEliminarProducto(id)}
                >
                    Eliminar
                </button>
            </td>
        </tr>
    )
}

export default Producto
