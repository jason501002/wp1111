const Function = ({num, listData}) => {

    

    return <footer className="todo-app__footer" id="todo-footer">
        <div className="todo-app__total">
            <span id="todo-count">{listData.length - num}</span> left
        </div>
        <ul className="todo-app__view-buttons">
            <li><bottom id="todo-all">All</bottom></li>
            <li><bottom id="todo-Active">Active</bottom></li>
            <li><bottom id="todo-Complete">Complete</bottom></li>
        </ul>
        <div className="todo-app__clean">
            <bottom id="todo-clear-complete">Clear complete</bottom>
        </div>
    </footer>
}
export default Function