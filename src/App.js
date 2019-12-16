import React from 'react';
import logo from './logo.svg';
import './App.css';
import ListItems from './ListItems'
import Firebase from './Firebase/config'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import {todosRef} from './Firebase/firebase'





library.add(faTrash)

class App extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      items:[],
      currentItem:{
        text:'',
        key:''
      }
    }
    this.addItem = this.addItem.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.setUpdate = this.setUpdate.bind(this);
  }

  addItem(e){
    console.log('aaaaa', e)
    e.preventDefault();
    console.log('DATA SAVED');
    const newItem = this.state.currentItem;
    if(newItem.text !==""){
      const items = [...this.state.items, newItem];
    this.setState({
      items: items,
      currentItem:{
        text:'',
        key:''
      }
    },() => {
      todosRef.push().set(items);
    })
    }
  }
  handleInput(e){
    this.setState({
      currentItem:{
        text: e.target.value,
        key: Date.now()
      }
    })
  }


  deleteItem(key){
   const filteredItems= this.state.items.filter(item =>
      item.key!==key);
    this.setState({
      items: filteredItems

      },() => {
    todosRef.remove().set(filteredItems);
      })
}
 

setUpdate(text,key){
    
    console.log("items:"+this.state.items);
    const items = this.state.items;
    items.map(item=>{      
      if(item.key===key){
        console.log(item.key +"    "+key)
        item.text= text;
      }
    })
    this.setState({
      items: items
    })
    
   
  }

  writeUserData = () => {
    Firebase.database().ref('todos').opn(this.state);
    console.log('DATA SAVED');
  }

  // getTodos (){
  //   firebase.database().ref('todos').on('value', (todo) => {
  //     const todos =todo.val();
  //     Object.keys(todos).map(todoItem => {
  //       let todo = todos[todoItem];
  //       this.setState({
  //           todos:[...this.state.todos, todo]
  //       })
  //     })
  //   })
  // }
  
 render(){
  return (
    <div className="App">
      <header>
        <form id="to-do-form" onSubmit={this.addItem}>
          <input type="text" placeholder="masukin kerjaan.." value= {this.state.currentItem.text} onChange={this.handleInput}></input>
          <button type="submit">tambahin</button>
        </form>
        <p>{this.state.items.text}</p>
        
          <ListItems items={this.state.items} deleteItem={this.deleteItem} setUpdate={this.setUpdate}/>
        
      </header>
    </div>
  );
 }
}


export default App;