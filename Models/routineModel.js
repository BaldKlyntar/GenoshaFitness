import mongoose from "mongoose";

const routineSchema = new mongoose.Schema(
    {
        name:String,
        exercises:[{
            exercise:{type: mongoose.Schema.Types.ObjectId, ref: 'Exercise'},
            sets: Number,
            reps: Number
        }],
        createdBy: {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }

    }
);

export default mongoose.model('Routine', routineSchema);