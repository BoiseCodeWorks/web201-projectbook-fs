import mongoose from "mongoose";
let Schema = mongoose.Schema;

let projectSchema = new Schema(
  {
    name: { type: String, required: true, maxlength: 50, trim: true },
    description: { type: String, required: true, maxlength: 10000, trim: true },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default projectSchema;
