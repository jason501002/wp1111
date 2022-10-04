import {useState} from 'react'

const Item = ({note, boolean, id, count, num}) => {

    const [check, setCheck] = useState(false)
    const checkChange = () => {
        console.log('Check', check)
        setCheck(!check)
        
        if(check){
            count(function(prevData){
                console.log("prevData: " + prevData)
                return prevData - 1
            })
        }
        else{
            count(function(prevData){
                console.log("prevData: " + prevData)
                return prevData + 1
            })
        }
    }
    // function checkChange(e){
    //     setCheck(!check)
    //     count(function(){
    //         // console.log("listdata: " + listData.length)
    //         if(check){
    //             count(function(prevData){
    //                 console.log("prevData: " + prevData)
    //                 return prevData - 1
    //             })
    //         }
    //         else{
    //             count(function(prevData){
    //                 console.log("prevData: " + prevData)
    //                 return prevData + 1
    //             })
    //         }
            
    //     })
    // }

    
    

    return <li className="todo-app__item">
        <div className="todo-app__checkbox">
            <input id={id} type="checkbox" value={check} onChange={checkChange}/>
            <label for={id} ></label>
        </div>
        <h1 className="todo-app__item-detail">{note}</h1>
        <img className="todo-app__item-x" src={require("./x.png")} alt="x" />
    </li>
}

export default Item