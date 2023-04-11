const MalariaInfo = require('../models/malaria_info');

class MalariaInfoService {
    async createMalariaInfo(created_by, image) {
        const malariaInfo = new MalariaInfo({
          created_by,
          total_images,
          infected_images,
          image,
        });
        await malariaInfo.save();
        return malariaInfo;
      }
      

  async getMalariaInfoById(malariaInfoId) {
    try {
      const malariaInfo = await MalariaInfo.findById(malariaInfoId);
      if (!malariaInfo) throw new Error('Malaria Info not found');
      return malariaInfo;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteMalariaInfo(malariaInfoId) {
    try {
      const malariaInfo = await MalariaInfo.findByIdAndDelete(malariaInfoId);
      if (!malariaInfo) throw new Error('Malaria Info not found');
      return malariaInfo;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteMalariaInfoByUserId(userId) {
    try {
      const deletedInfo = await MalariaInfo.deleteMany({ created_by: userId });
      return deletedInfo;
    } catch (err) {
      console.error(err);
      throw new Error('Error deleting malaria info for user');
    }
  }

  async getAllMalariaInfo() {
    const malariaInfo = await MalariaInfo.find();
    return malariaInfo;
  }
  
  async getMalariaInfoByUserId(userId) {
    const malariaInfo = await MalariaInfo.find({ created_by: userId });
    return malariaInfo;
  }
}


module.exports = new MalariaInfoService();
