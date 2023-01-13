/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minLength: 3,
    required: true,
  },
  passwordHash: String,
  name: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
    },
  ],
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const User = mongoose.model('User', userSchema)

module.exports = User
