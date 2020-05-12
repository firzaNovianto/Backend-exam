const router = require('express').Router()
const conn = require('../config/db')
const bcrypt = require('bcrypt')
const sharp = require('sharp')
const multer = require('multer')
const path = require('path')


router.post('/store', (req,res) => {
    const sql = `insert into products set ?`
    const data = req.body


    conn.query(sql, data, (err, result) => {
        if(err) return res.status(500).send(err)

        res.status(200).send(result)
    })

    
})

router.get('/products', (req,res) => {
    const sql = `select * from products`

    conn.query(sql, (err, result) => {
        if(err) return res.status(500).send(err)

        res.status(200).send(result)
    })
    
})

router.patch('/products/:id', (req, res) => {
    const sql = `UPDATE products SET ? WHERE product_id = ?;`
    const data = [req.body, req.params.id]
                       
    conn.query(sql, data, (err, result) => {
       if(err) return res.send(err)
 
       res.send({
          message : "Update berhasil",
          result
       })
    })
 })

 router.delete('/products/:id', (req, res) => {
    const sql = `DELETE FROM products WHERE product_id = ${req.params.id}`

                       
    conn.query(sql, (err, result) => {
       if(err) return res.send(err)
 
       res.send({
          message : "Delete Berhasil",
          result
       })
    })
 })

 module.exports = router