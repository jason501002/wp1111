let number

function genNumber() {
    number = Math.floor(Math.random()*99)
    return number
}

function getNumber() {
    return number
}

export {genNumber, getNumber}