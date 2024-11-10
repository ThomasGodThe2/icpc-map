const mongoose = require('mongoose');

const TopicSchema = new mongoose.Schema({
  description: {
    type: String,
    // required: true,
    // maxlength: 300
  },
  list_of_problems: [
    {
      type: String,
    //   required: true // assuming each URL is a string
    }
  ],
  topics_list: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Topic' // reference to another Topic document
    }
  ]
});

// const Topic = mongoose.model('Topic', TopicSchema);
// mongoose.models.User || mongoose.model("User", UserSchema);
module.exports = mongoose.models.Topic || mongoose.model("Topic", TopicSchema);