const todoInputText = document.getElementById("todo-input-item");
const addBtn = document.querySelector(".todo-add");
const delBtn = document.querySelector(".todo-remove");
const highBtn = document.querySelector(".todo-toggle");
const sortBtn = document.querySelector(".todo-sort");
const disList = document.querySelector(".todo-list");

var list = [];

addBtn.addEventListener("click", addItem);
delBtn.addEventListener('click', deleteChecked);
highBtn.addEventListener('click', highLightItems);
sortBtn.addEventListener('click',sortTodoList);

function initTest(){
    list.push({task: "Make Breakfast", highlighted: false, checked: false, rank: list.length});
    list.push({task: "Math homework", highlighted: false, checked: false, rank: list.length});
    list.push({task: "Pick up the kids", highlighted: false, checked: false, rank: list.length});
    list.push({task: "Take a shower", highlighted: false, checked: false, rank: list.length});
    displayList();
}

function addItem(){
    var itemText = todoInputText.value;
    if(itemText.length > 0){
        list.push({task: itemText, highlighted: false, checked: false, rank: list.length});
    }
    
    todoInputText.value = "";
    displayList();
    console.log(list);
} 

function deleteChecked(){
    list = list.filter(item => item.checked == false);
    console.log(list);
    displayList();
}

function checkedItem(item){

    const todoItem = item.target.parentElement.innerText;
    //console.log(todoItem);
    const todoItemIndex = list.findIndex(i => i.task == todoItem);

    if(item.target.checked){
        list[todoItemIndex].checked = true;
    }else{
        list[todoItemIndex].checked = false;
    }
    
}

function highLightItems(){  
    var displayList = document.getElementsByTagName('li');
    console.log(displayList);

    for(let i = 0; i < list.length; i++){
        if(list[i].checked == true){
            if(list[i].highlighted == true){
                console.log(displayList[i]);
                displayList[i].classList.remove("todo-item-highlight");
                list[i].highlighted = false;
            }else{
                displayList[i].classList.add("todo-item-highlight");
                list[i].highlighted = true;
            }
        }
    }
}

function sortTodoList(){
    list.sort(function(a,b){
        var todoItem1 = a.task.toUpperCase();
        var todoItem2 = b.task.toUpperCase();
        if (todoItem1 < todoItem2) {
            return -1;
        }
        if (todoItem1 > todoItem2) {
            return 1;
        }
          return 0;
    });
    displayList();
}

function displayList(){
    disList.innerHTML = "";
    for(let i = 0; i < list.length; i++){
        const listItem = document.createElement("li");
        listItem.innerText = list[i].task;
        listItem.classList.add("todo-item");

        if(list[i].highlighted) listItem.classList.add("todo-item-highlight");

        const listItemCheck = document.createElement("input");
        listItemCheck.type = "checkbox";
        listItemCheck.onchange = checkedItem;

        if(list[i].checked) listItemCheck.checked = true;

        listItem.appendChild(listItemCheck);

        disList.appendChild(listItem);
    }
}

