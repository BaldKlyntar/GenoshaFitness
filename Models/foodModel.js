import mongoose from "mongoose";
const { Types } = mongoose;

const foodSchema = new mongoose.Schema(
    {
        id:{
            type: Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        name:String,
        calories:Number,
        protein:Number,
        carbs:Number,
        fats:Number,
        saturatedFat: Number,
        transFat: Number,
        portionSize:Number,
        image:String,
        sugars: Number,
        sodium: Number,
        cholesterol: Number,
        dietaryFiber: Number,
    }


);

export default mongoose.model('Food', foodSchema);