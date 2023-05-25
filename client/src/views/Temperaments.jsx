import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getTemps } from '../redux/actions'
import { useDispatch, useSelector } from 'react-redux';
import Loading from './components/Loading';
import Error from './components/Error';
import Navbar from './components/Navbar';
import TempsCSS from '../styles/Temps.module.css'
import DogDetailCSS from '../styles/DogDetail.module.css'
import Icons from './components/Icons';

const Temperaments = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState({
    error: false,
    message: ''
  });

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTemps())
      .then(() => setLoading(false))
      .catch(error => {
        setError({
          error: true,
          message: error.message
        });
      })
  }, [dispatch])

  const temps = useSelector(state => state.temps)

  return (
    <>
      {
        loading ? (<Loading />) : error.error ? (<Error msg={error.message} />) : (
          <div className={TempsCSS.body}>
            <Link to='/dogs' className={DogDetailCSS.back}>
              <Icons.ArrowBigLeft size={40} color='white' />
            </Link>

            <Navbar />

            <div className={TempsCSS.container}>
              <h1>Temperaments</h1>
              <div className={TempsCSS.temps}>
                {
                  temps.map((temp, index) => (
                      <p key={index} className={TempsCSS.temp}>
                        {temp.name}
                      </p>
                    )
                  )
                }
              </div>
            </div>

          </div>
        )
      }
    </>
  )
}

export default Temperaments