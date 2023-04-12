// const tf = require('@tensorflow/tfjs-node');
// const fs = require('fs');

// async function predictObject(imageBuffer) {
//   // Load the pre-trained model
// //   const modelPath = 'file://path/to/model/directory';
// //   const model = await tf.loadLayersModel(modelPath);

//   // Decode the image buffer to a tensor
//   const img = tf.node.decodeImage(imageBuffer);

//   // Preprocess the image for the model
//   const preprocessedImg = tf.cast(img, 'float32').div(255).expandDims();

//   // Predict the object in the image
//   const predictions = await model.predict(preprocessedImg).data();

//   // Get the top predicted object label
//   const topLabelIndex = predictions.indexOf(Math.max(...predictions));
//   const labelsPath = 'path/to/labels.json';
//   const labels = JSON.parse(fs.readFileSync(labelsPath));
//   const topLabel = labels[topLabelIndex];

//   // Return the predicted object as a string
//   return topLabel;
// }

// Import the required libraries
const { ImageAnnotatorClient } = require('@google-cloud/vision');
const client = new ImageAnnotatorClient();

async function detectObjectsInImage(imageBuffer) {
  return [100, 30];

}


module.exports = detectObjectsInImage;