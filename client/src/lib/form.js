export const emptyCheck = (form) => {
    for (let key in form) {
        if (typeof form[key] === 'object') {
            if (!emptyCheck(form[key])) return false;
        } else {
            if (form[key] !== '') return false
        }
    }
    
    return true;
}

export const errorCheck = (error) => {
    if (Array.isArray(error)) {
        for (let i = 0; i < error.length; i++) {
            if (!error[i]) return true;
        }
        
        return false
    }
    for (let key in error) {
        if (error.hasOwnProperty(key) && error[key]) return true;
    }
    
    return false;
}

export const nameFormat = (name) => {
    return name
        .trim()
        .split(' ')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(' ');
}

export const handleChange = (
        e,
        form,
        setForm,
        setMsg,
        error,
        setError,
        unit,
    ) => {
    const { name, value } = e.target;

    const regex = new RegExp(/^[a-zA-Z]+$/);

    if (value === '') return;

    switch (name) {
        case 'name':
            setForm({
                ...form,
                name: value
            });
            if (form?.name?.length < 3 || !regex.test(form.name)){
                setMsg('Make sure your name is longer than 3 characters!')
                setError({
                    ...error,
                    name: true
                })
            } else {
                setError({
                    ...error,
                    name: false
                })
            }
            break;
        case 'hgt-min':
            const hgtMin = Number(value);
            if (isNaN(hgtMin)) {
                setMsg('Not a valid height! Numbers only!')
                setError({
                    ...error,
                    height: true
                })
            } else {
                if (unit?.sys === 'imp') {
                    setForm({
                        ...form,
                        height: {
                            min: (hgtMin / 2.54).toFixed(2),
                            max: form?.height?.max
                        }
                    });
                } else {
                    setForm({
                        ...form,
                        height: {
                            min: hgtMin,
                            max: form?.height?.max
                        }
                    });
                }
                setError({
                    ...error,
                    height: false
                })
            }
            break;
        case 'hgt-max':
            const hgtMax = Number(value);
            if (isNaN(hgtMax)) {
                setMsg('Not a valid height! Numbers only!')
                setError({
                    ...error,
                    height: true
                })
            } else {
                if (unit.sys === 'imp') {
                    setForm({
                        ...form,
                        height: {
                            min: form?.height?.min,
                            max: (hgtMax / 2.54).toFixed(2)
                        }
                    });
                } else {
                    setForm({
                        ...form,
                        height: {
                            min: form?.height?.min,
                            max: hgtMax
                        }
                    });
                }
                setError({
                    ...error,
                    height: false
                })
            }
            break;
        case 'wgt-min':
            const wgtMin = Number(value);
            if (isNaN(wgtMin)) {
                setError('Not a valid weight! Numbers only!')
                setError({
                    ...error,
                    weight: true
                })
            } else {
                if (unit.sys === 'imp') {
                    setForm({
                        ...form,
                        weight: {
                            min: `${(wgtMin / 2.2).toFixed(2)}`,
                            max: form?.weight?.max
                        }
                    });
                } else {
                    setForm({
                        ...form,
                        weight: {
                            min: wgtMin,
                            max: form?.weight?.max
                        }
                    });
                }
                setError({
                    ...error,
                    weight: false
                })
            }
            break;
        case 'wgt-max':
            const wgtMax = Number(form?.height?.min);
            if (isNaN(wgtMax)) {
                setMsg('Not a valid weight! Numbers only!')
                setError({
                    ...error,
                    weight: true
                })
            } else {
                if (unit.sys === 'imp') {
                    setForm({
                        ...form,
                        weight: {
                            min: form?.weight?.max,
                            max: `${(wgtMax / 2.2).toFixed(2)}`
                        }
                    });
                } else {
                    setForm({
                        ...form,
                        weight: {
                            min: form?.weight?.min,
                            max: wgtMax
                        }
                    });
                }
                setError({
                    ...error,
                    weight: false
                })
            }
            break;
        case 'ls-min':
            const lsMin = Number(value);
            if (isNaN(lsMin)) {
                setMsg('Not a valid Lifespan! Numbers only!')
                setError({
                    ...error,
                    lifespan: true
                })
            } else {
                setForm({
                    ...form,
                    lifespan: {
                        min: lsMin,
                        max: form?.lifespan?.max,
                    }
                });
                setError({
                    ...error,
                    lifespan: false
                })
            }
            break;
        case 'ls-max':
            const lsMax = Number(value);
            if (isNaN(lsMax)) {
                setMsg('Not a valid Lifespan! Numbers only!')
                setError({
                    ...error,
                    lifespan: true
                })
            } else {
                setForm({
                    ...form,
                    lifespan: {
                        min: form?.lifespan?.min,
                        max: lsMax,
                    }
                });
                setError({
                    ...error,
                    lifespan: false
                })
            }
            break;
        case 'temps':
            if (form?.temps?.length >= 4) {
                setMsg('You can select just four temperaments!')
            } else {
                setForm({
                    ...form,
                    temps: [...form?.temps, value]
                });
                setError({
                    ...error,
                    temps: false
                })
            }
            break;
        default:
            break;
    }
}