import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { MdEditSquare } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { PiAcornFill } from 'react-icons/pi';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(false)

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }
  
  // useEffect(() => {
  //   let todoString = localStorage.getItem("todos")
  //   if(todoString){
  //     let todos = JSON.parse(localStorage.getItem("todos")) 
  //     setTodos(todos)
  //   }
  // }, [])   it will not work because we called localStorage.getItem("todos") twice:Once in todoStringAgain in JSON.parse(localStorage.getItem("todos"))This isn’t wrong by itself, but it's wasteful and could cause inconsistencies in rare cases (especially if localStorage changes in between calls, e.g. via other tabs or extensions).

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      try {
        let parsedTodos = JSON.parse(todoString);
        setTodos(parsedTodos);
      } catch (e) {
        console.error("Error parsing todos from localStorage:", e);
        setTodos([]); // reset to empty if corrupted
      }
    } else {
      setTodos([]); // no todos in LS
    }
  }, []);
  
  

  const saveToLS = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  // const saveToLS = (todosToSave) => {
  //   localStorage.setItem("todos", JSON.stringify(todosToSave));
  // };
  
  const handleEdit = (e,id)=>{
    // console.log(id)
    
    let t = todos.filter(i=>i.id === id);
    setTodo(t[0].todo)

    let newTodos = todos.filter(item=>{
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLS(newTodos);
    toast("Todo is ready to edit!");
  }

  const handleDelete = (e, id)=>{
    // console.log(id)
    let newTodos = todos.filter(item=>{
      return item.id !== id
    });
    let c = confirm("Are you sure to delete this Todd");
    if(c){
      setTodos(newTodos)
      toast("Todo deleted sucessfuly !");
      saveToLS(newTodos);
    }
  }
 
  const handleSave = () => {
    if (!todo.trim()) {   // checks if the input is: Empty: "" or Only whitespace: " "
      toast.error("Cannot save an empty todo."); 
      return;
    }
    const newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
    setTodos(newTodos);
    saveToLS(newTodos);
    setTodo("");
    toast("Todo saved successfully !");
  };

  const handleChange = (e)=>{
    setTodo(e.target.value)
  }

  const handleCheckbox = (e)=>{
    let id = e.target.name;
    // console.log(id);
    let index = todos.findIndex(item=>{
      return item.id === id
    })
    // console.log(index);
    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    // setTodos(newTodos)
    // // console.log(newTodos)
    // saveToLS();
    if (newTodos[index].isCompleted) {
      toast("Marked as finished todo.");
    } else {
      toast("Unmarked from finished todo.");
    }
    setTodos(newTodos);
    saveToLS(newTodos);

  }

  return (
    <>
      <Navbar/>
      <div className='bg-slate-900 min-h-[90vh] p-7'>
        <div className='conainer bg-[#0D0D0D] min-h-[87vh] md:w-1/2 md:mx-auto rounded-4xl text-[#E0E0E0] w-full border-2 border-blue-700'>
          <div className='p-7'>
            <h1 className='text-center font-black font-serif text-2xl sm:text-3xl text-blue-700 mt-5'>Zendone – All your todos</h1>
            <div className='addTodo'>
              <h2 className='font-bold text-xl sm:text-2xl m-7'>Add a Todo :</h2>
              <div className='flex gap-3 m-7 flex-col md:flex-row'>
                <input onKeyDown={(e) => { if (e.key === 'Enter') handleSave(); }} onChange={handleChange} value={todo} className='bg-slate-50 px-3 rounded-2xl md:w-2xl h-12 font-semibold text-black focus:outline-blue-700' type='text' placeholder='Enter a todo' />
                <button onClick={handleSave}  className='bg-[#282727] text-green-500 px-3 py-2 md:py-0 rounded-2xl font-bold hover:cursor-pointer hover:bg-[#282727] hover:text-blue-700 border-2 hover:border-blue-700'>Save Todo</button>
              </div>

              <h2 className='text-xl sm:text-2xl font-bold text-center'>Your Todos</h2>
              <div className='my-5 bg-[#282727] h-[3px]'></div>
              {todos.length >=1 && <div className='mb-3 flex items-center gap-2'><input type='checkbox' checked={showFinished} id='show' onChange={toggleFinished} className='cursor-pointer' /><span className='text-xs font-bold text-gray-400'>show finished todos</span></div>}
              {/* <div className='mb-3 flex items-center gap-2'><input type='checkbox' /><span className='text-xs font-bold text-gray-400'>show finished todos</span></div> */}

              <div className='todos'>
                {todos.length === 0 && <div className='text-red-500 font-black font-serif text-center mt-32'>No Todos to show</div>}
                {todos.filter(item => !showFinished || item.isCompleted).map(item=>{
                return <div key={item.id} className="todo flex  mt-5 bg-slate-900 p-3 rounded-2xl flex-col">
                  <div className='flex gap-5 items-center mb-3 '>
                    <input onChange={handleCheckbox} name={item.id} type='checkbox' value={item.isCompleted} className='w-4 h-4 rounded-full border-2 border-gray-400 appearance-none checked:bg-blue-500 checked:border-blue-500 transition-colors duration-200 cursor-pointer' />
                    <div className={`text-xl break-words ${item.isCompleted?"line-through":""} w-full`} style={{ wordBreak: 'break-word', flex: 1 }}>{item.todo}</div>
                  </div>
                  <div className='flex gap-3 justify-end'>
                    <button onClick={(e)=>{handleEdit(e, item.id)}} className='bg-[#282727] px-5 py-2 md:py-3 rounded-xl hover:cursor-pointer border-2 hover:border-blue-700'><MdEditSquare className='text-blue-700 text-xl' /></button>
                    <button onClick={(e)=>{handleDelete(e, item.id)}} className='bg-[#282727] px-5 py-2 md:py-3 rounded-xl hover:cursor-pointer border-2 hover:border-red-700'><RiDeleteBin6Fill className='text-red-600 text-xl' /></button>
                  </div>
                </div>})}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      <Footer/>
    </>
  )
}

export default App