const mongoose = require("mongoose");
const { Schema } = mongoose;
const todoSchema = new Schema(
  {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Todo Must Belong To a User']
    },
    text:{
        type:String,
        required:[true,'Todo Must Belong To a Text']
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
    versionKey: false,
    id: false,
  }
);
module.exports = mongoose.model("Todo", todoSchema);