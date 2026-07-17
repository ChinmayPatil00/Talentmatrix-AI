const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('🛡️  TalentMatrix Production Database Linked Seamlessly.');
  } catch (err) {
    console.error('❌ Critical Database Connection Failure:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;