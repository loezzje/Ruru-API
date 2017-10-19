// ruru-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const ruru = new Schema({
    about: { type: String },
    phone: { type: Number },
    email: { type: String },
    address: { type: String },
    instagram: { type: String },
    facebook: { type: String },
    twitter: { type: String },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  return mongooseClient.model('ruru', ruru);
};
