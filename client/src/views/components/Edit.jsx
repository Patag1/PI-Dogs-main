import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteDog } from '../../redux/actions'
import EditCSS from '../../styles/Edit.module.css'

const Edit = ({ id }) => {

    const dispatch = useDispatch();

    const handleDelete = e => {
        dispatch(deleteDog(e.target.value));
    }

    return (
        <>
            <button className={`${EditCSS.btn} ${EditCSS.del}`} value={id} onClick={(e) => handleDelete(e)}>
                DELETE
            </button>
        </>
    )
}

export default Edit
