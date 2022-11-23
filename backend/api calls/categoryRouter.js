const express = require('express');
const { connect } = require('../Database/connection');
const pool = require('../Database/connection')
const passport = require('../PassportAuthentication/passport');
const redis = require('redis')

const redisClient = redis.createClient();

const DEFAULT_EXPIRATION = 3600;

(async () => {
  
    redisClient.on("error", (error) => console.error(`Error : ${error}`));
  
    await redisClient.connect();
  })();
  

function getOrSetCache(key,cb) {
    return new Promise((resolve, reject) => {
        redisClient.get(key,async (error, data) => {
            if(error) return reject(error);
            if(data != null) return resolve(JSON.parse(data))
            const freshData = await cb();
            redisClient.setEx(key, DEFAULT_EXPIRATION, JSON.stringify(freshData));
            resolve(freshData);
        })
    })
}

const NumberofPostPerUserFunction = (req, res) => {
    
    try {
        
        const sqlUpdatePostNumber = 'UPDATE users SET postnumber = ? WHERE uid = ?';
                
        const number_post = parseInt(req.user.postnumber);
        const update_post = number_post + 1;

        pool.query(sqlUpdatePostNumber, [update_post, req.session.passport.user]);

                    
    } catch (error) {
        console.log(error);
    }
}

const insertIntoOverwatchuposts = (req, titleOfUpdate, section) => {

    const sqlInsert = 'INSERT INTO overwatchposts SET ?';


    try {
        pool.query(sqlInsert, {ow_pusername: req, ow_pname: titleOfUpdate, ow_psection: section, ow_pdate: new Date()});
    } catch (error) {
        console.log(error);
    }
}

const getAllCategories = async(req, res) => {
    const sql = 'SELECT * FROM categories'

    try {
        const result = await redisClient.get(`allCategories`)
        if(result) {
            return res.status(200).json(JSON.parse(result));
        } else {
            pool.query(sql, async(err, rows) => {
                if(rows) {
                    await redisClient.set(`allCategories`, JSON.stringify(rows));
                    return res.status(200).json(result);
                } 
            })
        }
       
    } catch ( err ) {
        console.log(err)
    }
  
}

     

    
const getPostPerCategory = async (req, res) => {

    const sql2 = 'SELECT title from categories where title = ?';
    const sql1 = 'select * from posts as p, categories as c WHERE p.category = c.title AND c.title = ?'
    
    let paramsOfCategory = req.params.category;

    try {
        const result = await redisClient.get(`/postsPerCategory/${paramsOfCategory}`)
        if(result) {
            res.status(200).json(JSON.parse(result));
        } else {
            pool.query(sql2, [paramsOfCategory],async (err, result) => {
                console.log('ulazimDVA')
    
                if(result.length > 0) {
                    pool.query(sql1,[paramsOfCategory], async (err, rows) => {
                        console.log('ulazimTRI')
    
                        if(rows) {
                            const resultTest = rows.filter((item) => item.idsubcategory === 0);
                            console.log(resultTest);
                            // redisClient.setEx(`/postsPerCategory/${paramsOfCategory}`, DEFAULT_EXPIRATION, JSON.stringify(resultTest));
                            await redisClient.set(`/postsPerCategory/${paramsOfCategory}`, JSON.stringify(resultTest))                          
                            return res.status(200).json(resultTest);
                        }
                    })
                   
                    
                } else {
                    console.log(err);
                    return res.status(401).json({ message: "That category doesn't exist"})
                }
            })
        }
    } catch (error) {
        console.log(error);
    }

   
         

        


    // const {value} = redisClient.setEx(`/postsPerCategory/${paramsOfCategory}`, DEFAULT_EXPIRATION, JSON.stringify(resultTest))
    // console.log(value);

        // pool.query(sql2, [paramsOfCategory],async (err, result) => {
        //                         console.log('ulazimDVA')
                    
        //                         if(result.length > 0) {
        //                             pool.query(sql1,[paramsOfCategory], async (err, rows) => {
        //                                 console.log('ulazimTRI')
                    
        //                                 if(rows) {
        //                                     const resultTest = rows.filter((item) => item.idsubcategory === 0);
        //                                     console.log(resultTest);
        //                                     redisClient.setEx(`/postsPerCategory/${paramsOfCategory}`, DEFAULT_EXPIRATION, JSON.stringify(resultTest))                                            
                                            
                                            
        //                                     return res.status(200).json(resultTest);
        //                                 }
        //                             })
                                   
                                    
        //                         } else {
        //                             console.log(err);
        //                             return res.status(401).json({ message: "That category doesn't exist"})
        //                         }
        //                     })


   // redisClient.lRange(`/postsPerCategory/${paramsOfCategory}`, 0, -1, (error, data) => {
    //     console.log(data);
    //     console.log('radi dva')

    //     if(error) console.log(error);
    //     if(data != null)  {
    //         return res.json(JSON.parse(data))
    //     } else {
    //         pool.query(sql2, [paramsOfCategory], (err, result) => {
    //                     console.log('ulazimDVA')
            
    //                     if(result.length > 0) {
    //                         pool.query(sql1,[paramsOfCategory], (err, rows) => {
    //                             console.log('ulazimTRI')
            
    //                             if(rows) {
    //                                 const resultTest = rows.filter((item) => item.idsubcategory === 0);
    //                                 console.log(resultTest);
    //                                 redisClient.setEx(`/postsPerCategory/${paramsOfCategory}`, DEFAULT_EXPIRATION, JSON.stringify(resultTest))
    //                                 return res.status(200).json(resultTest);
    //                             }
    //                         })
                           
                            
    //                     } else {
    //                         console.log(err);
    //                         return res.status(401).json({ message: "That category doesn't exist"})
    //                     }
    //                 })
    //     }
    // })






    

    // await redisClient.connect();

    // console.log('kone')




    // const dataOfQuery = await getOrSetCache(`postsPerCategory/${paramsOfCategory}`, () => {
    //     pool.query(sql2, [paramsOfCategory], (err, result) => {
    //         console.log('ulazimDVA')

    //         if(result.length > 0) {
    //             pool.query(sql1,[req.params.category], (err, rows) => {
    //                 console.log('ulazimTRI')

    //                 if(rows) {
    //                     const resultTest = rows.filter((item) => item.idsubcategory === 0);
    //                     console.log(resultTest);
    //                     return resultTest;
    //                 }
    //             })
               
                
    //         } else {
    //             return res.status(401).json({ message: "That category doesn't exist"})
    //         }
    //     })
    // })

    // console.log(dataOfQuery);


   
    
    
    // redisClient.quit();
        // redisClient.connect(async (data)  => {
        //     console.log(data);
        //     const dataOfQuery = await getOrSetCache(`postPerCategory/${paramsOfCategory}`, async () => {
        //         console.log('ulazim')
        //           pool.query(sql2, [paramsOfCategory], (err, result) => {
        //             console.log('ulazimDVA')
    
        //             if(result.length > 0) {
        //                 pool.query(sql1,[req.params.category], (err, rows) => {
        //                     console.log('ulazimTRI')
    
        //                     if(rows) {
        //                         const resultTest = rows.filter((item) => item.idsubcategory === 0);
        //                         console.log(resultTest);
        //                         return resultTest;
        //                     }
        //                 })
                       
                        
        //             } else {
        //                 return res.status(401).json({ message: "That category doesn't exist"})
        //             }
        //         })
        //         res.status(200).json(dataOfQuery);
        //         roo
        //     })
        // })

        
        
    
    

}

const subCategories = async(req, res) => {

    const paramsOfCategory = req.params.category;
    const sql = 'select * from subcategories, categories WHERE subcategories.idcategory = categories.cid and categories.title = ?'
    try {
        const result = await redisClient.get(`/subCategoriesPerCategory/${paramsOfCategory}`);
        if(result) {
            res.status(200).json(JSON.parse(result));
         } else {
            pool.query(sql, [req.params.category], async(err, rows) => {
                if(rows) {
        
                    await redisClient.set(`/subCategoriesPerCategory/${paramsOfCategory}`, JSON.stringify(rows));
                    
                    return res.status(200).json(rows);
                } else {
                    console.log(err);
                }
            })
         }
    } catch (error) {
        console.log(error);
    }



    // try {
    //     pool.query('select * from subcategories, categories WHERE subcategories.idcategory = categories.cid and categories.title = ?', [req.params.category], (err, rows) => {
    //         if(rows) {
    
    //             return res.json(rows);
    //         } else {
    //             console.log(err);
    //         }
    //     })
    // } catch (err) {
        
    // }
    
}

const getPostPerPost = async (req, res) => {
   
    const secondsql = 'SELECT * FROM posts INNER JOIN replies ON posts.posttitle = replies.reply_post WHERE posts.posttitle = ?'
    const anothersql = 'SELECT * FROM replies INNER JOIN users ON reply_username = users.username WHERE reply_post = ?'
    const sql = 'SELECT * FROM replies INNER JOIN posts ON replies.reply_post = posts.posttitle INNER JOIN users ON replies.reply_username = users.username WHERE posts.posttitle = ?'
    const sql2 = 'SELECT posttitle from posts WHERE posttitle = ?';
    
    const paramsOfPost = req.params.posttitle;
    console.log(paramsOfPost)
    try {
        // const result = await redisClient.get(`/postsPerPost/${paramsOfPost}`)
        // if(result) {
        //     res.status(200).json(JSON.parse(result));
        // } else {
            pool.query(sql2, [paramsOfPost], (err, rows) => {
                if(rows.length > 0) {
                    pool.query(sql, [paramsOfPost], async(err, result) => {
                        if(result) {

                            // await redisClient.set(`/postsPerPost/${paramsOfPost}`, JSON.stringify(result))                          

                           return res.status(200).json(result);
                        }
                    })
                } else {
                    return res.status(401).json({ message: "That topic doesn't exist"})
                }
            })
        // }
    } catch (error) {
        console.log(error);
    }

    
    // try {
    //     pool.query(sql2, [req.params.posttitle], (err, rows) => {
    //         if(rows.length > 0) {
    //             pool.query(sql, [req.params.posttitle], (err, result) => {
    //                 if(result) {
    //                    return res.json(result);
    //                 }
    //             })
    //         } else {
    //             return res.status(401).json({ message: "That topic doesn't exist"})
    //         }
    //     })
    // } catch (err) {
        
    // }
    
}


// TO BE DONE WITH REDIS AFTER GETTING DONE QUOTE COMMAND.
const postPostbyUser = (req, res) => {
    const { valueForQuill, title, category } = req.body
    console.log( valueForQuill, title)
    
    const sqlUser = 'SELECT username, postnumber FROM users where uid = ?';
    const sqlInsertReply = 'INSERT INTO replies SET ?';
    const sqlUpdatePostNumber = 'UPDATE users SET postnumber = ? WHERE uid = ?';
    
    // const sqlusernameofuid = pool.query(sqlUser, [req.session.passport.user]);
    // console.log(sqlusernameofuid);

    try {
        pool.query(sqlInsertReply, {reply_username: req.user.username, reply_content: valueForQuill,reply_category: category, reply_post: title, reply_date: new Date()}, (err, rows) => {
            if(rows) {
                console.log(req.user.postnumber)


                NumberofPostPerUserFunction(req);

                return res.status(200).json({success: true});


            } else {
                console.log(err);
            }

        })
    
    } catch (err) {
        
    }
           

    // pool.query('INSERT INTO replies SET ?', {reply_username: user, reply_content: text,reply_category: category, reply_post: title, reply_date: new Date().toISOString()}, (err, rows) => {
    //     if(rows) {
    //         pool.query('select postnumber from users where username = ?', user, (err, result) => {
    //             console.log(result);
    //             if(result) {
    //                 const [ {postnumber} ] = result;
    //                 const number_post = parseInt(postnumber);
    //                 console.log(number_post);
    //                 const update_posts = number_post + 1;
    //                 console.log('fasfas', update_posts)
                    
    //                 pool.query('update users set postnumber = ? where username = ?', [update_posts, user], (err, results) => {
    //                     if(results) {
    //                         console.log('moze')
    //                     } else {
    //                         console.log(err);
    //                     }
    //                 })
    //             } else {
    //                 console.log(err);
    //             }
    //         })
    //         res.json(rows.insertId)
    //     } else {
    //         console.log(err);
    //     }
    // })
}

const postTopicbyUser = (req, res) => {
    
    const { username, descriptionValue, titleValue, category } = req.body
    const sqlUser = 'SELECT username from users where uid = ?';
    const sqlCheckisTopicAvailable = 'SELECT posttitle FROM posts WHERE posttitle = ?';
    const sqlInsertTopic = 'INSERT INTO posts SET ?'; 
    const sqlInsertReply = 'INSERT INTO replies SET ?';
    const sqlUpdatePostNumber = 'UPDATE users SET postnumber = ? WHERE uid = ?';
    const sql6 = 'select * from posts as p, categories as c WHERE p.category = c.title AND c.title = ?'

    const sqlusernameofuid = pool.query(sqlUser, [req.session.passport.user]);

    try {
        pool.query(sqlCheckisTopicAvailable, [titleValue], (err, results) => {
            if(results.length > 0) {
                res.status(403).json({ message: 'Post already exists'})
            } else {
                pool.query(sqlUser, [req.session.passport.user], (err, result) => {
                    console.log(result);
            
                    if(result) {
                        pool.query(sqlInsertTopic, {postusername: result[0].username, category: category, posttitle: titleValue, content: descriptionValue, postdate: new Date().toISOString()}, (err, rows) => {
                            if(rows) {
                                pool.query(sqlInsertReply, {reply_username: result[0].username, reply_category: category, reply_content: descriptionValue, reply_post: titleValue, reply_date: new Date()}, async(err, resultsofinsert) => {
                                    if(resultsofinsert) {
                                        // pool.query(sql6, [category], async(err, resultOfQuery) => {
                                        //     if(resultOfQuery) {
                                        //         NumberofPostPerUserFunction(req);
                                                
                                           
    
                                        //         await redisClient.set(`/postsPerCategory/${category}`, JSON.stringify(resultOfQuery))                          
        
            
                                        //         return res.status(200).json({ success: true })
                                        //     } else {
                                        //         console.log(err);
                                        //     }
                                            

                                        // }) 
                                        NumberofPostPerUserFunction(req);
                                                
                                           
    
                                                await redisClient.del(`/postsPerCategory/${category}`, titleValue)                          
        
            
                                                return res.status(200).json({ success: true })
    
                                       
                                    } else {
                                        console.log(err);
                                    }
                                })
                            } else {
                                console.log(err);
                            }
                            
                        } )
                    } else {
                        console.log(err);
                    }
                    
                })
            }
        })
    } catch (err) {
        
    }

    
    
    // pool.query('INSERT INTO posts SET ? ', {postusername: username, category: category, posttitle: titleValue, content: descriptionValue, postdate: new Date().toISOString()}, (err, result ) => {
    //     if(result) {
    //         pool.query('INSERT INTO replies SET ?', {reply_username: username, reply_content: descriptionValue, reply_post: titleValue, reply_date: new Date().toISOString()}, (err, rows) => {
    //             if(rows) {
    //                 res.json({ message: 'good'})
    //             } else {
    //                 console.log(err);
    //             }
    //         } )
    //     } else {
    //         console.log(err);
    //     }
    // })

}

const getTopicbyReplyid = (req, res) => {
    
    const { replyid } = req.body;
    
    const sql = 'SELECT * FROM replies WHERE replyid = ?'
    try {
        pool.query(sql, [req.params.replyid], (err, result) => {
            if(result.length > 0) {
                return res.status(201).json(result)
            } else {
                return res.status(401).json({ message: 'That reply does not exist'})
            }
        })
    } catch (err) {
        console.log(err);
    }
    

}

const updateReplyPost = (req, res) => {
    
    const { desc, replyid} = req.body;
    
    const sql = 'UPDATE replies SET reply_content = ? WHERE replyid = ?';

    const sqlInsert = 'INSERT INTO overwatchposts SET ?';
    const sql3 = 'SELECT * FROM replies WHERE replyid = ?';

    const sql2 = 'UPDATE replies SET e_whoedited = ?, e_hwtedited = ?, e_date = ? WHERE replyid = ?';
console.log(desc, replyid)

    try {
        pool.query(sql3, [replyid], (err, resultOfQuery) => {
            if(resultOfQuery.length > 0) {
                pool.query(sql, [desc, replyid], (err, result) => {
                    if(result) {
                        const resultOfEdits = resultOfQuery[0].e_hwtedited + 1;
                        const whoEdited = req.user.username;
                        const timeOfEdit = new Date();
             
                            pool.query(sql2, [whoEdited, resultOfEdits, timeOfEdit, replyid], (err, resultOfUpdate) => {
                                if(resultOfUpdate) {
                                    insertIntoOverwatchuposts(req.user.username, replyid, `Updated reply, reply id = ${replyid}`)
        
                                    console.log('uradjeno')
                
                                    return res.status(201).json({ success: true });
                                } else {
                                    console.log(err);
                                }
                            } )
        
                       
            
                    } else {
                        console.log(err);
                    }
                })
            } else {
                return res.status(500).json({ message: "That reply doesn't exist"})
            }
        })
            
    } catch (err) {
        
    }
    
}

const lockTheThread = (req, res) => {
    const canUserAccess = req.user.Administrator === 1 || req.user.HeadAdmin === 1 || req.user.Director === 1 || req.user.CommunityManager === 1 || req.user.Admin === 1;

    if(canUserAccess) {
        const { title } = req.body;
        console.log(title);
        console.log('ulazim')
        const sql1 = 'UPDATE posts SET isLocked = 1 WHERE posttitle = ?';

        const sqlInsert = 'INSERT INTO overwatchposts SET ?';



        try {
            pool.query(sql1, [title], (err, result) => {
                if(result) {

                    insertIntoOverwatchuposts(req.user.username, title, `Locked thread, post title: ${title} `)




                    return res.status(201).json({ message: 'works'})
                } else {
                    console.log(err);
                }
            })
        } catch (err) {
            console.log(err);
        }
        
    } else {
        res.sendStatus(401);
    }

    
}

const unLockTheThread = (req, res) => {
    const canUserAccess = req.user.Administrator === 1 || req.user.HeadAdmin === 1 || req.user.Director === 1 || req.user.CommunityManager === 1 || req.user.Admin === 1;

    if(canUserAccess) {
        const { title } = req.body;
        console.log(title);
        console.log('ulazim')
        const sql1 = 'UPDATE posts SET isLocked = 0 WHERE posttitle = ?';

        const sqlInsert = 'INSERT INTO overwatchposts SET ?';

        try {
            pool.query(sql1, [title], (err, result) => {
                if(result) {

                    insertIntoOverwatchuposts(req.user.username, title, `Unlocked thread, post title: ${title} `)


                    
                    return res.status(201).json({ message: 'works'})
                } else {
                    console.log(err);
                }
            })
        } catch (err) {
            
        }
        
    } else {
        res.sendStatus(401);
    }

    
}


const isLockedPost = (req, res) => {

    const sql = 'SELECT isLocked FROM posts WHERE posttitle = ?';

  try {
    pool.query(sql, [req.params.title], (err, result) => {
        if(result) {
            return res.status(200).json(result[0])
        } else {
            console.log(err);
        }
    })
    } catch (err) {
        
    }
    


}

const getPostsPerSubCategory = async(req, res) => {
    const { category } = req.body
    const sql1 = 'SELECT cid FROM categories WHERE title = ?';
    const sql2 = 'SELECT subid FROM subcategories WHERE idcategory = ? and subtitle = ?';
    const sql3 = 'SELECT * FROM posts WHERE idsubcategory = ?'

    // console.log(req.params)

    const paramsOfCategory = req.params.category;
    const paramsOfSubCategory = req.params.subtitle

    try {
        const result = await redisClient.get(`/getPostsPerSubCategory/${paramsOfSubCategory}`)
        if(result) {
            res.status(200).json(JSON.parse(result))
        } else {
            pool.query(sql1, [req.params.category], (err, result) => {
                if(result.length > 0) {
                    const { cid } = result[0];
                    console.log('cid', cid)
                    pool.query(sql2, [cid, req.params.subtitle], (err, rows) => {
                        if(rows.length > 0) {
                            const { subid } = rows[0];
                            pool.query(sql3, [subid] , async(err, results) => {
                                if(results) {
                                
                                    await redisClient.set(`/getPostsPerSubCategory/${paramsOfSubCategory}`, JSON.stringify(results))
                                    
                                    return res.status(201).json(results);
                                } else {
                                    console.log(err);
                                }
                            })
                        } else {
                            res.status(401).json({ message: "That subforum doesn't exist"})
                        }
                    })
                } else {
                    res.status(401).json({ message: "That category doesn't exist"})
                }
            })
        }
    } catch (error) {
        res.status(401);
    }


    // try {
    //     pool.query(sql1, [req.params.category], (err, result) => {
    //         if(result.length > 0) {
    //             const { cid } = result[0];
    //             console.log('cid', cid)
    //             pool.query(sql2, [cid, req.params.subtitle], (err, rows) => {
    //                 if(rows.length > 0) {
    //                     const { subid } = rows[0];
    //                     pool.query(sql3, [subid] ,(err, results) => {
    //                         if(results) {
    //                             console.log(results)
    //                             return res.status(201).json(results);
    //                         } else {
    //                             console.log(err);
    //                         }
    //                     })
    //                 } else {
    //                     res.status(401).json({ message: "That subforum doesn't exist"})
    //                 }
    //             })
    //         } else {
    //             res.status(401).json({ message: "That category doesn't exist"})
    //         }
    //     })
    // } catch (err) {
        
    // }

    



}
const getCategoriesandSubcategories = (req, res) => {

    const sql = 'select cid, title from categories';
    const sql2 = 'select subid, subtitle, idcategory from subcategories inner join categories where subcategories.idcategory = categories.cid'
    const sql3 = 'select cid, title, subid, subtitle from categories, subcategories wHERE categories.cid = subcategories.idcategory';
    
    
    
    
    try {
        pool.query(sql, (err, result) => {
            if(result) {

                return res.status(200).json(result)
    
            } else  {
                console.log(err);
            }
        })
    } catch (err) {
        
    }
    

}

const getSubCategories = async(req, res) => {
    const sql = 'select cid, title, subid, subtitle from categories, subcategories wHERE categories.cid = subcategories.idcategory';

    try {
        const result = await redisClient.get(`/subCategoriesPerCategory`)
    } catch (error) {

    }

    try {
        pool.query(sql, (err, rows) => {
            if(rows) {
               return res.status(200).json(rows);
            } else {
                console.log(err);
            }
        })
    } catch (err) {
        
    }
    

}
 


const moveTopicToAnotherCategory = (req, res) => {

    const { currentvalue, title, category } = req.body

    const sql = 'UPDATE posts SET category = ? WHERE posttitle = ?';

    const sqlInsert = 'INSERT INTO overwatchposts SET ?';

    const sql1 = 'select * from posts as p, categories as c WHERE p.category = c.title AND c.title = ?'
    
    let paramsOfCategory = req.params.category;

    // ehsahs

    console.log('category', category);

    try {
        pool.query(sql, [currentvalue, title], (err, result) => {
            if(result) {
                pool.query(sql1, [currentvalue], async(err, resultOfQuery) => {
                    if(resultOfQuery) {
                        console.log('res', resultOfQuery)
                

                        await redisClient.set(`/postsPerCategory/${currentvalue}`, JSON.stringify(resultOfQuery))
                        await redisClient.del(`/postsPerCategory/${category}`);

                        insertIntoOverwatchuposts(req.user.username, title, `Moved topic to category, category: ${currentvalue}, post title: ${title} `)


                        return res.status(200).json({ success: true })
                    } else {
                        console.log(err);
                    }
                })

                
            }else {
                console.log(err);
            }
        })
    } catch (err) {
        
    }
    


}

const movePostToSubForum = (req, res) => {
    const { splitted, title, acabeheh, subtitle } = req.body
    
    console.log('acab', acabeheh);
    const sql = 'UPDATE posts SET idsubcategory = ? WHERE posttitle = ?';
    const sql1 = 'SELECT subid, idcategory FROM subcategories WHERE subtitle = ?';
    const sql2 = 'SELECT title from categories where cid = ?'
    const sql3 = 'UPDATE posts SET category = ? WHERE posttitle = ?'

    const sql4 = 'SELECT * FROM posts WHERE idsubcategory = ?'
    const sqlInsert = 'INSERT INTO overwatchposts SET ?';


    try {
        pool.query(sql1, [splitted], (err, result) => {
            console.log('rezultati', result);
            if(result.length > 0) {
                pool.query(sql, [result[0].subid, title], (err, rows) => {
                    if(rows) {
                        pool.query(sql2, [result[0].idcategory], (err, results) => {
                            console.log('AAAAAAAAAAAAAAAA', result[0].subid)
                            if(results) {
                                console.log(results);
                                pool.query(sql3, [results[0].title, title], (err, rows) => {
                                    if(rows) {
                                        pool.query(sql4, [result[0].subid],async (err, resultOfQuery) => {
                                            if(resultOfQuery) {
                                                insertIntoOverwatchuposts(req.user.username, title, `Moved post to subforum, subforum title: ${splitted}, post title: ${title}`)
                                        
                                                await redisClient.set(`/getPostsPerSubCategory/${splitted}`, JSON.stringify(resultOfQuery))
                                                // `/getPostsPerSubCategory/${paramsOfCategory}`
                                                await redisClient.del(`/postsPerCategory/${acabeheh}`)
                                                if(subtitle !== undefined) {
                                                    await redisClient.del(`/getPostsPerSubCategory/${subtitle}`)
                                                }

                                                return res.status(200).json(results[0].title)
                                            }
                                        })

                                        
                                    } else {
                                        console.log(err);
                                    }
                                })
                            } else {
                                console.log(err);
                            }
                        })
    
                    } else {
                        console.log(err)
                    }
                })
            } else {
                res.status(401).json({ message: "That subforum doesn't exist"})
                console.log(err);
            }
        })
    } catch (err) {
        
    }
    // uzmi idcategory i nadji kategoriju po tom imenu i updejtuj kategoriju posta kog updejtujes trenutno
    console.log(splitted, title)
    
}

const selectThemePerCategory = async(req, res) => {
    const sql = 'SELECT * FROM themes WHERE theme_category = ?';

    const paramsOfCategory = req.params.category

    try {
        const resultOfRedis = await redisClient.get(`/themesPerCategory/${paramsOfCategory}`)

        if(resultOfRedis) {
            res.status(200).json(JSON.parse(resultOfRedis))
        } else {
            pool.query(sql, [paramsOfCategory], async(err, result) => {
                if(result) {

                    await redisClient.set(`/themesPerCategory/${paramsOfCategory}`, JSON.stringify(result))

                    return res.status(200).json(result);
        
                } else {
                    console.log(err);
                }
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500);

    }
    // try {
        
    // } catch (err) {
        
    // }

    
}
const getPostsPerTheme = async(req, res) => {
    const sql = 'SELECT * FROM themeposts WHERE theme_postcategory = ?';

    const paramsOfCategory = req.params.category

    try {
        const resultOfRedis = await redisClient.get(`/postsPerTheme/${paramsOfCategory}`);
        if(resultOfRedis) {
            res.status(200).json(JSON.parse(resultOfRedis));

        } else {
            pool.query(sql, [paramsOfCategory], async(err, rows) => {
                if(rows) {

                    await redisClient.set(`/postsPerTheme/${paramsOfCategory}`, JSON.stringify(rows))

                    return res.status(200).json(rows);
                } else {
                    console.log(err);
                }
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500);
    }

   
    
}


const getPostRepliesPerTheme = async(req, res) => {

    const sql = 'select theme_replyid, theme_replyusername, theme_name, theme_category, theme_title, theme_content, theme_userip, theme_date, theme_postusername, theme_postcategory, username, postnumber, image from themereplies inner join themeposts on themereplies.theme_title = themeposts.theme_posttitle inner join users on themereplies.theme_replyusername = users.username where themereplies.theme_title = ?'
    
    const paramsOfTheme = req.params.posttitle;
    try {
        // const resultOfRedis = await redisClient.get(`/repliesPerTheme/${paramsOfTheme}`);
        // if(resultOfRedis) {
        //     res.status(200).json(JSON.parse(resultOfRedis));

        // } else {
            pool.query(sql, [paramsOfTheme], async(err, rows) => {
                if(rows) {

                    // await redisClient.set(`/repliesPerTheme/${paramsOfTheme}`, JSON.stringify(rows));


                    return res.status(200).json(rows);
                } else {
                    console.log(err);
                }
            })
        // }
        
    } catch (error) {
        res.status(500);
    }
    
    
    // try {
    //     pool.query(sql, [req.params.posttitle], (err, rows) => {
    //         if(rows) {
    //             return res.status(200).json(rows);
    //         } else {
    //             console.log(err);
    //         }
    //     })
    // } catch (err) {
        
    // }
    

}

const postSubForumPerCategory = (req, res) => {
    const { category, TitleOfSubForum, SubDescription } = req.body

    let ipAddress = req.header('x-forwarded-for') || req.connection.remoteAddress;

    const sql1 = 'SELECT cid FROM categories WHERE title = ?';
    const sql2 = 'INSERT INTO subcategories SET ?';
    const sql = 'select * from subcategories, categories WHERE subcategories.idcategory = categories.cid and categories.title = ?'
    const sql3 = 'SELECT subtitle FROM subcategories WHERE subtitle = ?';



    const sqlInsert = 'INSERT INTO overwatchposts SET ?';

    // /subCategoriesPerCategory/${paramsOfCategory}
    try {
        
        pool.query(sql3, [TitleOfSubForum], (err, resultOfCheck) => {
            if(resultOfCheck.length > 0) {
                res.status(409).json({ message: 'Already exists'})
            } else {
                pool.query(sql1, [category], (err, result) => {
                    if(result) {
        
                        pool.query(sql2,{ idcategory: result[0].cid, subtitle: TitleOfSubForum, subdescription: SubDescription, subuser: req.user.username, sub_userip: ipAddress, subdate: new Date()}, (err, rows) => {
                            if(rows.affectedRows > 0) {
                                pool.query(sql, [category], async(err, resultOfQuery) => {
        
                                    insertIntoOverwatchuposts(req.user.username, TitleOfSubForum, `SubForum added, category: ${category}, title of subforum: ${TitleOfSubForum}`)
        
                                    await redisClient.set(`/subCategoriesPerCategory/${category}`, JSON.stringify(resultOfQuery));
        
        
                                    return res.status(200).json({ success: true})
                                })
                                
                                
                            } else {
                                console.log(err);
                            }
                        })
                    } else {
                        console.log(err);
                    }
                })
            }
        })

    } catch (err) {
        
    }
    

}



const addThemeForumPerCategory = (req, res) => {

    const {TitleofTheme, PostForTheme, markup, category} = req.body
    
    let ipAddress = req.header('x-forwarded-for') || req.connection.remoteAddress;


    const sql4 = 'SELECT * FROM themeposts WHERE theme_postcategory = ?';

    const paramsOfCategory = req.params.category


    
    const sql1 = 'INSERT INTO themes SET ?'
    const sql2 = 'INSERT INTO themeposts SET ?';
    const sql3 = 'INSERT INTO themereplies SET ?';
    const sql5 = 'SELECT theme_name FROM themes WHERe theme_name = ?';
    const sql6 = 'SELECT theme_posttitle FROM themeposts WHERE theme_posttitle = ?';
    const sqlInsert = 'INSERT INTO overwatchposts SET ?';

    const sql = 'SELECT * FROM themes WHERE theme_category = ?';


    try {
        
        pool.query(sql5, [TitleofTheme], (err, resultOfQueryCheck) => {
            if(resultOfQueryCheck.length > 0) {
                return res.status(422).json({ message: 'Theme under that name already exists '})
            } else {
                pool.query(sql1, {theme_name: TitleofTheme,theme_category: category, theme_user: req.user.username, theme_user_ip: ipAddress}, (err, result) => {
                    if(result.affectedRows > 0) {
                        pool.query(sql6, [PostForTheme], (err, resultOfSecondCheck) => {
                            if(resultOfSecondCheck.length > 0) {
                                return res.status(422).json({ message: 'Post under that name already exists'})
                            } else {
                                pool.query(sql2, {theme_postusername: req.user.username, theme_postcategory: category, theme_name: TitleofTheme, theme_posttitle: PostForTheme, theme_ipuser: ipAddress, theme_postdate: new Date()}, (err, rows) => {
                                    if(rows.affectedRows > 0) {
                                        pool.query(sql3, {theme_replyusername: req.user.username, theme_postname: TitleofTheme, theme_category: category, theme_title: PostForTheme, theme_content: markup, theme_userip: ipAddress, theme_date: new Date()}, (err, results) => {
                                            if(results.affectedRows > 0) {
                                                pool.query(sql, [category], async(err, resultOfQuery) => {
                                                    if(resultOfQuery) {
                                                        pool.query(sql4, [category], async(err, resultOfSecondQuery) => {
                                                            if(resultOfSecondQuery) {
                
                                                                await redisClient.set(`/postsPerTheme/${category}`, JSON.stringify(resultOfSecondQuery));
                
                                                                await redisClient.set(`/themesPerCategory/${category}`, JSON.stringify(resultOfQuery));
                
                
                                                                insertIntoOverwatchuposts(req.user.username, PostForTheme, `Added theme per category, category: ${category}, theme title: ${PostForTheme}, theme name: ${TitleofTheme}`)
                                                        
                                                                return res.status(200).json({ success: true})
                                                            }
                                                        })
                                                        
                                                        
                                                        
                                                        
                                                    }
                                                })
                                                
                                               
                                            } else {
                                                console.log(err);
                                            }
                                        })
                                    } else {
                                        console.log(err);
                                    }
                                })
                            }
                        })
                    } else {
                        console.log(err);
                    }
                })
            }
        })
        
    } catch (err) {
        
    }
    



}
const getThemesPerCategory = async(req, res) => {


    const sql1 = 'SELECT theme_name FROM themes WHERE theme_category = ?';
    try {
        pool.query(sql1, [req.params.category], (err, result) => {
            if(result) {
                return res.json(result);
            } else {
                console.log(err);
            }
        })
    } catch (err) {
        
    }
    

}


const addPostPerTheme = (req, res) => {

    let ipAddress = req.header('x-forwarded-for') || req.connection.remoteAddress;


    const { category, addPostName, currentSelectedTheme, markup } = req.body
    
    const sql1 = 'INSERT INTO themeposts SET ?';
    const sql2 = 'INSERt INTO themereplies SET ?';


    const sqlInsert = 'INSERT INTO overwatchposts SET ?';

    const sql = 'SELECT * FROM themeposts WHERE theme_postcategory = ?';



    try {
        pool.query(sql1, {theme_postusername: req.user.username, theme_postcategory: category, theme_name: currentSelectedTheme, theme_posttitle: addPostName, theme_ipuser: ipAddress, theme_postdate: new Date()}, (err, result) => {
            if(result.affectedRows > 0) {
                pool.query(sql2, {theme_replyusername: req.user.username, theme_postname: currentSelectedTheme, theme_category: category, theme_title: addPostName, theme_content: markup, theme_userip: ipAddress, theme_date: new Date()}, (err, rows) => {
                    if(rows) {
                        pool.query(sql, [category], async(err, resultOfQuery) => {
                            if(resultOfQuery.length > 0) {

                                await redisClient.set(`/postsPerTheme/${category}`, JSON.stringify(resultOfQuery));

                                insertIntoOverwatchuposts(req.user.username, currentSelectedTheme, `Added post per theme, category: ${category}`)

                                return res.status(200).json({ success: true})
                            }
                        })
                        
                    } else {
                        console.log(err);
                    }
                })
            } else {
                console.log(err);
            }
        })
    
    } catch (err) {
        
    }
    
}

const deleteThemeReply = (req, res) => {

    const { theme_replyid, posttitle, theme_name } = req.body;
    console.log(theme_replyid, posttitle)
    const sql = 'DELETE FROM themereplies WHERE theme_replyid = ?';
    const sql2 = 'select theme_replyid, theme_replyusername, theme_name, theme_category, theme_title, theme_content, theme_userip, theme_date, theme_postusername, theme_postcategory, username, postnumber, image from themereplies inner join themeposts on themereplies.theme_title = themeposts.theme_posttitle inner join users on themereplies.theme_replyusername = users.username where themereplies.theme_title = ?'
    const sql3 = 'DELETE FROM themeposts WHERE theme_posttitle = ?'
    const sql4 = 'SELECT theme_posttitle FROM themeposts WHERE theme_name = ?';
    const sql5 = 'DELETE FROM themes WHERE theme_name = ?';
    try {
        pool.query(sql, [theme_replyid], (err, resultOfDelete) => {
            if(resultOfDelete) {
                pool.query(sql2, [posttitle], (err, resultOfQueryCheck) => {
                    if(resultOfQueryCheck.length === 0) {
                        pool.query(sql3, [posttitle], (err, resultOfSecondDelete) => {
                            if(resultOfSecondDelete) {
                                pool.query(sql4, [theme_name], (err, resultOfThirdCheck) => {
                                    console.log(resultOfThirdCheck)
                                    if(resultOfThirdCheck.length === 0) {
                                        pool.query(sql5, [theme_name], (err, resultOfThirdDelete) => {
                                            if(resultOfThirdDelete) {
                                                console.log('OVDE USAO ACAB')
                                                insertIntoOverwatchuposts(req.user.username, posttitle, `Deleted reply, there wasn't any posts in current theme so theme is auto-deleted ${posttitle}`)

                                                return res.status(200).json({ message: 'Navigate'})
                                            } else {
                                                console.log('arrrrrrr', err);
                                            }
                                        })
                                    } else {
                                        insertIntoOverwatchuposts(req.user.username, posttitle, `Deleted reply, theme is deleted because zero replies ${posttitle}`)

                                        return res.status(200).json({ message: 'Navigate'})
                                    }
                                })
                            } else {
                                console.log('errrrrrrrrrrrr',err)
                            }
                        })
                    } else {
                        insertIntoOverwatchuposts(req.user.username, posttitle, `Deleted reply, many replies left ${posttitle}`)

                        return res.status(200).json({ success: true })
                    }
                } )
            } else {
                console.log('errrrar', err)
            }
        })
    } catch (error) {

    }
    
}

const updateReplyThemeContent = (req, res) => {

    const {editThemeReplyid, valueForQuill} = req.body;
    const sql = 'UPDATE themereplies SET theme_content = ? WHERE theme_replyid = ?';

    try {
        pool.query(sql, [valueForQuill, editThemeReplyid], (err, resultOfUpdate) => {
            if(resultOfUpdate) {
                insertIntoOverwatchuposts(req.user.username, editThemeReplyid, `Updated reply`)

                return res.status(200).json({ success: true})
            } else {
                console.log(err);
            }
        })
    } catch (error) {
        console.log(error);
    }

}

const deleteTheme = (req, res) => {

    const { category, themeName } = req.body

    console.log(category, themeName)
    const sql = 'DELETE FROM themes WHERE theme_name = ? and theme_category = ?';
    const sql1 = 'DELETE FROM themeposts WHERE theme_postcategory = ? and theme_name = ?';
    const sql2 = 'DELETE FROM themereplies WHERE theme_postname = ? and theme_category = ?';
    const sql3 = 'SELECT * FROM themes WHERE theme_category = ?';

    const sqlInsert = 'INSERT INTO overwatchposts SET ?';



    try {
        pool.query(sql, [themeName, category], (err, result) => {
            if(result) {
                pool.query(sql1, [category, themeName], (err, rows) => {
                    if(rows) {
                        pool.query(sql2, [category, themeName], async(err, results) => {
                            if(results) {
                                // pool.query(sql3, [category], async(err, resultOfQuery) => {
                                //     if(resultOfQuery) {
                                //         await redisClient.set(`/themesPerCategory/${category}`, JSON.stringify(resultOfQuery))

                                //         insertIntoOverwatchuposts(req.user.username, themeName, `Removed theme, category: ${category}`)

                                //         return res.status(200).json({ success: true})
                                //     } else {
                                //         console.log(err);
                                //     }
                                // })
                                    await redisClient.del(`/themesPerCategory/${category}`)

                                        insertIntoOverwatchuposts(req.user.username, themeName, `Removed theme, category: ${category}`)

                                        return res.status(200).json({ success: true})
                                
                                
                            } else {
                                console.log(err);
                            }
                        })
                    } else {
                        console.log(err);
                    }
                })
            } else {
                console.log(err);
            }
        })
    } catch (err) {
        
    }
    


}

const deleteSubForum = (req, res) => {

    const { id, category } = req.body;
    console.log(category);
    const sql1 = 'DELETE FROM subcategories WHERE subid = ?';
    const sql2 = 'DELETE FROM posts WHERE idsubcategory = ?';
    const sql3 = 'SELECT posttitle FROM posts WHERE idsubcategory = ?';
    const sql4 = 'DELETE FROM replies WHERE reply_post = ?';

    const sql5 = 'select * from subcategories, categories WHERE subcategories.idcategory = categories.cid and categories.title = ?'

    // `/subCategoriesPerCategory/${paramsOfCategory}`

    try {
        pool.query(sql3, [id], (err, result) => {
            console.log(result);
            console.log('acabbbbbbbbbfasfasfasfasfsafasfsab')

            if(result.length > 0) {
                console.log('acabbbbbbbbbbfaaaaaaaaaa')

                pool.query(sql2, [id], (err, rows) => {
                    if(rows) {
                        console.log('dasdsada')

                        pool.query(sql4, [result[0].posttitle], (err, results) => {
                            if(results) {
                                pool.query(sql1, [id], async(err, resultOfDelete) => {
                                    console.log('acabbbbbbbbbb')
                                    if(resultOfDelete) {
                                        console.log('acaggggggg')

                                        // pool.query(sql5, [category], async(err, resultOfQuery) => {
                                        //     console.log('TEST', resultOfQuery)
                                        //     if(resultOfQuery.length > 0 ) {
                                        //         console.log('ovde ulazim', resultOfQuery);


                                        //         await redisClient.del(`/postsPerCategory/${category}`, id)                          


                                        //         // await redisClient.set(`/subCategoriesPerCategory/${category}`, JSON.stringify(resultOfQuery))

                                        //         const titleOfThis = result[0].posttitle
                                        //         insertIntoOverwatchuposts(req.user.username, titleOfThis, `Removed subforum`)
                                        //         return res.status(200).json({ success: true})

                                        //     } else if(resultOfQuery.length === 0) {
                                        //         console.log('drugi ulazim')

                                        //         await redisClient.set(`/subCategoriesPerCategory/${category}`, JSON.stringify([]))
                                        //         const titleOfThis = result[0].posttitle

                                        //         insertIntoOverwatchuposts(req.user.username, titleOfThis, `Removed subforum`)
                                        //         return res.status(200).json({ success: true})

                                        //     } else {
                                        //         console.log(err);
                                        //     }
                                        // })



                                                // await redisClient.set(`/subCategoriesPerCategory/${category}`, JSON.stringify(resultOfQuery))
                                                await redisClient.del(`/subCategoriesPerCategory/${category}`)

                                                const titleOfThis = result[0].posttitle
                                                insertIntoOverwatchuposts(req.user.username, titleOfThis, `Removed subforum`)
                                                return res.status(200).json({ success: true})


                                        
                                    } else {
                                        console.log(err);
                                    }
                                })
                            } else {
                                console.log(err)
                            }
                        })
                    } else {    
                        console.log(err);
                    }
                })
            } else {
                // ne postoji nijedan POST u subforumu, obrisi samo subforum iz subcategories
                pool.query(sql1, [id],async (err, results) => {
                    if(results) {
                                await redisClient.del(`/subCategoriesPerCategory/${category}`)
                        const titleOfThis = "There wasn't any post in this suboforum"
                                insertIntoOverwatchuposts(req.user.username, titleOfThis, `Removed subforum`)
                                return res.status(200).json({ success: true})
                        // pool.query(sql5, [category], async(err, resultOfQuery) => {
                        //     console.log('TEST', resultOfQuery)
                        //     if(resultOfQuery.length > 0 ) {
                        //         console.log('ovde ulazim', resultOfQuery);

                        //         await redisClient.set(`/subCategoriesPerCategory/${category}`, JSON.stringify(resultOfQuery))
                        //         const titleOfThis = "There wasn't any post in this suboforum"
                        //         insertIntoOverwatchuposts(req.user.username, titleOfThis, `Removed subforum`)
                        //         return res.status(200).json({ success: true})

                        //     } else if(resultOfQuery.length === 0) {
                        //         console.log('drugi ulazim')

                        //         await redisClient.set(`/subCategoriesPerCategory/${category}`, JSON.stringify([]))
                        //         const titleOfThis = "There wasn't any post in this suboforum"

                        //         insertIntoOverwatchuposts(req.user.username, titleOfThis, `Removed subforum`)
                        //         return res.status(200).json({ success: true})

                        //     } else {
                        //         console.log(err);
                        //     }
                        // })
                    } else {
                        console.log(err);
                    }
                })
            }
        })
    } catch (err) {
        
    }

    

    


}

const getLastTwentyMessages = (req, res) => {
    const sql = 'SELECT * FROM (SELECT * FROM messages ORDER BY messagesid DESC LIMIT 20)Var1 ORDER BY messagesid ASC'
    try    {
        pool.query(sql, (err, result) => {
            if(result) {
                return res.json(result)
            } else {
                console.log(err)
            }
        })
    } catch (err) {
        
    }
    
}

const addPinnedThemesPerSubCategory = (req, res) => {
    let ipAddress = req.header('x-forwarded-for') || req.connection.remoteAddress;

    const { namePinned, textPinned, subtitle } = req.body
    const sql = 'INSERT INTO pinnedthemes SET ?';
    const sql2 = 'INSERT INTO pinnedthemes_replies SET ?';
    const sql3 = 'SELECT pinned_title FROM pinnedthemes WHERE pinned_title = ?';
    // try {
    //     const valueOfRedis = await redisClient.get
    // } catch (error) {

    // }

    try {
        
        pool.query(sql3, [namePinned], (err, resultOfCheck) => {
            if(resultOfCheck.length > 0) {
               return res.status(409).json({ message: 'Theme under that name already exists'})
            } else {
                pool.query(sql, {pinned_title: namePinned, pinned_username: req.user.username,	pinned_content: textPinned, pinned_subforum: subtitle, pinned_userip: ipAddress, pinned_date: new Date()}, (err, result) => {
                    if(result) {
                        pool.query(sql2, {pinnedtheme_pinned_title: namePinned, pinnedtheme_username: req.user.username, pinnedtheme_content: textPinned, pinnedtheme_userip: ipAddress, pinnedtheme_date: new Date()}, (err, resultOfInsert) => {
                            if(resultOfInsert) {
                                insertIntoOverwatchuposts(req.user.username, namePinned, `Added pinned theme`)
        
                                return res.status(200).json({ success: true})
                            }
                        })
                        
                        
                    }
                })
            }
        })

    } catch (err) {
        console.log(err)
    }
}

const getPinnedThemePerCategory = (req, res) => {
    const sql = 'SELECT pinned_id, pinned_title, pinned_username, pinned_content, pinned_subforum, pinned_date, image, postnumber FROM pinnedthemes INNER JOIN users ON pinned_username = users.username WHERE pinned_subforum = ?';

    


    try {
        pool.query(sql, [req.params.subtitle], (err, result) => {
            if(result) {
                console.log('OVO JE TO', result);
                return res.json(result);
            } else {
                console.log(err);
            }
        })
    } catch ( err ) {
        console.log(err)
    }
 }

 const getPinnedThemePerCategoryReplies =  (req, res) => {
    const sql = 'SELECT pinnedtheme_r_id, pinnedtheme_pinned_title, pinnedtheme_username, pinnedtheme_content, pinnedtheme_date, image, postnumber FROM pinnedthemes_replies INNER JOIN users ON pinnedtheme_username = users.username WHERE pinnedtheme_pinned_title = ?';
    
    console.log(req.params.subtitle)
    try {
        pool.query(sql, [req.params.subtitle], (err, result) => {
            if(result) {
               return res.status(200).json(result);   
            } else {
                console.log(err);
            }
        })
    } catch (error) {
        console.log('ulazim', error)
    }       

}

const addReplyInPinnedMessages = (req, res) => {

    let ipAddress = req.header('x-forwarded-for') || req.connection.remoteAddress;

    const { currentSelectedValue, alreadyTextPinned, subtitle } = req.body
    const sql = 'INSERT INTO pinnedthemes_replies SET ?';
    console.log(currentSelectedValue, alreadyTextPinned, subtitle)
    try {
        pool.query(sql, {pinnedtheme_pinned_title: currentSelectedValue, pinnedtheme_username: req.user.username,	pinnedtheme_content: alreadyTextPinned,  pinnedtheme_userip: ipAddress, pinnedtheme_date: new Date()}, (err, result) => {
            if(result) {
                console.log('usao')
                NumberofPostPerUserFunction(req);
                return res.status(200).json({ success: true})
            } else {
                console.log(err);
            }
        })
    } catch (err) {
        console.log(err)
    }


}

const deleteContentPerPinnedMessage = (req, res) => {

    const { pinnedtheme_r_id, pinnedtitle } = req.body;
    const sql = 'DELETE FROM pinnedthemes_replies WHERE pinnedtheme_r_id = ?'
    const sql2 = 'SELECT pinnedtheme_pinned_title FROM pinnedthemes_replies WHERE pinnedtheme_pinned_title = ?'
    const sql3 = 'DELETE FROM pinnedthemes WHERE pinned_title = ?';

    console.log(pinnedtheme_r_id);
    try {
        pool.query(sql, [pinnedtheme_r_id], (err, resultOfDelete) => {
            if(resultOfDelete) {
                pool.query(sql2, [pinnedtitle], (err, resultOfQuery) => {
                    if(resultOfQuery.length === 0) {
                        pool.query(sql3, [pinnedtitle], (err, resultOfSecondDelete) => {
                            if(resultOfSecondDelete.affectedRows > 0) {
                                console.log('nema vise')
                                return res.status(200).json({ message: 'Navigate'})
                            } 
                        })
                    } else {
                        console.log('ima jos')
                        return res.status(200).json({ success: true })
                    }
                })
            } else {
                console.log(err);
            }
        })
    } catch (error) {
        console.log(error);
    }
}

const insertPostInTheme =  (req, res) => {
    
    const { currentValueThemeNameToAdd, ThemeNameToAdd, category, valueForQuill } = req.body;

    console.log(currentValueThemeNameToAdd, ThemeNameToAdd, valueForQuill)

    const sql = 'INSERT INTO themereplies SET ?';
    const sql2 = 'select theme_replyid, theme_replyusername, theme_name, theme_category, theme_title, theme_content, theme_userip, theme_date, theme_postusername, theme_postcategory, username, postnumber, image from themereplies inner join themeposts on themereplies.theme_title = themeposts.theme_posttitle inner join users on themereplies.theme_replyusername = users.username where themereplies.theme_title = ?'

    let ipAddress = req.header('x-forwarded-for') || req.connection.remoteAddress;

    try {
        pool.query(sql, {theme_replyusername: req.user.username, theme_postname:ThemeNameToAdd,  theme_category: category, theme_title: currentValueThemeNameToAdd, theme_content: valueForQuill, theme_userip: ipAddress, theme_date: new Date()}, async(err, resultOfInsert) => {
            if(resultOfInsert) {
                pool.query(sql2, [currentValueThemeNameToAdd], async(err, resultOfQuery) => {
                    if(resultOfQuery.length > 0) {
                        console.log('errrrrrrrr',resultOfQuery);
                        await redisClient.set(`/repliesPerTheme/${currentValueThemeNameToAdd}`, JSON.stringify(resultOfQuery));
                        return res.status(200).json({ success: true })
                    } else {
                        console.log(err);
                    }

                })
                
            } else {
                console.log(err);
            }
        })
    } catch (error) {
        console.log(error);
    }
}

const deletePinnedTheme = (req, res) => {
    const sql = 'DELETE FROM pinnedthemes_replies WHERE pinnedtheme_pinned_title = ?';
    const sql2 = 'DELETE FROM pinnedthemes WHERE pinned_title = ?';

    const { pinTitle } = req.body;
    console.log('pin', pinTitle)
    try {
        pool.query(sql2, [pinTitle], (err, resultOfDelete) => {
            if(resultOfDelete.affectedRows > 0) {
                pool.query(sql, [pinTitle], (err, resultOfSecondDelete) => {
                    if(resultOfSecondDelete.affectedRows > 0) {
                       return res.status(200).json({ success: true })
                    } else {
                        console.log(err);
                    }
                })
            } else {
                console.log(err);
            }
        })
    } catch (error) {

    }

}

const getUsersPrivateMessages = (req, res) => {
    const sql = 'SELECT username, image FROM users';

    try {
        pool.query(sql, (error, result) => {
            if(result) {
                const resultInfo = result.filter((item) => item.username !== req.user.username)
                return res.status(200).json(resultInfo)
            } else {
                console.log(error);
            }
        })
    } catch (error) {
        console.log(error)
    }
}

const insertMessageRoom = (req, res) => {

    const { username, image } = req.body

    const sql = 'INSERT INTO messagerooms SET ?';

    try {

        pool.query(sql, {room_sender: req.user.username, room_receiver: username, room_receiverimage: image , room_senderimage: req.user.image, room_date: new Date()}, (err, result) => {
            if(result) {
                return res.status(200).json({ success: true})
            } else {
                console.log(err);
            }
        })

    } catch (error) {
        console.log(error);
    }
}

const getMessageRooms = (req, res) => {
    const sql = 'SELECT * FROM `messagerooms` WHERE room_sender = ? OR room_receiver = ?';
    
    const myself = req.user.username

    try {
        pool.query(sql, [myself, myself], (err, result) => {
            if(result) {
                return res.status(200).json(result);
            } else {
                console.log(err);
            }
        })
    } catch (error) {
        console.log(error);
    }



}

const getMessagesByRoomId = (req, res) => {

    const sql = 'SELECT * FROM messagesfromrooms WHERE roommessage_roomid = ?';
    console.log(req.params.roomid)
    try {
        pool.query(sql, [req.params.roomid], (err, result) => {
            if(result) {
                return res.status(200).json(result);
            } else {

                console.log(err)
            }
        })
    } catch (error) {
        console.log(error)
    }


}



const getLatestPosts = (req, res) => {
    // const sql = 'select * from replies INNER JOIN posts ON replies.reply_post = posts.posttitle where replies.reply_date > now() - interval 10 minute';

    const sql1 = 'select * from replies INNER JOIN posts ON replies.reply_post = posts.posttitle where replies.reply_date > now() - interval 10 minute GROUP BY posts.posttitle HAVING COUNT(*) > 0';

    try {
        pool.query(sql1, (err, result) => {
            if(result) {
                console.log('ulazim')
                return res.status(200).json(result);
            } else {
                console.log('err',err);
            }
        })
    } catch (error) {
        console.log('err', error)
    }
}

const deleteReplyByAdmin = (req, res) => {
    const canUserAccess = req.user.Administrator === 1 || req.user.HeadAdmin === 1 || req.user.Director === 1 || req.user.CommunityManager === 1 || req.user.Admin === 1;

    if(canUserAccess) {
        const { replyid } = req.body;

    const sql = 'DELETE FROM replies WHERE replyid = ?';


    try {
        pool.query(sql, [replyid], (err, result) => {
            if(result.affectedRows > 0) {

                insertIntoOverwatchuposts(req.user.username, replyid, `Delete reply by an admin`)

                return res.status(200).json({ success: true})
            } else {
                res.status(500);
            }
        })
        

    } catch (error) {
        res.status(500);

    }
    } else {
        res.sendStatus(401);
    }
    
}
const deletePostByAdmin = (req, res) => {

    const canUserAccess = req.user.Administrator === 1 || req.user.HeadAdmin === 1 || req.user.Director === 1 || req.user.CommunityManager === 1 || req.user.Admin === 1;

    if(canUserAccess) {
        
        const { id, PostCategory, PostTitle } = req.body;
        console.log(id, PostTitle, PostCategory)
        const sql = 'DELETE FROM posts WHERE postid = ?';
        const sql2 = 'DELETE FROM replies WHERE reply_post = ?';
        const sql3 = 'select * from posts as p, categories as c WHERE p.category = c.title AND c.title = ?'

        
        try {
            pool.query(sql, [id], (err, resultInfo) => {
                if(resultInfo.affectedRows > 0) {
                    pool.query(sql2, [PostTitle], async(err, rows) => {
                        if(rows) {
                            pool.query(sql3, [PostCategory], async(err, resultOfQuery) => {
                                if(resultOfQuery) {
                                    console.log(resultOfQuery)
                                    await redisClient.set(`/postsPerCategory/${PostCategory}`, JSON.stringify(resultOfQuery))                          


                                    insertIntoOverwatchuposts(req.user.username, PostTitle, 'Deleted post')
        
        
                                    return res.status(200).json({ success: true})
                                } else {
                                    console.log(err);
                                }
                            })

                           
                        } else {
                            console.log('error', err);
                        }
                    })
                }
            })
        } catch (error) {

        }
        
        


    }
    
}


// const addPinnedMessagePerCategory = (req, res) => {
    
//     const { markup, namepinned, subtitle } = req.body;

//     const sql = 'INSERT INTO pinnedthemes SET ?';

//     try {
//         pool.query(sql, {pinned_title: namepinned, pinned_username: req.user.username, pinned_content: markup, pinned_subforum, subtitle, pinned_userip:})
//     } catch (error) {

//     }
// }


// categoryRouter.get('/category/posts/:category', (req, res) => {
//     const { category } = req.body;
//     console.log(category);
//     pool.query('select * from posts as p, categories as c WHERE p.category = c.title AND c.title = ?', [req.params.category], (err, result) => {
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
    getTopicbyReplyid,
    updateReplyPost,
    lockTheThread,
    unLockTheThread,
    subCategories,
    isLockedPost,
    getPostsPerSubCategory,
    getCategoriesandSubcategories,
    moveTopicToAnotherCategory,
    getSubCategories,
    movePostToSubForum,
    selectThemePerCategory,
    getPostsPerTheme,
    getPostRepliesPerTheme,
    postSubForumPerCategory,
    addThemeForumPerCategory,
    getThemesPerCategory,
    addPostPerTheme,
    deleteTheme,
    deleteSubForum,
    getLastTwentyMessages,
    addPinnedThemesPerSubCategory,
    getPinnedThemePerCategory,
    addReplyInPinnedMessages,
    getUsersPrivateMessages,
    insertMessageRoom,
    getMessageRooms,
    getMessagesByRoomId,
    getLatestPosts,
    deleteReplyByAdmin,
    deletePostByAdmin,
    getPinnedThemePerCategoryReplies,
    deleteContentPerPinnedMessage,
    deletePinnedTheme,
    insertPostInTheme,
    deleteThemeReply,
    updateReplyThemeContent
}

