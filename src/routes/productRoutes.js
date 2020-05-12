const router = require('express').Router()
const conn = require('../config/db')
const bcrypt = require('bcrypt')
const sharp = require('sharp')
const multer = require('multer')
const path = require('path')

const fileDirectory = path.join(__dirname, '../../public/files');

const upload = multer ({
    limits : {
        filesize : 10000000 

    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){ // will be error if the extension name is not one of these
            return cb(new Error('Please upload image file (jpg, jpeg, or png)')) 
        }
 
        cb(undefined, true)
    }
})


router.patch('/image',upload.single('image'), async (req, res) => {
    try{
        //simpan foto di folder
        const filename = `${req.body.id}-image.png`
        await sharp (req.file.buffer).png().toFile(`${fileDirectory}/${filename}`)
        const sql = `UPDATE products SET image = ? WHERE product_id = ?`
        const data = [filename, req.body.id]
        conn.query(sql, data, (err, result) => {
            // Jika ada error saat running sql
            if(err) return res.status(500).send(err)
   
            // Simpan nama fotonya di database
            res.status(201).send({ message: 'Berhasil di upload' })
        })
    //simpan nama foto di database
 
    } catch (err) {
        res.status(500).send(err)
       
    }
    
}, (err,req,res,next) => {
    res.status(500).send()
    
})


router.post('/product', (req,res) => {
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


// router.post('/hero', (req,res) => {
//     const sql = `insert into heroes set ?`
//     const data = req.body

//     data.password = bcrypt.hashSync(data.password, 8)

//     conn.query(sql, data, (err, result) => {
//         if(err) return res.status(500).send(err)

//         res.status(200).send(result)
//     })

    
// })

// router.get('/hero/:id', (req,res) => {
//     const sql = `select * FROM heroes WHERE id = ${req.params.id}`

//     conn.query(sql, (err, result) => {
//         if(err) return res.status(500).send(err)

//         res.status(200).send(result)
//     })

    
// })


// router.get('/hero', (req,res) => {
//     const sql = `select * FROM heroes WHERE attribute = ${req.query.attribute}`

//     conn.query(sql, (err, result) => {
//         if(err) return res.status(500).send(err)

//         res.status(200).send(result)
//     })

// })







module.exports = router