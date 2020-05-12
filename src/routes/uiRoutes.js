const router = require('express').Router()
const conn = require('../config/db')
const bcrypt = require('bcrypt')
const sharp = require('sharp')
const multer = require('multer')
const path = require('path')


router.post('/inventory', (req,res) => {
    const sql = `insert into inventory set ?`
    const data = req.body


    conn.query(sql, data, (err, result) => {
        if(err) return res.status(500).send(err)

        res.status(200).send(result)
    })

    
})

router.get('/inventory', (req,res) => {
    const sql = `select name ,branch_name, inventory 
    from inventory
    join products on products.product_id = inventory.product_id
    join stores on stores.store_id = inventory.store_id`

    conn.query(sql, (err, result) => {
        if(err) return res.status(500).send(err)

        res.status(200).send(result)
    })
    
})

router.patch('/inventory/:id', (req, res) => {
    const sql = `UPDATE inventory SET ? WHERE inventory_id = ${req.params.id};`
    const data = [req.body]
                       
    conn.query(sql, data, (err, result) => {
       if(err) return res.send(err)
 
       res.send({
          message : "Update berhasil",
          result
       })
    })
 })

 router.delete('/inventory/:id', (req, res) => {
    const sql = `DELETE FROM inventory WHERE inventory_id = ${req.params.id}`

                       
    conn.query(sql, (err, result) => {
       if(err) return res.send(err)
 
       res.send({
          message : "Delete Berhasil",
          result
       })
    })
 })

 router.get('/inventory/product', (req,res) => {
    const sql = `select name from products`

    conn.query(sql, (err, result) => {
        if(err) return res.status(500).send(err)

        res.status(200).send(result)
    })
    
})

router.get('/inventory/store', (req,res) => {
    const sql = `select branch_name from stores`

    conn.query(sql, (err, result) => {
        if(err) return res.status(500).send(err)

        res.status(200).send(result)
    })
    
})

 module.exports = router