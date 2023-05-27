import React, { Suspense, useContext, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "./components/Loading";
import Navbar from "./components/Navbar";
import DogCard from "./components/DogCard";
import Page from "./components/Page";
import SearchBar from "./components/SearchBar";
import DogsCSS from "../styles/Dogs.module.css";
import { DogsContext } from "../context/DogsProvider";

const Dogs = () => {
  const perPage = 8;

  const dogs = useSelector((state) => state.dogs);
  const page = useSelector((state) => state.page);
  const { loading } = useContext(DogsContext);
  const dogsPerPage = dogs?.slice(page * perPage, page * perPage + perPage);

  return (
    <Suspense fallback={<Loading />}>
      <div className={DogsCSS.body}>
        <Navbar />

        <SearchBar />
        <div className={DogsCSS.container}>
          {
            loading ? (
              <h3>Cargando</h3>
            ) : dogsPerPage.length > 0 ? (
              dogsPerPage.map((dog) => (<DogCard key={dog.id} data={dog} />))
            ) : (
              <p className={DogsCSS.nodata}>No dogs found!</p>
            )
          }
        </div>
        <Page numPages={Math.ceil(dogs.length / perPage)} />
      </div>
    </Suspense>
  );
};

export default Dogs;
