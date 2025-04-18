import Exercise from '../Models/exerciseModel.js'
import { StatusCodes } from 'http-status-codes'

export const getAllExercises = async (req, res) =>{
    const { name, muscleGroup } = req.query;
    let filtro = {};

    if (name) {
        filtro.name = { $regex: name, $options: "i"};
    }

    if(muscleGroup){
        filtro.muscleGroup = { $regex: muscleGroup, $options: "i"};
    }
    const exercises = await Exercise.find(filtro);
    res.status(StatusCodes.OK).json({exercises})
}

export const addExercise = async (req, res) => {
    const exercise = await Exercise.create(req.body);
    res.status(StatusCodes.CREATED).json({ exercise })
}

export const getExercise = async (req, res) => {
    const exercise = await Exercise.findById(req.params.id)
    res.status(StatusCodes.OK).json({exercise})
}

export const updateExercise = async (req, res) => {
    const updatedExercise = await Exercise.findByIdAndUpdate(req.params.id, req.body, {
        new:true
    })

    res.status(StatusCodes.OK).json({ msg: 'exercise modified: ', exercise: updatedExercise})
}

export const deleteExercise = async (req, res) => {
    const removedExercise = await Exercise.findByIdAndDelete(req.params.id)
    res.status(StatusCodes.OK).json({ msg: 'exercise deleted', exercise: removedExercise})
}