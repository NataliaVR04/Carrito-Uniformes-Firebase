import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {collection, getDocs, deleteDoc, doc} from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

const Show = () => {
    //Hooks
    const [products, setProducts] = useState( [] )
  
    //DB firestore
    const productsCollection = collection(db, "uniformes")
  
    //Mostrar docs
    const getProducts = async ()   => {
        const data = await getDocs(productsCollection)
        setProducts(
            data.docs.map( (doc) => ( {...doc.data(),id:doc.id}))
        )
    }

    //Elimnar
    const deleteProduct = async (id) => {
        const productDoc = doc(db, "uniformes", id)
        await deleteDoc(productDoc)
        getProducts()
    }

    //Confirmcación sweetalert
    const confirmDelete = (id) => {
        MySwal.fire({
          title: '¿Eliminar el producto?',
          text: "No serás capaz de revertirlo!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Si, bórralo!'
        }).then((result) => {
            if (result.isConfirmed) { 
                //llamamos a la funcion para eliminar   
                deleteProduct(id)               
                Swal.fire(
                    'Eliminado!',
                    'El producto fue eliminado',
                    'success'
                )
            }
        })    
    }


    //useEffect
    useEffect( () => {
        getProducts()
    // eslint-disable-next-line
    }, [] )

    //LA TABLA BONITA
    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <div className="d-grid gap-2">
                            <Link to="/create" className='btn btn-secondary mt-2 mb-2'>Create</Link>    
                        </div>
                        <table className='table table-dark table-hover'>
                            <thead>
                                <tr>
                                    <th>nombre</th>
                                    <th>piezas</th>
                                    <th>precio</th>
                                    <th>stock</th>
                                    <th>talla</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            
                            <tbody>
                                { products.map( (product) => (
                                    <tr key={product.id}>
                                        <td>{product.nombre}</td>
                                        <td>{product.piezas}</td>
                                        <td>{product.precio}</td>
                                        <td>{product.stock}</td>
                                        <td>{product.talla}</td>
                                        <td>
                                            <Link to={`/edit/${product.id}`} className="btn btn-light"><i className="fa-solid fa-pencil"></i></Link>   
                                            <button onClick={ () => { confirmDelete(product.id) } } className="btn btn-danger"><i className="fa-solid fa-trash"></i></button>
                                        </td>
                                    </tr>                
                                )) }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )


}

export default Show