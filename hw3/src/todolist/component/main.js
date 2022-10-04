import Item from './item.js'
import {useState} from 'react'

const Main = ({listData, add, count, num}) => {

    // console.log(add)
    
    function addItem(e){
        if(e.key === 'Enter'){
            idChange(listData.length + 1)
            boolChange()
            // console.log("note, id, bool: " + id + " " + boolean)

            add(function(prevData){    
                // console.log("listdata: " + listData.length)
                
                return [...prevData, {
                    note,
                    boolean,
                    id
                }]    
            })
            setNote("")
        }
    }
    
    const [note, setNote] = useState("")
    function noteChange(e) {
        setNote(e.target.value)
    }
    
    const [boolean, setboolean] = useState("0")
    function boolChange(e){
        setboolean(0)
    }

    const [id, setId] = useState("0")
    function idChange(e){
        setId(e)
    }

    
    
    
    return <section className='todo-app__main'>
            <input value={note} onChange={noteChange} onKeyPress={addItem} className="todo-app__input" placeholder="what needs to be done?" >
            </input>
            <ul className="todo-app__list" id="todo-list">
                {
                    
                    listData.map((item) => {
                        const {note, boolean, id} = item
                        return <Item note={note} boolean={boolean} id={id} count={count} num={num}/>
                    })
                }
            </ul>
        </section>
        
}
export default Main
