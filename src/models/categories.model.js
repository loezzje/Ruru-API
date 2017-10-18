// categories-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const categories = new Schema({
    name: { type: String, required: true },
    icon: { type: String, required: true },
    frontPage: { type: Boolean },
    tagline: { type: String },
    organizationsId: [{ type: Schema.Types.ObjectId, ref: 'organizations' }],

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  return mongooseClient.model('categories', categories);
};
