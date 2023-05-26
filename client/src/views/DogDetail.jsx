import React, { Suspense, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { getDogById } from '../redux/actions'
import Error from './components/Error'
import Loading from './components/Loading'
import Navbar from './components/Navbar'
import Icons from './components/Icons'
import Edit from './components/Edit'
import DogDetailCSS from '../styles/DogDetail.module.css'
import NavbarCSS from '../styles/Navbar.module.css'
import dogImg from '../images/dogDb.jpeg';

const DogDetail = () => {
    const [loading, setLoading] = useState(true);
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
            .then(() => setLoading(false))
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
                loading ? (<Loading />) : error.error ? <Error msg={error.message} /> : (
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
                                        {
                                            isNaN(dog?.id) ? (
                                                <img className={DogDetailCSS.img} src={dog?.image} alt={`dog${dog?.name}`} />
                                                ) : (
                                                <img className={DogDetailCSS.img} src={dogImg} alt={`dog${dog?.name}`} />
                                            )
                                        }
                                    </div>
                                </div>
                                <div className={DogDetailCSS.specs}>
                                    <div>
                                        <div className={DogDetailCSS.data}>
                                            <p>Height:</p>
                                            <p>{height}</p>
                                        </div>
                                        <div className={DogDetailCSS.data}>
                                            <p>Weight:</p>
                                            <p>{weight}</p>
                                        </div>
                                        <div className={DogDetailCSS.data}>
                                            <p>Lifespan:</p>
                                            <p>{dog?.lifespan}</p>
                                        </div>
                                        <hr />
                                        <p>Temperaments:</p>
                                        <ul>
                                            {
                                                dog?.temperaments?.map((t, index) => (
                                                    <li key={index} className={NavbarCSS.temp}>{t.name}</li>
                                                ))
                                            }
                                        </ul>
                                        <br />
                                        <hr />
                                    </div>
                                    <button className={switchClass} onClick={() => setSystem(unit.toggle)}>
                                        {system === 'met' ? 'METRIC' : 'IMPERIAL'}
                                    </button>
                                    {
                                        isNaN(dog?.id) ? (
                                            <Edit id={dog?.id} />
                                        ) : []
                                    }
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