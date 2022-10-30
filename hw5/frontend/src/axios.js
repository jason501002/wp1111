import axios from 'axios'

const instance = axios.create({baseURL: 'http://localhost:4000/api/guess'})

const StartGame = async () => {
    const {data: {msg}} = await instance.post('/start')
    console.log(msg)
    return msg
}

const Guess = async (number) => {
    console.log(number)
    // try{
    //     const { data: {msg} } = await instance.get('/guess', {parmas: { number }})
    //     return msg
    // }
    // catch (error) {
    //     const msg = number + ' is Not a legal number'
    //     return msg
    // }
    const { data: {msg}} = await instance.get('/guess', {params: { number }})
    return msg
}

const Restart = async () => {
    const {data: {msg}} = await instance.post('/restart')
    return msg
}

export {StartGame, Guess, Restart};
