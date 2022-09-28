//?Selectors
const addBtn = document.getElementById("todo-button")
const todoInput = document.getElementById("todo-input")
const todoUl = document.getElementById("todo-ul")

let todos = JSON.parse(localStorage.getItem("TODOS")) || [];

const renderSavedTodos = ()=>{
    todos.forEach(todo => {
        createListElement(todo)
    });
};
renderSavedTodos();

addBtn.addEventListener("click",() =>{
    if(todoInput.value.trim() === ""){
        alert("Please enter a new todo")
    }else{
        const newTodo ={
            id: new Date().getTime(),
            completed: false,
            text: todoInput.value,
        };

        createListElement(newTodo); 

        todos.push(newTodo);


        localStorage.setItem("TODOS", JSON.stringify(todos));   
        console.log(todos);
        todoInput.value = ""
    } 
    

    
    
})

function createListElement(newTodo){
    const {id,completed,text} = newTodo; //!destr.
//? yeni bir li elementi olustur ve bu elemente obje icerisindeki
//? id degerini ve completed class'ini ata

    const li = document.createElement("li")
    // li.id =newTodo.id; 
    li.setAttribute("id",id);  

    //completed ? li.classList.add("checked") : "" 
    completed && li.classList.add("checked");
 //? okey ikonu olustur ve li elementine bagla
    const okIcon = document.createElement("i")
    okIcon.setAttribute("class","fas fa-check")
    li.appendChild(okIcon)
  
//? todo basligi icin bir p elementi ve yazi dugumu olusturarak li'ye bagla

const p = document.createElement("p")
const pTextNode = document.createTextNode(text)
p.appendChild(pTextNode);
li.appendChild(p);


//? delete ikonu olustur ve li elementine bagla
    const deleteIcon = document.createElement("i")
    deleteIcon.setAttribute("class","fas fa-trash")
    li.appendChild(deleteIcon)

    console.log(li);


    todoUl.appendChild(li)
}

todoUl.addEventListener("click",(e) =>{
    console.log(e.target);
    const id = e.target.parentElement.getAttribute("id")
    if(e.target.classList.contains("fa-trash")){
        e.target.parentElement.remove();

    todos =  todos.filter((todo) => todo.id!== Number(id))
    console.log(todos);
    localStorage.setItem("TODOS", JSON.stringify(todos)); 
    } 
 //? ilgili li elementinde checked adinda bir class'i varsa bunu sil
    //?  aksi takdirde ekle (DOM)
    if(e.target.classList.contains("fa-check")){
        e.target.parentElement.classList.toggle("checked")

        todos.map((todo, index) => {
            if (todo.id == id) {
              todos[index].completed = !todos[index].completed;
            }
          });
          console.log(todos);
      
          //?todos dizisinin son halini localStorage'e sakla
          localStorage.setItem("TODOS", JSON.stringify(todos));



    }
})

todoInput.addEventListener("keydown",(e) =>{
    if(e.code === "Enter"){
        addBtn.click()
    } 
})

window.onload =function (){
    todoInput.focus();
}