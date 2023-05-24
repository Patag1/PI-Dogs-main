import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getDogs, dogsFilter, dogsSort } from '../../redux/actions'
import SearchCSS from '../../styles/SearchBar.module.css'
import Icons from './Icons'
import NavbarCSS from '../../styles/Navbar.module.css'

const SearchBar = () => {
  const [term, setTerm] = useState('NAME');
  const [origin, setOrigin] = useState('API');
  
  const handleTerm = () => term === 'NAME' ? setTerm('TEMP') : setTerm('NAME');
  
  const orgToggle = origin === 'API' ? 'DB' : 'API';
  
  const dispatch = useDispatch();

  const handleSearch = e => {
    const { value } = e.target;
    if (term === 'NAME') return dispatch(getDogs(value));
    else dispatch(dogsFilter(term, value));
  }

  // sort
  const [alphsort, setAlphsort] = useState('');
  const [wgtsort, setWgtsort] = useState('');

  const handleSort = e => {
    const { name } = e.target;

    if (name === 'alph') {
      dispatch(dogsSort(name));
      setAlphsort(alphSort[0]);
    }
  }

  const alphSort = [
    alphsort === 'az' || !alphsort ? 'za' : 'az',
    alphsort === 'az' || !alphsort ? 'A-Z' : 'Z-A'
  ]

  const wgtToggle = wgtsort === 'des' || !wgtsort ? 'asc' : 'des';

  return (
    <div className={SearchCSS.body}>

      <div className={SearchCSS.srcdiv}>
        <Icons.Search size={25} color='white' />
        <input className={SearchCSS.search} type="text" placeholder="Search by" onChange={handleSearch} />
        <button className={NavbarCSS.btn2} onClick={() => handleTerm()}>{term}</button>
        <button className={NavbarCSS.btn2} onClick={() => setOrigin(orgToggle)}>{origin}</button>
      </div>

      <div className={SearchCSS.sort}>
        <Icons.Filter size={25} color='white' />
        <div className={SearchCSS.sortbtns}>
          <button name='alph' className={NavbarCSS.btn1} onClick={(e) => handleSort(e)}>
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
