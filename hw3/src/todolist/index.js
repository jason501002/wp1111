import './styles.css'
import {useState} from 'react'

import Header from './component/header.js'
import Main from './component/main.js'
import Function from './component/function.js'


const Todolist = () => {
    const [data, setData] = useState([])
    const [left, countLeft] = useState(0)
    console.log('complete: ' + left)

    if(data.length !== 0){
        return <div className='todo-app__root' id="root">
            <Header  />
            <Main listData={data} add={setData} count={countLeft} num={left} />
            <Function num={left} listData={data} />
        </div>
    }
    else{
        return <div className='todo-app__root' id="root">
            <Header  />
            <Main listData={data} add={setData} count={countLeft} num={left} />
        </div>
    }
    
}
export default Todolist