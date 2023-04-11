const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const MalariaInfo = require('./malaria_info');
const MalariaInfoService = require('../services/malariaInfoService');


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  previous_health_report: {
    type: String,
    default: '',
  },
  malaria_info: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MalariaInfo' }],
});

userSchema.pre('save', async function () {

  

  const user = this;

  // const malaria_info = await MalariaInfo.findOne({created_by:user.id});
  // console.log(malaria_info)

  // if(!malaria_info){
  //   console.log("create nre entry")
  //   await MalariaInfoService.createMalariaInfo({created_by:user.id})
  // }

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }
});

const User = mongoose.model('User', userSchema);



module.exports = User;