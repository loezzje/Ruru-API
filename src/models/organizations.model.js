// organizations-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const organizations = new Schema({
    name: { type: String, required: true },
    logo: { type: String },
    tagline: { type: String },
    about: { type: String },
    features: [ String ],
    categoryIds: [{ type: Schema.Types.ObjectId, ref: 'categories' }],

    website: { type: String },
    phone: { type: Number },
    address: { type: String },
    facebook: { type: String },

    frontpage: { type: Boolean },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  return mongooseClient.model('organizations', organizations);
};
