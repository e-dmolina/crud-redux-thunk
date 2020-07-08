import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Actions de Redux
import { crearNuevoProductoAction } from '../actions/productosActions'
import { mostrarAlertaAction, ocultarAlertaAction } from '../actions/alertasAction'

const NuevoProducto = ({ history }) => {

    const [nombre, setNombre] = useState('')
    const [precio, setPrecio] = useState(0)

    const cargando = useSelector(state => state.productos.loading)
    const error = useSelector(state => state.productos.error)
    const alerta = useSelector(state => state.alertas.alerta)

    const dispatch = useDispatch()
    // Mandar a llamar el action
    const agregarProducto = producto => dispatch(crearNuevoProductoAction(producto))

    const submitNuevoProducto = e => {
        e.preventDefault()

        // Validar formulario
        if (nombre.trim() === '' || precio <= 0) {

            const alerta = {
                msg: 'Ambos campos son obligatorios',
                classes: 'alert alert-danger text-center text-uppercase p3'
            }
            dispatch(mostrarAlertaAction(alerta))
            return
        }

        // si no hay errores
        dispatch( ocultarAlertaAction() )

        // Crear el nuevo producto
        agregarProducto({
            nombre,
            precio
        })
        history.push('/')
    }

    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Agregar Nuevo Producto
                        </h2>

                        {alerta && <p className={alerta.classes}>{alerta.msg}</p>}

                        <form onSubmit={submitNuevoProducto}>
                            <div className="form-group">
                                <label>Nombre Producto</label>
                                <input
                                    type="text"
                                    name="nombre"
                                    className="form-control"
                                    placeholder="Nombre Producto"
                                    value={nombre}
                                    onChange={e => setNombre(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label>Precio Producto</label>
                                <input
                                    type="number"
                                    name="precio"
                                    className="form-control"
                                    placeholder="Precio Producto"
                                    value={precio}
                                    onChange={e => setPrecio(Number(e.target.value))}
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-10">
                                Agregar
                            </button>
                        </form>
                        {cargando && <p>Cargando...</p>}
                        {error && <p className="alert alert-danger p2 mt-4 text-center">Hubo un error</p>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NuevoProducto
