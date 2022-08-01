const express = require('express');
const connection = require('../database/connection')



const getAllCategories = (req, res) => {
    console.log(req.isAuthenticated());

     connection.query('SELECT * from categories', (err, rows) => {
        if(rows) {
            res.json(rows);

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

const getPostPerPost =  (req, res) => {
    
    connection.query('SELECT * FROM replies INNER JOIN users ON reply_username = users.username WHERE reply_post = ?' , [req.params.posttitle], (err, rows) => {
        console.log(rows);
        if(rows) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
}

const postPostbyUser = (req, res) => {
    const { user, text, title } = req.body
    console.log(user, text, title)
    connection.query('INSERT INTO replies SET ?', {reply_username: user, reply_content: text, reply_post: title, reply_date: new Date().toISOString()}, (err, rows) => {
        if(rows) {
            connection.query('select postnumber from users where username = ?', user, (err, result) => {
                console.log(result);
                if(result) {
                    const [ {postnumber} ] = result;
                    const number_post = parseInt(postnumber);
                    console.log(number_post);
                    const update_posts = number_post + 1;
                    console.log('fasfas', update_posts)
                    
                    connection.query('update users set postnumber = ? where username = ?', [update_posts, user], (err, results) => {
                        if(results) {
                            console.log('moze')
                        } else {
                            console.log(err);
                        }
                    })
                } else {
                    console.log(err);
                }
            })
            res.json({ message: 'good'})
        } else {
            console.log(err);
        }
    })
}

const postTopicbyUser = (req, res) => {
    
    const { username, descriptionValue, titleValue, category } = req.body

    connection.query('INSERT INTO posts SET ? ', {postusername: username, category: category, posttitle: titleValue, content: descriptionValue, postdate: new Date().toISOString()}, (err, result ) => {
        if(result) {
            connection.query('INSERT INTO replies SET ?', {reply_username: username, reply_content: descriptionValue, reply_post: titleValue, reply_date: new Date().toISOString()}, (err, rows) => {
                if(rows) {
                    res.json({ message: 'good'})
                } else {
                    console.log(err);
                }
            } )
        } else {
            console.log(err);
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
    getAllCategories,
    getPostPerPost,
    postPostbyUser,
    postTopicbyUser,
}

