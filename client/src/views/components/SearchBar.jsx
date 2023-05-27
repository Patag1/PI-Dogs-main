import React, { useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getDogs, dogsFilter, dogsSort, page } from '../../redux/actions'
import Icons from './Icons'
import SearchCSS from '../../styles/SearchBar.module.css'
import NavbarCSS from '../../styles/Navbar.module.css'
import { DogsContext } from '../../context/DogsProvider'

const SearchBar = () => {
  const [term, setTerm] = useState('NAME');
  const [origin, setOrigin] = useState('API');
  const [inputText, setInputText] = useState("");
  const { loading } = useContext(DogsContext)

  const termToggle = term === 'NAME' ? 'TEMP' : 'NAME';

  const dispatch = useDispatch();
  const renderDogs = ( ) => {
    console.log(inputText)
    if (term === 'NAME') return dispatch(getDogs(inputText));
    dispatch(dogsFilter(inputText));
  };

  useEffect(() => {
    renderDogs();
  },[inputText])

  const handleSearch = e => {
    const { value } = e.target;
    setInputText(value);
  }

  const originToggle = origin === 'API' ? 'DB' : 'API';

  const handleFilter = e => {
    const { name } = e.target;
    if (name === 'API' || name === 'DB') dispatch(page(0));
    dispatch(dogsFilter(name));
    setOrigin(originToggle);
  }

  const handleReset = () => {
    dispatch(getDogs());
    setOrigin('API');
  }


  // SORT

  const [azSort, setAzSort] = useState('az');
  const [wgtSort, setWgtSort] = useState('asc');

  const handleSort = e => {
    const { name, value } = e.target;

    dispatch(dogsSort(value));

    return name === 'alph' ? setAzSort(azToggle) : setWgtSort(wgtToggle);
  }

  const azToggle = azSort === 'az' ? 'za' : 'az';
  const azText = azSort === 'az' ? 'A-Z' : 'Z-A';

  const wgtToggle = wgtSort === 'des' ? 'asc' : 'des';

  const btn1 = `${NavbarCSS.btn1} ${SearchCSS.btn1}`
  const btn2 = `${NavbarCSS.btn2} ${SearchCSS.btn2}`
  const btnacc = `${NavbarCSS.btn2} ${SearchCSS.btnacc}`

  return (
    <div className={SearchCSS.body}>
      <div className={SearchCSS.srcdiv}>
        <Icons.Search size={25} color='white' />
        <input className={SearchCSS.search} value={inputText}  type="text" placeholder="Search by" onChange={handleSearch} />
        <button className={btn2} onClick={() => setTerm(termToggle)}>{term}</button>
        <div className={SearchCSS.origin}>
          <button className={btn2} name={origin} onClick={(e) => handleFilter(e)}>{origin}</button>
          <button className={btnacc} onClick={() => handleReset()}><Icons.RotateCw size={15} color='black' /></button>
        </div>
      </div>

      <div className={SearchCSS.sort}>
        <Icons.Filter size={25} color='white' />
        <div className={SearchCSS.sortbtns}>
          <button name='alph' value={azSort} className={btn1} onClick={(e) => handleSort(e)}>
            {azText}
          </button>
          <button name='wgt' value={wgtSort} className={NavbarCSS.btn1} onClick={(e) => handleSort(e)}>
            WEIGHT
            {
              wgtSort === 'asc' ? (
                <Icons.ArrowDownWideNarrow size={15} color='white' />
                ) : (
                <Icons.ArrowDownNarrowWide size={15} color='white' />
              )
            }
          </button>
        </div>
      </div>

    </div>
  )
}

export default SearchBar
