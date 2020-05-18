const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });

    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;

//mongodb+srv://Atisnet:Atisnet100@myprincess-gqkyx.mongodb.net/myprincess?retryWrites=true
//mongodb://XanibisAdmin:Admin100@node29224-myprincess.jcloud.ik-server.com:27017/xanibis?retryWrites=true&w=majority
//mongodb+srv://vjeko:123abc@princess-gebfh.mongodb.net/test?retryWrites=true&w=majority
