// rsc
import React, { useEffect, useState } from 'react';

const ProductoPorCliente = () => {
    
    // variables de estado
    const [listaCliente, setListaCliente] = useState([])
    const [listaProductos, setListaProductos] = useState([])
    const [dni, setDni] = useState('0')
    const [verificar,setVerificar] = useState(true);



    const handlerDni =(e)=>{
        setDni(e.target.value)
    }

    const traer_cliente = async()=>{
        const consulta = await fetch(`http://localhost:64771/api/Cliente/cliente`)
        const datos = await consulta.json();
        setListaCliente(datos)
        if(verificar){
            setDni(datos[0].dni)
            setVerificar(false);
        }
    }

    const traerProductos = async(dni)=>{
        const consulta = 
        await fetch(`http://localhost:64771/api/Cliente/ListarProductoCliente/${dni}`)
        const datos = await consulta.json();
        setListaProductos(datos)
    }

    useEffect( ()=>{
        traer_cliente();
        traerProductos(dni)
    }, [dni])

    return (
        <div className='container mt-3'>
            <div class="alert alert-success text-center">
                <h2>Productos comprados por cliente</h2>
            </div>
            <div>
                <div className='d-flex box__consulta' >
                    <label for='dni' className='box__input'><h5>Cliente:</h5></label>
                    <select className='form-control form-select text-center box__input' name='dni' id='dni' onChange={handlerDni}>
                        {
                            listaCliente.map( (item, index)=>{
                            return <option key={index} value={item.dni}>{item.nombres }&nbsp;{item.apPaterno}&nbsp;{item.apMaterno}</option>
                            })
                        }
                    </select>
                </div>
                
                <hr/>
                <table className='table table-striped text-center'>
                    <thead className='table-dark'>
                        <tr>
                            <th>Marca Producto</th>
                            <th>descripcion</th>
                            <th>cantidad</th>
                            <th>precio</th>
                            <th>total</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        listaProductos.map( (item, index)=>{
                           return <tr key={index}>
                               <td>{item.marca}</td>
                               <td>{item.descripcion}</td>
                               <td>{item.cantidad}</td>
                               <td>{item.precio}</td>
                               <td>{item.total}</td>
                           </tr>     
                        })
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductoPorCliente;