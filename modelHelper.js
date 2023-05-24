// // // const tf = require('@tensorflow/tfjs-node');
// // // const fs = require('fs');
const sharp = require('sharp');
const path = require("path")
// // // async function predictObject(imageBuffer) {
// // //   // Load the pre-trained model
// // // //   const modelPath = 'file://path/to/model/directory';
// // // //   const model = await tf.loadLayersModel(modelPath);

// // //   // Decode the image buffer to a tensor
// // //   const img = tf.node.decodeImage(imageBuffer);

// // //   // Preprocess the image for the model
// // //   const preprocessedImg = tf.cast(img, 'float32').div(255).expandDims();

// // //   // Predict the object in the image
// // //   const predictions = await model.predict(preprocessedImg).data();

// // //   // Get the top predicted object label
// // //   const topLabelIndex = predictions.indexOf(Math.max(...predictions));
// // //   const labelsPath = 'path/to/labels.json';
// // //   const labels = JSON.parse(fs.readFileSync(labelsPath));
// // //   const topLabel = labels[topLabelIndex];

// // //   // Return the predicted object as a string
// // //   return topLabel;
// // // }

// // // Import the required libraries
// // const { ImageAnnotatorClient } = require('@google-cloud/vision');
// // const client = new ImageAnnotatorClient();

// // async function detectObjectsInImage(imageBuffer) {
// //   return [100, 30];

// // }


// // 

const fs = require('fs');
const tf = require('@tensorflow/tfjs');

// Load the pre-trained model from the H5 file
// const modelPath = 'model.h5';

async function loadModel() {
  const model = await tf.loadLayersModel(`file://model.h5`);
  return model;
}



// // Usage example
// const imagePath = 'path/to/your/image.jpg';

// fs.readFile(imagePath, async (err, data) => {
//   if (err) {
//     console.error('Error reading image:', err);
//     return;
//   }

//   try {
//     const isClassTrue = await predictImage(data);
//     console.log('Image belongs to class:', isClassTrue);
//   } catch (error) {
//     console.error('Error predicting image:', error);
//   }
// });


async function predictImage(imageBuffer) {
  try {
    await sharp(imageBuffer)
      .toFile('image.jpg', (err, info) => {
        if (err) {
          console.error(79,err);
        } else {
          console.log('Image converted successfully');
        }
      });
  } catch (e) {
    console.log(86, e)
  }
  return true;
}
module.exports = predictImage;