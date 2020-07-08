import React, {  useEffect } from 'react'
import Producto from './Producto'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { obtenerProductosAction } from '../actions/productosActions'

const Productos = () => {

    const dispatch = useDispatch()
    const cargarProducto = () => dispatch( obtenerProductosAction() )

    const productos = useSelector( state => state.productos.productos )
    const error = useSelector( state => state.productos.error )
    const cargando = useSelector( state => state.productos.loading )

    useEffect(() => {
        // Consultar api
        cargarProducto()
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <h2 className="text-center my-5">Listado de Productos</h2>
            {
                error 
                && 
                <p className="font-weight-bold alert alert-danger text-center mt-4"> Hubo un error</p> 
            }
            { cargando && <p className="text-center">Cargando...</p>}

            <table className="table table-striped">
                <thead className="bg-primary table-dark">
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.length === 0 ? 'No hay productos' : (
                        productos.map(producto => (
                            <Producto
                                key={producto.id}
                                producto={producto}
                            />
                        ))
                    )}
                </tbody>
            </table>
        </>
    )
}

export default Productos
