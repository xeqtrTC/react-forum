import React from 'react'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import ReactPaginate from 'react-paginate';

import './Pagination.css';
export default function Pagination({ pageCount, changePage}) {
//   const pageNumbers = [];
//   console.log(postsPerPage);
//   console.log(totalPosts);
//   console.log(paginate);
//     if(postsPerPage) {
//         let showMax = 3;
//         let endPage;
//         let startPage;

//         if(postsPerPage <= showMax) {
//             startPage = 1;
//             endPage = postsPerPage.length;
//         } else {
//             startPage = paginate;
//             if(startPage != postsPerPage.length && (startPage + 1) != pageNumbers.lnegth) {
//                 endPage = paginate + showMax - 1
//             } else {
//                 endPage = postsPerPage.length;
//             }
//         }
//         for (let i = startPage; i <= endPage; i++) {
//             pageNumbers.push(i);
//         }
//         return pageNumbers;
//     }
//     console.log('page number', pageNumbers);
    // for(let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    //     pageNumbers.push(i);
    // }


    return (
        <div className='pagination-container-searchperpost'>
        <ReactPaginate
            previousLabel={<AiOutlineArrowLeft />}
            nextLabel={<AiOutlineArrowRight />}
            pageCount={pageCount}
            onPageChange={changePage}
            pageRangeDisplayed={3}
            breakLabel="..."

            marginPagesDisplayed={2}
            containerClassName={"paginationBttns"}
            previousLinkClassName={"previousBttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
        />                                    
        </div>
  )
}
