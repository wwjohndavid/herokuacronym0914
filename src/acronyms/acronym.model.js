import mongoose from 'mongoose';

const acronymSchema = new mongoose.Schema({
  acronym: {
    type: String,
    required: 'Please enter a acronym',
  },
  definition: {
    type: String,
    required: 'Please enter a definition!',
  },

});


// define our indexes
acronymSchema.index({
  acronym: 'text',
});


export default mongoose.model('Acronym', acronymSchema);
