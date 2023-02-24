// Select elements 

const clear= document.querySelector(".clear")
const dateElement = document.getElementById("date")
const list = document.getElementById("list")
const input = document.getElementById("input")

// Classes names
const CHECK = "fa-check-circle"
const UNCHECK = "fa-circle-thin"
const LINE_THROUGH = "lineThrough"

// Show todays date
const options = {weekday : "long", month:"short", day:"numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// variables 
let LIST, id  ;

// get item from localstorage
let data = localStorage.getItem("TODO")

// check if data exists 

if(data){
    LIST = JSON.parse(data)
    id = LIST.length // setting the id to the last one in the list 
    loadList(LIST)  // load the list to the user interface 
} else{
    LIST = []
    id = 0
}

// load items to user interface 

function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash)
    }  ) 
        
    
}

//clear the local storge
clear.addEventListener("click", function(){
    localStorage.clear()
    location.reload()
})



// add to do function 

function addToDo(toDo,id, done, trash){

    if(trash){return;}
    const DONE = done ? CHECK : UNCHECK
    const LINE = done ? LINE_THROUGH : ""
    const item = `<li class="item">
                        <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                        <p class="text ${LINE}">${toDo}</p>
                        <i class="fa fa-trash-o de" job="delete" id="${id}" ></i>
                  </li>`
    const position = "beforeend"
    list.insertAdjacentHTML(position, item)
}



// add an item to the list when the user hit the enter key 
document.addEventListener("keyup",function(event){
    if(event.keyCode == 13){
        const toDo =input.value 
        // checking if the input isnt empty
        if(toDo){
            addToDo(toDo,id, false, false)
            LIST.push({
                name: toDo,
                id: id,
                done: false, 
                trash: false
            })
            // add item to localstorage whenever our list is updated 
            localStorage.setItem("TODO", JSON.stringify(LIST))
            id++
        }
        input.value = ""
    }
})

// function to complete a to do 

function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    
    LIST[element.id].done = LIST[element.id].done ? false : true;
}


// function to remove to do to trash
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode)

    LIST[element.id].trash = true
    

}

// Event listener to target the items created dynamically 
list.addEventListener("click", function(event){
    const element = event.target // returns the clicked element inside the list 
    const elementJob = element.attributes.job.value // complete or delete

    if(elementJob == "complete"){
        completeToDo(element)
    }else if(elementJob == "delete"){
        removeToDo(element)
         
    }
    // add item to localstorage whenever our list is updated 
    localStorage.setItem("TODO", JSON.stringify(LIST))
})














































