import { Component } from "react";
import {v4 as uuidv4} from "uuid"
import UserTask from "../UserTask";
import "./index.css"

class Home extends Component{
    state = {
        userInput: "",
        userInputList: [],
        errorMsg: "",  
    }

    componentDidMount(){
        this.getListFromLocalStorage()
    }

    addClicked = () => {
        const {userInput} = this.state
        
        if(userInput === ""){
            this.setState({errorMsg: "Please provide valid input"})
        }else{
            this.setState(prevState => ({userInputList :[...prevState.userInputList,{
                "id" : uuidv4(),
                "userInput": userInput,
                "isChecked": false,
            }]
                ,userInput:"",errorMsg: ""}))
        }
       
    }

    enterUserInput = (event) => {
        this.setState({userInput: event.target.value})
    }

    saveBtnClicked = () => {
        const {userInputList} = this.state
        let stringyfiedList = JSON.stringify(userInputList)
        localStorage.setItem("todoList",stringyfiedList)
        
    }

    getListFromLocalStorage = () => {
        let localStorageList = localStorage.getItem("todoList")
        let parsedList = JSON.parse(localStorageList)
        if(parsedList === null){
            return [];
        }else{
            this.setState({userInputList: parsedList})
        }
        
    }


deleteIcon = (checkboxId) => {
    const {userInputList} = this.state
    let deleteIndex = userInputList.findIndex((each) => {
        if(each.id === checkboxId){
            return true;
        }else{
            return false;
        }
    })    
    userInputList.splice(deleteIndex,1)
    this.setState({userInputList: userInputList})
}

    render(){
        const {userInputList,userInput,errorMsg} = this.state
        const length = userInputList.length 
        
        return(
            <div className="bg-container">
                <div className="heading-logo-container">
                    <h1 className="main-heading">Task List Application</h1>
                    <img alt="task" className="logo" src="https://img.freepik.com/free-vector/isometric-time-management-concept-illustrated_52683-55534.jpg"/>
                    <hr className="line"/>
                </div>
                <div className="task-container">
                    <h1>Create <span>Task</span></h1>
                    <input type="text" placeholder="what needs to do?" value={userInput} onChange={this.enterUserInput}/><br/>
                    <p>{errorMsg}</p>
                    <button type="button" className="button" onClick={this.addClicked}>Add</button>
                    <h1>My <span>Tasks</span></h1>
                    {length > 0 ? (<ul className="un-ordered-list">
                {userInputList.map(eachTodo => (<UserTask eachTodo={eachTodo}
                  key={eachTodo.id}
                  deleteIcon = {this.deleteIcon}
                  userInputList = {userInputList}
                   />))}
                </ul>):(<p>No tasks assigned yet!</p>)}
                <button type="button" className="button btn" onClick={this.saveBtnClicked}>Save</button>
                </div>
                
                
            </div>
            
        )
    }
}

export default Home