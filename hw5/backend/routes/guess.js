import express from 'express'
import {genNumber, getNumber} from '../core/getNumber'

const router = express.Router()

router.post('/start', (_, res) => {
    genNumber()
    // console.log("ans: ",getNumber())
    res.json({ msg: 'the game is started.'})
})

router.get('/guess', (req, res) =>{
    console.log("ans", getNumber())
    const tempans = getNumber()
    const temp = req.query.number
    console.log(temp)
    if(temp <= 99 && temp >= 0){
        if(tempans == temp){
            res.json({ msg: 'Equal'})
        }
        else if(tempans > temp){
            res.json({ msg: 'Bigger'})
        }
        else{
            res.json({ msg: 'Smaller'})
        }
    }
    else{
        res.json({ msg: temp + ' is Not a legal number'})
    }
})

router.post('/restart', (_, res) => {
    res.json({ msg: 'you won! the number was ' + getNumber()})
})

export default router