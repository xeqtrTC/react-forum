import React from 'react'

import './Pagination.css';
export default function Pagination({ postsPerPage, totalPosts, paginate}) {
  const pageNumbers = [];
  
    for(let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }


    return (
    <div className='pagination-container'>
        <ul>
            {pageNumbers.map((number) => (
                <li key={number}>
                    <a onClick={() => paginate(number)}>
                        {number}
                    </a>
                </li>
            ))}
        </ul>
    </div>
  )
}
