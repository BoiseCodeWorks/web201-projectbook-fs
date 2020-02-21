import mongoose from "mongoose";
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

let phoneSchema = new Schema(
  {
    kind: {
      type: String,
      enum: ["cell", "work", "office", "home", "pager"],
      required: true,
      default: "cell",
      lowercase: true
    },
    number: {
      type: String,
      required: true,
      match: /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/
    }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

let contactSchema = new Schema(
  {
    name: { type: String, required: true, maxlength: 50, trim: true },
    phones: [phoneSchema],
    projectId: { type: ObjectId, ref: "Project", required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

// MANY TO MANY EXAMPLE
// let contactProjectSchema = new Schema(
//   {
//     contactId: { type: ObjectId, ref: "Contact", required: true },
//     projectId: { type: ObjectId, ref: "Project", required: true }
//   },
//   { timestamps: true, toJSON: { virtuals: true } }
// );

export default contactSchema;
