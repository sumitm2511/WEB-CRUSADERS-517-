const inputbox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const prioritySelector=document.getElementById("priority-selector");
const dueDateInput = document.getElementById("due-date");
function addtask(){
    if(inputbox.value === ''){
        alert("write something")
    }
    else{
        const currentdate = new Date();
        const dateString = currentdate.toLocaleDateString();

        let existingTask = findExistingTask(inputbox.value);

        if(!existingTask){
            existingTask = document.createElement("li");
            listContainer.appendChild(existingTask);
        }

        existingTask.innerHTML += `<br>${inputbox.value} (${prioritySelector.value}) - ${dateString}`;
        existingTask.className = prioritySelector.value;

        

        if(dueDateInput.value !== ''){
            const dueDate = new Date(dueDateInput.value);
            const dueDateString = dueDate.toLocaleDateString();
            existingTask.innerHTML += `- Due: ${dueDateString}`;
            existingTask.classList.add("due-date");
        }



        
        let span = document.createElement("span")
        span.innerHTML = "\u00d7";
        existingTask.appendChild(span);
    }

    inputbox.value="";
    prioritySelector.value="low";
    dueDateInput.value ="";
    savedata();
    sortTasks();
}

function findExistingTask(taskName){
    const tasks = Array.from(listContainer.children);
    return tasks.find(task => task.innerText.toLowerCase().startsWith(taskName.toLowerCase()));
}

listContainer.addEventListener("click",function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        savedata();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        savedata();
        sortTasks();
    }
}, false);

r[a] - priorityOrder[b];

function opendatePicker(){
    const dueDateInput = document.getElementById("due-date");
    dueDateInput.type = "date";
    dueDateInput.focus();
    setTimeout(() => {
        dueDateInput.type = "text";
    }, 100);
}


function showSortOptions( ){
    const sortOptions = document.getElementById('sort-options');
    sortOptions.style.display=(sortOptions.style.display === 'none' || sortOptions.style.display === '') ? 'block' : 'none';
}

function applySort() {
    const sortSelect = document.getElementById('sort-select');
    const selectedOption = sortSelect.value;

    if(selectedOption === 'priority'){
        sortTasksByPriority();
    }
    else if(selectedOption === 'due-date'){
        sortTasksByDueDate();
    }

    hideSortOptions();
}

function hideSortOptions(){
    const sortOptions =document.getElementById('sort-options');
    sortOptions.style.display = 'none';
}


let tasks;


function sortTasksByPriority(){
    const tasks = Array.from(listContainer.children);
    tasks.sort((a,b)=>{
    const aPriority = getPriorityValue(a);
    const bPriority = getPriorityValue(b);
    return priorityCompare(aPriority,bPriority);
});
listContainer.innerHTML = '';
tasks.forEach(task => listContainer.appendChild(task));
}

function sortTasksByDueDate() {
    const tasks = Array.from(listContainer.children);
    tasks.sort((a, b) => {
        const aDate = extractDueDate(a);
        const bDate = extractDueDate(b);
        return aDate - bDate;
    });
    listContainer.innerHTML = '';
    tasks.forEach(task => listContainer.appendChild(task));
}






function savedata() {
    localStorage.setItem("data",listContainer.innerHTML); 
}
function showtask() {
    listContainer.innerHTML = localStorage.getItem("data");   
}
showtask();