import React, { useState, useEffect } from "react";
import { page } from '../../redux/actions';
import { useDispatch } from "react-redux";
import Icons from '../../views/components/Icons'
import PageCSS from '../../styles/Page.module.css'


const Page = ({ numPages }) => {
    const maxPages = 5;
    
    const [ curPage, setCurPage ] = useState(0);
    
    const dispatch = useDispatch();

    const handlePage = p => {
        setCurPage(p);
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    useEffect(() => {
        dispatch(page(curPage));
        window.scrollTo({top: 0, behavior: 'smooth'});
    }, [dispatch, curPage]);
    
    let pages = [];

    for (let i = 0; i < numPages; i++) {
        pages.push((
            <div key={i} className={`${PageCSS.page} ${i === curPage ? PageCSS.active : []}`} onClick={() => handlePage(i)}>
                {i + 1}
            </div>
        ))
    }


    return (
        <>
            {
                pages.length >= maxPages ? (

                    <div className={PageCSS.container}>
                        {
                            curPage === 0 ? [] : (
                                <div className={PageCSS.prevnext}>
                                    <Icons.ChevronFirst className={PageCSS.chev} size={30} color="white" onClick={() => handlePage(0)} />
                                    <Icons.ChevronLeft className={PageCSS.chev} size={30} color="white" onClick={() => handlePage(curPage - 1)}/>
                                    <Icons.MoreHorizontal size={30} color="white"/>
                                </div>
                            )
                        }
                        {
                            pages.slice(curPage, curPage + maxPages).map(p => p)
                        }
                        {
                            curPage + 1 === numPages ? [] : (
                                <div className={PageCSS.prevnext}>
                                    {
                                        curPage > (numPages - 5) ? [] : (
                                            <Icons.MoreHorizontal size={30} color="white"/>
                                        )
                                    }
                                    <Icons.ChevronRight className={PageCSS.chev} size={30} color="white" onClick={() => handlePage(curPage + 1)} />
                                    <Icons.ChevronLast className={PageCSS.chev} size={30} color="white" onClick={() => handlePage(numPages - 1)} />
                                </div>
                            )
                        }
                    </div>
                ) : []
            }
        </>
    );
}

export default Page;