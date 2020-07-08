import { 
    AGREGAR_PRODUCTO, 
    AGREGAR_PRODUCTO_EXITO, 
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    // COMENZAR_EDICION_PRODUCTO,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR } from '../types'
import clienteAxios from '../config/axios'
import Swal from 'sweetalert2'

// crear nuevo producto
export function crearNuevoProductoAction(producto) {
    return async (dispatch) => {
        dispatch( agregarProducto() )

        try {
            // Insertar el nuevo producto en la api
            await clienteAxios.post('/productos', producto)

            // Si todo sale bien inserta el nuevo producto en el state.productos
            dispatch( agregarProductoExito(producto) )

            Swal.fire(
                'Correcto',
                'El producto se agregó correctamente',
                'success'
            )
        } catch (error) {
            console.log(error)
            // Si hay un error cambia el state.error a true
            dispatch( agregarProductoError() )

            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Intenta de nuevo'
            })
        }
    }
}

// Cmbia loading a true
const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO
})

// Si el producto se guarda en la bd
const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
})

// Si hubo un error
const agregarProductoError = () => ({
    type: AGREGAR_PRODUCTO_ERROR
})

// Descarga productos de la bd
export function obtenerProductosAction() {
    return async (dispatch) => {
        dispatch( descargarProductos() )

        try {
            const respuesta = await clienteAxios.get('/productos')
            dispatch( descargaProductosExitosa(respuesta.data) )
        } catch (error) {
            dispatch( descargaProductosError() )
        }
    }
}

const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS
})

const descargaProductosExitosa = productos => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
})

const descargaProductosError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR
})

// Selecciona y elimmina el producto
export function borrarProductoAction(id) {
    return async (dispatch) => {
        dispatch( obtenerProductoEliminar(id) )
        try {
            await clienteAxios.delete(`/productos/${id}`)
            dispatch( eliminarProductoExito() )
            Swal.fire(
                'Eliminado!',
                'El Producto se eliminó coorrectamente!.',
                'success'
            )
        } catch (error) {
            console.log(error)
            dispatch( eliminarProductoError() )
        }
    }
}

const obtenerProductoEliminar = id => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
})

const eliminarProductoExito = () => ({
    type: PRODUCTO_ELIMINADO_EXITO
})

const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINADO_ERROR
})

// Colocar Producto en Edicion
export function obtenerProductoEditarAction(producto) {
    return (dispatch) => {
        dispatch( obtenerProducto(producto) )
    }
}

const obtenerProducto = producto => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
})

// Edita un producto en la api y en el state
export function editarProductoAction(producto) {
    return async (dispatch) => {
        // dispatch( editarProducto() )

        try {
            await clienteAxios.put(`/productos/${producto.id}`, producto)

            dispatch( editarProductoExito(producto) )

        } catch (error) {
            console.log(error)
            dispatch( editarProductoError() )
        }
    }
}

// const editarProducto = () => ({
//     type: COMENZAR_EDICION_PRODUCTO,
// })

const editarProductoExito = producto => ({
    type: PRODUCTO_EDITADO_EXITO,
    payload: producto
})

const editarProductoError = () => ({
    type: PRODUCTO_EDITADO_ERROR
})