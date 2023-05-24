import React, { Suspense, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { getDogById } from '../redux/actions'
import Error from './components/Error'
import Loading from './components/Loading'
import Navbar from './components/Navbar'
import DogDetailCSS from '../styles/DogDetail.module.css'
import Icons from './components/Icons'

const DogDetail = () => {
    const [error, setError] = useState({
        error: false,
        message: '',
    });
    const [system, setSystem] = useState('met');
    
    const unit = {
        toggle: system === 'met' ? 'imp' : 'met',
        hgt: system === 'met' ? 'cm' : 'in',
        wgt: system === 'met' ? 'kg' : 'lb'
    }

    const dispatch = useDispatch();

    const { id } = useParams();
    
    
    useEffect(() => {
        dispatch(getDogById(id))
            .catch(error => {
                setError({
                    error: false,
                    message: error.message,
                })
            })
    }, [dispatch, id]);
        
    const dog = useSelector(state => state.dog) || {};

    const height = `${system === 'met' ? dog?.height?.metric : dog?.height?.imperial} ${unit.hgt}`;
    const weight = `${system === 'met' ? dog?.weight?.metric : dog?.weight?.imperial} ${unit.wgt}`;

    const switchClass = system === 'met' ? `${DogDetailCSS.btn}` : `${DogDetailCSS.btn} ${DogDetailCSS.imp}`

    return (
        <Suspense fallback={<Loading />}>
            {
                error.error ? <Error msg={error.message} /> : (
                    <>
                        <Link to='/dogs' className={DogDetailCSS.back}>
                            <Icons.ArrowBigLeft size={40} color='white' />
                        </Link>
                        <div className={DogDetailCSS.body}>

                            <Navbar />

                            <div className={DogDetailCSS.container}>
                                <div className={DogDetailCSS.header}>
                                    <h1>{dog?.name}</h1>
                                    <div className={DogDetailCSS.imgdiv}>
                                        <img className={DogDetailCSS.img} src={dog?.image} alt={`dog${dog?.name}`} />
                                    </div>
                                </div>
                                <div className={DogDetailCSS.specs}>
                                    <div>
                                        <p>Height: {height}</p>
                                        <p>Weight: {weight}</p>
                                        <p>Lifespan: {dog?.lifespan}</p>
                                        <p>Temperaments: <br /> {dog?.temps?.join(', ')}</p>
                                    </div>
                                    <button className={switchClass} onClick={() => setSystem(unit.toggle)}>
                                        {system === 'met' ? 'METRIC' : 'IMPERIAL'}
                                    </button>
                                </div>
                            </div>
                        
                        </div>
                    </>
                )
            }
        </Suspense>
    )
}

export default DogDetail