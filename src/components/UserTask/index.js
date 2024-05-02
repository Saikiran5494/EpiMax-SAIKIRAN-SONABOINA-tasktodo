import { RiDeleteBin5Line } from "react-icons/ri";
import "./index.css"
const UserTask = (props) => {
    const {eachTodo,deleteIcon,userInputList} = props
    const {id,userInput} = eachTodo
    let labelId = "label" + id 


    const functionLabelInput = (id,labelId) => {
        let inpEl = document.getElementById(id)
        let El = document.getElementById(labelId)
        let pEl = document.getElementById(labelId+"status")

       if(inpEl.checked === true){
        El.classList.add("task-done")
        pEl.classList.add("status-done")
        pEl.textContent = "Completed"
       }else{
        El.classList.remove("task-done")
        pEl.classList.remove("status-done")
        pEl.textContent = "In progress"
       }
    }

    const checkBoxClicked = () => {
        functionLabelInput(id,labelId)    
    }

    const deleteButtonClicked = () =>{
        deleteIcon(id)
    }

    return(
        <div className="task-list-container">
        <input type="checkbox" id={id} className="input" onClick={checkBoxClicked}/>
        <li className="list">
            <div className="space-task">
                <div className="space">
                </div>
                <label htmlFor={id} id={labelId} className="heading">{userInput}</label>
            </div>
            <p className="status" id={labelId+"status"}>In Progress</p>
            <button className="delete-icon" onClick={deleteButtonClicked}><RiDeleteBin5Line className="icon"/></button>
            
        </li>
        </div>
    )

}

export default UserTask