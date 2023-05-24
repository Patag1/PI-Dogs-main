import { getDogs } from '../redux/actions'
import React, { useState, useEffect, Suspense } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loading from './components/Loading'
import Error from './components/Error'
import Navbar from './components/Navbar'
import DogCard from './components/DogCard'
import Page from './components/Page'
import DogsCSS from '../styles/Dogs.module.css'
import SearchBar from './components/SearchBar'

const Dogs = () => {
  const perPage = 8;

  const [error, setError] = useState({
    error: false,
    message: ''
  });
  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getDogs())
      .catch(error => {
        setError({
          error: true,
          message: error.message
        })
      });
  }, [])

  const dogs = useSelector(state => state.dogs)
  // const filtered = useSelector(state => state.filteredDogs)
  const page = useSelector(state => state.page)

  const dogsPerPage = dogs?.slice(page * perPage, (page * perPage) + perPage);

  return (
    <Suspense fallback={<Loading />}>
      {
        error.error ? <Error msg={error.message} /> : (
          <div className={DogsCSS.body}>
            <Navbar />

            <SearchBar />
            
            <div className={DogsCSS.container}>
              {
                dogsPerPage.map(dog => (
                  <DogCard key={dog.name} data={dog} />
                ))
              }
            </div>

            <Page numPages={Math.ceil(dogs.length / perPage)} />
          </div>
        )
      }
    </Suspense>
  )
}

export default Dogs