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
import { Redirect, useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const Dogs = () => {
  const perPage = 8;

  // const history = useHistory();

  const dogs = useSelector(state => state.filteredDogs)
  const page = useSelector(state => state.page)

  const loading = useSelector(state => state.loading);
  // const error = useSelector(state => state.error);
  
  const dogsPerPage = dogs?.slice(page * perPage, (page * perPage) + perPage);

  // error || history.push('/error');

  return (
    <Suspense fallback={<Loading />}>
      <div className={DogsCSS.body}>
        <Navbar />

        <SearchBar />
        
        <div className={DogsCSS.container}>
          {
            loading ? <Loading /> : dogsPerPage.length ? dogsPerPage.map(dog => (
              <DogCard key={dog.name} data={dog} />
            )) : (<p className={DogsCSS.nodata}>No dogs found!</p>)
          }
        </div>

        <Page numPages={Math.ceil(dogs.length / perPage)} />
      </div>
    </Suspense>
  )
}

export default Dogs