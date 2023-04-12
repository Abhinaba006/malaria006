const express = require('express');
const router = express.Router();
const multer = require('multer');
const sharp = require('sharp');
const mongoose = require('mongoose');
const cors = require('cors');
const MalariaInfoService = require('../services/malariaInfoService');
const detectObjectsInImage = require('../modelHelper');
const MalariaInfo = require('../models/malaria_info');

// Set up Multer middleware to handle file uploads
const upload = multer({
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }
        cb(null, true)
    },
    limits: {
        fileSize: 1000000
    },
    fieldName: 'image',
    storage: multer.memoryStorage() // specify the field name for the uploaded file
});

// Route to handle image upload and save to MongoDB

//please save me//


router.post('/:user_id', cors(), upload.single('image'), async (req, res) => {
    try {
        const buffer = req.file.buffer;
        const prediction = await detectObjectsInImage(buffer)
        const malaria_info = new MalariaInfo({
            created_by: new mongoose.Types.ObjectId(req.params.user_id),
            total_images:prediction[0],
            infected_images:prediction[1],
            image:buffer
        })

        await malaria_info.save();
        res.status(200).send(malaria_info)
        // console.log(req.file)
        // await sharp(buffer)
        //     .resize({ width: 250, height: 250 })
        //     .jpeg()
        //     .toFile(__dirname + `\\..\\uploads\\${req.file.originalname}.jpg`);
        // res.status(201).send('Image uploaded successfully');



        //   const metadata = await image.metadata();

        //   if (metadata.format !== 'jpeg' && metadata.format !== 'png') {
        //     console.log(35, metadata.format)
        //     throw new Error('Invalid image formsat');
        //   }
        // await sharp(image).resize({ width: 250, height: 250 }).jpeg().toFile(__dirname + `/uploads/${req.file.originalname}.jpg`);
        // res.status(201).send('Image uploaded successfully');
    } catch (error) {
        console.log(41, error);
        res.status(400).send(error.message);
    }
});









// Get all malaria info
router.get('/',  cors(),async (req, res) => {
    try {
        const malariaInfo = await MalariaInfoService.getAllMalariaInfo();
        res.json(malariaInfo);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// Get malaria info by user id
router.get('/{created_by}', cors(),async (req, res) => {
    try {
        const userId = req.params.created_by;
        const malariaInfo = await MalariaInfoService.getMalariaInfoByUserId(userId);
        if (malariaInfo) {
            res.json(malariaInfo);
        } else {
            res.status(404).send('Malaria Info not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});


// router.post('/', async (req, res) => {
//     try {
//       const { created_by, image } = req.body;
//       const malariaInfo = await MalariaInfoService.createMalariaInfo(created_by, image);
//       res.json(malariaInfo);
//     } catch (err) {
//       console.error(err);
//       res.status(500).send('Server Error');
//     }
//   });

// Update malaria info by id
// router.put('/{created_by}', async (req, res) => {
//   try {
//     const { image } = req.body;
//     let malariaInfo = await MalariaInfoService.getMalariaInfoByUserId(created_by);
//     if (malariaInfo) {
//         res.json(malariaInfo);
//       } else {
//         res.status(404).send('Malaria Info not found');
//       }
//     malariaInfo.images = [...malariaInfo.images, image]
//     await malariaInfo.save();

//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Server Error');
//   }
// });

// Delete malaria info by id
router.delete('/:id', cors(),async (req, res) => {
    try {
        const id = req.params.id;
        const malariaInfo = await MalariaInfoService.deleteMalariaInfo(id);
        if (malariaInfo) {
            res.json(malariaInfo);
        } else {
            res.status(404).send('Malaria Info not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
