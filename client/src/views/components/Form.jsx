import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postDog, getTemps } from '../../redux/actions'
import Icons from './Icons';
import NavbarCSS from '../../styles/Navbar.module.css'

import { emptyCheck, errorCheck, nameFormat, handleChange } from '../../lib/form';

const Form = ({ show }) => {
    
    const [system, setSystem] = useState('met')
    const [form, setForm] = useState({
        name: '',
        height: {
            min: '',
            max: ''
        },
        weight: {
            min: '',
            max: ''
        },
        lifespan: {
            min: '',
            max: ''
        },
        temps: [],
    })
    const [msg, setMsg] = useState('')
    const [error, setError] = useState({
        name: true,
        height: true,
        weight: true,
        lifespan: true,
        temps: true
    });

    console.log(error)
    
    const unit = system === 'met' ? {
        sys: 'met',
        opp: 'imp',
        height: 'cm',
        weight: 'kg',
    } : {
        sys: 'imp',
        opp: 'met', 
        height: 'in',
        weight: 'lbs',
    }

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTemps())
    }, [])

    const handleSubmit = e => {
        e.preventDefault();
        
        if (errorCheck(error) || emptyCheck(form)) return setMsg('Complete the fields correctly!')

        setForm({
            ...form,
            name: nameFormat(form.name),
        })

        dispatch(postDog(form));
    }

    const handleCancel = (e) => {
        console.log(e.target.name)
        setForm({
            ...form,
            temps: form.temps.filter(t => t !== e.target.name)
        })
        console.log(form.temps)
    }

    const renderMsg = errorCheck(error) && !emptyCheck(form);

    const switchClass = show ? `${NavbarCSS.form} ${NavbarCSS.show}` : `${NavbarCSS.form}`;
    const switchClass1 = renderMsg ? `${NavbarCSS.msg} ${NavbarCSS.showmsg}` : `${NavbarCSS.msg}`;
    const switchClass2 = unit.sys === 'imp' ? `${NavbarCSS.btn2} ${NavbarCSS.imp}` : `${NavbarCSS.btn2}`;

    const params = [form, setForm, setMsg, error, setError, unit];

    const temps = useSelector(state => state.temps);

    return (
        <div className={switchClass}>
            <div className={NavbarCSS.header}>
                <h1>Create a new dog!</h1>
                <Icons.Dog size={50} color='white' className={NavbarCSS.img} />
                <div className={switchClass1}>
                    <p>{msg}</p>
                </div>
            </div>
            <form onSubmit={handleSubmit} className={NavbarCSS.inputs}>
                <div className={NavbarCSS.ipts}>
                    <div className={NavbarCSS.input}>
                        <input type="text" name='name' placeholder='Name' required autoComplete='off' />
                    </div>
                    <div className={NavbarCSS.num}>
                        <label htmlFor="height">Height</label>
                        <input type="text" name='hgt-min' required placeholder='min' autoComplete='off' min={1} onChange={(e) => handleChange(e, ...params)} />
                        -
                        <input type="text" name='hgt-max' required placeholder='max' autoComplete='off' min={1} onChange={(e) => handleChange(e, ...params)} />
                        {unit.height}
                    </div>
                    <div className={NavbarCSS.num}>
                        <label htmlFor="weight">Weight</label>
                        <input type="text" name='wgt-min' required placeholder='min' autoComplete='off' min={1} onChange={(e) => handleChange(e, ...params)} />
                        -
                        <input type="text" name='wgt-max' required placeholder='max' autoComplete='off' min={1} onChange={(e) => handleChange(e, ...params)} />
                        {unit.weight}
                    </div>
                    <div className={NavbarCSS.num}>
                        <label htmlFor="lifespan">Lifespan</label>
                        <input type="text" name='ls-min' required placeholder='min' autoComplete='off' min={1} onChange={(e) => handleChange(e, ...params)} />
                        -
                        <input type="text" name='ls-max' required placeholder='max' autoComplete='off' min={1} onChange={(e) => handleChange(e, ...params)} />
                        yrs
                    </div>
                    <div className={NavbarCSS.select}>
                        <select name="temps" onChange={(e) => handleChange(e, ...params)}>
                            <option disabled selected hidden>Temperaments</option>
                            {
                                temps.map((t, i) => (
                                    <option key={i} value={t.name} className={NavbarCSS.opt}>{t.name}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                <div className={NavbarCSS.buttons}>
                    <div className={NavbarCSS.temps}>
                        {
                            form.temps.map((t, i) => (
                                <button key={i} name={t} type='button' className={NavbarCSS.temp} onClick={(e) => handleCancel(e)}>
                                    {t} <Icons.X size={15} color='white' />
                                </button>
                            ))
                        }
                    </div>
                    <div className={NavbarCSS.btns}>
                        <button type='submit' className={NavbarCSS.btn1}>CREATE!</button>
                        <button type='button' onClick={() => setSystem(unit.opp)} className={switchClass2}>
                            {system === 'met' ? 'METRIC' : 'IMPERIAL'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Form