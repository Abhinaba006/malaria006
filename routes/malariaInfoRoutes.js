const express = require('express');
const router = express.Router();
const multer = require('multer');
const sharp = require('sharp');
const mongoose = require('mongoose');
const cors = require('cors');
const MalariaInfoService = require('../services/malariaInfoService');
const detectObjectsInImage = require('../modelHelper');
const MalariaInfo = require('../models/malaria_info');


const authMiddleware = require('../middlewares/auth');


// Set up Multer middleware to handle file uploads
const upload = multer({
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }
        cb(null, true)
    },
    limits: {
        fileSize: 100000000
    },
    fieldName: 'image',
    storage: multer.memoryStorage() // specify the field name for the uploaded file
});

// Route to handle image upload and save to MongoDB

//please save me//

async function compressImage(inputBuffer, maxWidth = 300, quality = 50) {
    try {
      const compressedBuffer = await sharp(inputBuffer)
        .resize({ width: maxWidth })
        .jpeg({ quality: quality })
        .toBuffer();
      return compressedBuffer;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

router.post('/', upload.single('image'), authMiddleware, async (req, res) => {
    try {
        console.log(req.file)
        const buffer = req.file.buffer;
        const prediction = await detectObjectsInImage(buffer)
        const malaria_info = new MalariaInfo({
            title:'image#'+await MalariaInfo.countDocuments(),
            created_by: new mongoose.Types.ObjectId(req.user._id),
            total_images:prediction[0],
            infected_images:prediction[1],
            image:await compressImage(buffer)
        })

        await malaria_info.save();
        res.status(200).send(malaria_info)
    } catch (error) {
        console.log(41, error);
        res.status(400).send(error.message);
    }
});

// Get malaria info by user id
router.get('/', cors(),authMiddleware, async (req, res) => {
    try {
        const userId = req.user._id
        console.log(userId)
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
router.delete('/:id', cors(),authMiddleware, async (req, res) => {
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
