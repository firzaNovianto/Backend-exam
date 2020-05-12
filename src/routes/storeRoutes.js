const router = require('express').Router()
const conn = require('../config/db')
const bcrypt = require('bcrypt')
const sharp = require('sharp')
const multer = require('multer')
const path = require('path')


router.post('/store', (req,res) => {
    const sql = `insert into stores set ?`
    const data = req.body


    conn.query(sql, data, (err, result) => {
        if(err) return res.status(500).send(err)

        res.status(200).send(result)
    })

    
})

router.get('/stores', (req,res) => {
    const sql = `select * from stores`

    conn.query(sql, (err, result) => {
        if(err) return res.status(500).send(err)

        res.status(200).send(result)
    })
    
})

router.patch('/store/:id', (req, res) => {
    const sql = `UPDATE stores SET ? WHERE store_id = ?;`
    const data = [req.body, req.params.id]
                       
    conn.query(sql, data, (err, result) => {
       if(err) return res.send(err)
 
       res.send({
          message : "Update berhasil",
          result
       })
    })
 })

 router.delete('/store/:id', (req, res) => {
    const sql = `DELETE FROM stores WHERE store_id = ${req.params.id}`

                       
    conn.query(sql, (err, result) => {
       if(err) return res.send(err)
 
       res.send({
          message : "Delete Berhasil",
          result
       })
    })
 })

 module.exports = router