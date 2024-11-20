import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  type Todo = {
    inputValue: string;
    id: number;
    checked: boolean;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); //送信ボタンを押した時にページ全体がリロードされないようにする

    //新しいtodo作成
  };

  return (
    <div className="App">
      <h2> Todoリスト</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="text" onChange={(e) => handleChange(e)} aria-label="タスク" className='inputText'/>
        <input type="submit" value="作成" className="submitButton" />
      </form>
    </div>
  );
}

export default App;
