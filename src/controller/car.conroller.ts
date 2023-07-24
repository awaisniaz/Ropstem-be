import { Cars, Client } from "../models/client"
export const car_controller = {
    addcar: (req: any, res: any) => {
        let car = new Cars(req.body)
        car.save().then(data => {
            res.send({ "message": "Your car is register Successfully" })
        }).catch(err => {
            res.send({ "message": err?.message })
        })

    },
    updateCar: (req: any, res: any) => {
        let id = req.body.id
        let request = req.body.car
        console.log(req.email)
        let user = Client.findOne({ email: req.email?.email })
        Cars.findByIdAndUpdate({ _id: id, owner: user['_id'] }, request).then(data => {
            res.send({ "message": "You car update Successfull" })

        }).catch(err => {
            res.send({ "message": err.message })
        })


    },
    deleteCar: (req: any, res: any) => {
        let user = Client.findOne({ email: req.email?.email })
        Cars.findByIdAndDelete({ _id: req.body.id, owner: user['_id'] }, (err, data) => {
            if (err != null) {
                res.send({ "messsage": err?.message })
            } else {
                res.send({ "message": "Delete Car Success" })
            }
        })
    }
    , getCar: (req: any, res: any) => {

    }
}