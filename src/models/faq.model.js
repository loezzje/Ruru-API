// FAQ-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const faq = new Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
    categoriesId: [{ type: Schema.Types.ObjectId, ref: 'categories' }],

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  return mongooseClient.model('faq', faq);
};
