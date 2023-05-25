import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getDogs, dogsFilter, dogsSort } from '../../redux/actions'
import Icons from './Icons'
import SearchCSS from '../../styles/SearchBar.module.css'
import NavbarCSS from '../../styles/Navbar.module.css'

const SearchBar = () => {
  const [term, setTerm] = useState('NAME');
  const [origin, setOrigin] = useState('API');
  
  const termToggle = term === 'NAME' ? 'TEMP' : 'NAME';

  const dispatch = useDispatch();

  const handleSearch = e => {
    const { value } = e.target;
    if (term === 'NAME') return dispatch(getDogs(value));
    dispatch(dogsFilter(value));
  }

  const originToggle = origin === 'API' ? 'DB' : 'API';

  const handleFilter = e => {
    const { name } = e.target;
    dispatch(dogsFilter(name));
    setOrigin(originToggle);
  }

  const handleReset = () => {
    dispatch(getDogs());
    setOrigin('API');
  }

  
  // SORT

  const [alphsort, setAlphsort] = useState('az');
  const [wgtsort, setWgtsort] = useState('');

  const handleSort = e => {
    const { name, value } = e.target;

    if (name === 'alph') {
      dispatch(dogsSort(value));
      setAlphsort(alphSort[0]);
    }
  }

  const alphSort = [
    alphsort === 'az' || !alphsort ? 'za' : 'az',
    alphsort === 'az' || !alphsort ? 'A-Z' : 'Z-A'
  ]

  const wgtToggle = wgtsort === 'des' || !wgtsort ? 'asc' : 'des';

  const btn1 = `${NavbarCSS.btn1} ${SearchCSS.btn1}`
  const btn2 = `${NavbarCSS.btn2} ${SearchCSS.btn2}`
  const btnacc = `${NavbarCSS.btn2} ${SearchCSS.btnacc}`

  return (
    <div className={SearchCSS.body}>

      <div className={SearchCSS.srcdiv}>
        <Icons.Search size={25} color='white' />
        <input className={SearchCSS.search} type="text" placeholder="Search by" onChange={handleSearch} />
        <button className={btn2} onClick={() => setTerm(termToggle)}>{term}</button>
        <div className={SearchCSS.origin}>
          <button className={btn2} name={origin} onClick={(e) => handleFilter(e)}>{origin}</button>
          <button className={btnacc} onClick={() => handleReset()}><Icons.RotateCw size={15} color='black' /></button>
        </div>
      </div>

      <div className={SearchCSS.sort}>
        <Icons.Filter size={25} color='white' />
        <div className={SearchCSS.sortbtns}>
          <button name='alph' value={alphsort} className={btn1} onClick={(e) => handleSort(e)}>
            {alphSort[1]}
          </button>
          <button className={NavbarCSS.btn1} onClick={() => setWgtsort(wgtToggle)}>
            WEIGHT
            {
              wgtsort === 'asc' ? (
                <Icons.ArrowDownNarrowWide size={15} color='white' />
              ) : (
                <Icons.ArrowDownWideNarrow size={15} color='white' />
              )
            }
          </button>
        </div>
      </div>

    </div>
  )
}

export default SearchBar
