const express = require('express');
const router = express.Router();
const multer = require('multer');
const sharp = require('sharp');
const MalariaInfoService = require('../services/malariaInfoService');

// Set up Multer middleware to handle file uploads
const upload = multer({ limits: { fileSize: 10 * 1024 * 1024 } }); // limit file size to 10 MB

// Route to handle image upload and save to MongoDB

//please save me//

// router.post('/', upload.single('image'), async (req, res) => {
//   try {
//     console.log(req.)
//     const imageBuffer = await sharp(req.file.buffer).toBuffer(); // process image to get buffer data
//     const { created_by, total_images, infected_images } = req.body;
//     const images = [imageBuffer]; // create array of buffer data containing the uploaded image
//     const malariaInfo = await MalariaInfoService.createMalariaInfo(created_by, images);
//     res.json(malariaInfo);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Server Error');
//   }
// });


// Get all malaria info
router.get('/', async (req, res) => {
  try {
    const malariaInfo = await MalariaInfoService.getAllMalariaInfo();
    res.json(malariaInfo);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Get malaria info by user id
router.get('/{created_by}', async (req, res) => {
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
router.delete('/:id', async (req, res) => {
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
