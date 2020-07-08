import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editarProductoAction } from '../actions/productosActions'
import { useHistory } from 'react-router-dom'

const EditarProducto = () => {

    const [producto, setProducto] = useState({
        nombre: '',
        precio: ''
    })

    const dispatch = useDispatch()
    const history = useHistory()

    const productoEditar = useSelector(state => state.productos.productoEditar)

    useEffect(() => {
        productoEditar ? setProducto(productoEditar) : history.push('/')
        // eslint-disable-next-line
    }, [productoEditar])

    const onChangeFormulario = e => {
        setProducto({
            ...producto,
            [e.target.name]: e.target.value
        })
    }

    const { nombre, precio } = producto

    const submitEditarProducto = e => {
        e.preventDefault()

        dispatch( editarProductoAction(producto) )
        history.push('/')
    }

    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Editar Producto
                        </h2>

                        <form
                           onSubmit={submitEditarProducto} 
                        >
                            <div className="form-group">
                                <label>Nombre Producto</label>
                                <input
                                    type="text"
                                    name="nombre"
                                    className="form-control"
                                    placeholder="Nombre Producto"
                                    onChange={onChangeFormulario}
                                    value={nombre}
                                />
                            </div>

                            <div className="form-group">
                                <label>Precio Producto</label>
                                <input
                                    type="number"
                                    name="precio"
                                    className="form-control"
                                    placeholder="Precio Producto"
                                    onChange={onChangeFormulario}
                                    value={precio}
                                />
                            </div>

                            <button 
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-10"
                            >
                                Guardar Cambios
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditarProducto
