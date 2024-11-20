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

  //inputの値を取得更新
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setInputText(e.target.value);
  };

  //formが送信された時にtodoリストに情報を入れる
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //送信ボタンを押した時にページ全体がリロードされないようにする

    //新しいtodo作成
    const newTodo: Todo = {
      inputValue: inputText,
      id: todos.length,
      checked: false,
    }

    setTodos([newTodo, ...todos]);
    setInputText(""); //投稿した後はinputを空にする
  };

  //表示したタスクの編集機能(handleEdit関数)
  const handleEdit = (id: number, inputValue: string) => {
    const newTodos = todos.map((todo) => {
      if(todo.id === id) {
        todo.inputValue = inputValue;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  //チェックボックス実装
  const handleChecked = (id: number, checked: boolean) => {
    const newTodos = todos.map((todo) => {
      if(todo.id === id) {
        todo.checked = !checked;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  //削除ボタン実装
  const handleDelete = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id); //idがあっていないものを残す
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <h2> Todoリスト</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="text" onChange={(e) => handleChange(e)} aria-label="タスク" className='inputText'/>
        <input type="submit" value="作成" className="submitButton" />
      </form>
      {/* todoリストに入れたタスクをmap関数で一つ一つ取り出して表示する */}
      <ul className='todoList'>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input type="text" onChange={(e) => handleEdit(todo.id, e.target.value)} className='inputText' aria-label="タスク" value={todo.inputValue} disabled={todo.checked}/>
            <input type="checkbox" onChange={(e) => handleChecked(todo.id, todo.checked)} aria-label="チェックボックス"/>
            <button onClick={() => handleDelete(todo.id)}>消</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
