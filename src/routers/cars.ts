import express from 'express';
import { car_controller } from '../controller/car.conroller'
const carrouter = express.Router()
carrouter.post('/addcar', car_controller.addcar)
carrouter.patch('/updatecar', car_controller.updateCar)
carrouter.delete('/deletecar', car_controller.deleteCar)
carrouter.get('/getcar', car_controller.getCar)

export default carrouter