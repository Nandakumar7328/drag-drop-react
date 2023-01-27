import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import './App.css';

const App = () => {
  const [userInput, setUserInput] = useState('');
  const [userInputArray, setUserInputArray] = useState([]);
  const [finalOut, setFinalOut] = useState([]);

  const onClickAddInputArray = () => {
    const updateInput = {
      id: uuidv4(),
      task: userInput,
    };

    setUserInputArray((oldArry) => [...oldArry, updateInput]);
    setUserInput('');
  };

  const onChangeUserInput = (event) => {
    setUserInput(event.target.value);
  };

  const onDragFunction = (event, id, task) => {
    event.dataTransfer.setData("itemTask", JSON.stringify({id, task}));
  };



  const onDropedFinmal = (event) => {
    event.preventDefault()
    let dataTransferId = event.dataTransfer.getData("itemTask");
    setFinalOut(oldArray => [...oldArray,JSON.parse(dataTransferId)])
    let result = JSON.parse(dataTransferId)
    const {id} = result 
    console.log(id)
    setUserInputArray(prevArray => prevArray.filter(item => item.id !== id))
  };

  console.log(finalOut)

  return (
    <div className="app-main-conatiner">
      <div className="sub-container">
      <ul className='ul-container' onDrop={onDropedFinmal} onDragOver={(event) => event.preventDefault()} >
    {finalOut.map(eachData => (
      <li className='li-container' key={eachData.id}>
        {eachData.task}
      </li>
    ))}    
  </ul>
        <div className="input-container">
          <h1 className="name">Hello React</h1>
          <input
            className="input"
            placeholder="Enter Input"
            value={userInput}
            onChange={onChangeUserInput}
            type="text"
          />
          <button onClick={onClickAddInputArray} type="button" className="button">
            Add
          </button>
        </div>
        <ul className="ul-container">
          {userInputArray.map((eachData) => (
            <li
              draggable={true}
              onDragStart={(event) => onDragFunction(event, eachData.id, eachData.task)}
              className="li-container"
              key={eachData.id}
            >
              {eachData.task}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
