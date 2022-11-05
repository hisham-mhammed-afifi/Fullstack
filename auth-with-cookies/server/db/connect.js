const mongoose = require("mongoose");

const connect = async (app) => {
  await mongoose.connect(process.env.MONGO_URI);

  app.listen(process.env.PORT, () => {
    console.log(
      `connected and listening on:\nhttp://localhost:${process.env.PORT}`
    );
  });
};

module.exports = connect;
