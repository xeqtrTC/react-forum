const express = require('express');
const connection = require('../database/connection')



const getAllCategories = (req, res) => {
    const cookies = req.cookies

     connection.query('SELECT * from categories', (err, rows) => {
        if(rows) {
            res.json(rows);
            console.log(cookies);

        } else {
            console.log(err);
        }
    })
}
    
const getPostPerCategory = (req, res) => {
    const cookies = req.cookies
    const { category } = req.body;
    console.log(category);
    connection.query('select * from posts as p, categories as c WHERE p.category = c.title AND c.title = ?', [req.params.category], (err, result) => {
        if(result) {
            res.send(result)
            console.log(cookies);
        }
    })

}

// categoryRouter.get('/category/posts/:category', (req, res) => {
//     const { category } = req.body;
//     console.log(category);
//     connection.query('select * from posts as p, categories as c WHERE p.category = c.title AND c.title = ?', [req.params.category], (err, result) => {
//         if(result) {
//             res.send(result)
//         }
//     })

// })
module.exports = {
    getPostPerCategory,
    getAllCategories
}

