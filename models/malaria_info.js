const mongoose = require('mongoose');


const malariaInfoSchema = new mongoose.Schema({
    title:String,
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    total_images: { type: Number, required: true, default:0 },
    infected_images: { type: Number, required: true, default:0 },
    image: { type: Buffer, required: true },
  }, { timestamps: true });
  
  // Create a virtual field 'user' that references the 'User' model
//   malariaInfoSchema.virtual('user', {
//     ref: 'User',
//     localField: 'created_by',
//     foreignField: '_id'
//   });
  
  const MalariaInfo = mongoose.model('MalariaInfo', malariaInfoSchema);
  
  module.exports = MalariaInfo;