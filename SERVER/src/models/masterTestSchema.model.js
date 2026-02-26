import mongoose from "mongoose";

const normalRangeSchema = new mongoose.Schema({
  minAge: { type: Number, required: true },
  maxAge: { type: Number, required: true },
  maleMin: { type: Number },
  maleMax: { type: Number },
  femaleMin: { type: Number },
  femaleMax: { type: Number }
}, { _id: false });

const parameterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  unit: { type: String },
  normalRanges: [normalRangeSchema]
}, { _id: false });

const masterTestSchema = new mongoose.Schema({
  testName: { type: String, required: true, unique: true },
  category: { type: String },
  parameters: {
    type: [parameterSchema],
    validate: {
      validator: function (v) {
        return v.length > 0;
      },
      message: "At least one parameter is required"
    }
  },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model("MasterTest", masterTestSchema);