let notes = JSON.parse(localStorage.getItem("taskmaster_notes")) || [];
let editIndex = null;

function saveStorage(){
    localStorage.setItem("taskmaster_notes", JSON.stringify(notes));
}

function renderNotes(){
    const area = document.getElementById("notes");

    area.innerHTML = `
        <div class="add-card">
            <button onclick="openTypeChoice()">+</button>
        </div>
    `;

    notes.forEach((item,index)=>{
        const card = document.createElement("div");
        card.className = "card";

        if(item.type === "note"){
            card.innerHTML = `
                <h3>${item.title}</h3>
                <p>${item.content}</p>

                <div class="actions">
                    <button class="edit" onclick="editNote(${index})">Editar</button>
                    <button class="delete" onclick="deleteNote(${index})">Excluir</button>
                </div>
            `;
        }else{
            let list = "";

            item.tasks.forEach((task,t)=>{
                list += `
                <li>
                    <input type="checkbox"
                    ${task.done ? "checked" : ""}
                    onchange="toggleTask(${index},${t})">
                    <span>${task.text}</span>
                </li>
                `;
            });

            card.innerHTML = `
                <h3>${item.title}</h3>
                <ul>${list}</ul>

                <div class="actions">
                    <button class="edit" onclick="editTask(${index})">Editar</button>
                    <button class="delete" onclick="deleteNote(${index})">Excluir</button>
                </div>
            `;
        }

        area.appendChild(card);
    });
}

function deleteNote(index){
    notes.splice(index,1);
    saveStorage();
    renderNotes();
}

function openTypeChoice(){
    document.getElementById("typeModal").style.display="flex";
}

function closeModal(id){
    document.getElementById(id).style.display="none";
}

function openQuickNote(){
    closeModal("typeModal");
    document.getElementById("noteModal").style.display="flex";
}

function openTaskList(){
    closeModal("typeModal");
    document.getElementById("taskModal").style.display="flex";
    document.getElementById("tasksArea").innerHTML="";
    addTaskField();
}

function saveQuickNote(){
    const title = noteTitle.value;
    const text = noteText.value;

    if(title.trim()==="" || text.trim()==="") return;

    if(editIndex !== null){
        notes[editIndex] = {
            type:"note",
            title,
            content:text
        };
        editIndex = null;
    }else{
        notes.push({
            type:"note",
            title,
            content:text
        });
    }

    saveStorage();
    renderNotes();

    noteTitle.value="";
    noteText.value="";
    closeModal("noteModal");
}

function addTaskField(value=""){
    const row = document.createElement("div");
    row.className = "task-row";

    row.innerHTML = `
        <input type="text" value="${value}" placeholder="Tarefa...">
    `;

    tasksArea.appendChild(row);
}

function saveTaskList(){
    const title = taskTitle.value;
    const inputs = document.querySelectorAll("#tasksArea input");

    let tasks = [];

    inputs.forEach(i=>{
        if(i.value.trim() !== ""){
            tasks.push({
                text:i.value,
                done:false
            });
        }
    });

    if(title.trim()==="" || tasks.length===0) return;

    if(editIndex !== null){
        notes[editIndex] = {
            type:"task",
            title,
            tasks
        };
        editIndex = null;
    }else{
        notes.push({
            type:"task",
            title,
            tasks
        });
    }

    saveStorage();
    renderNotes();

    taskTitle.value="";
    tasksArea.innerHTML="";
    closeModal("taskModal");
}

function toggleTask(noteIndex,taskIndex){
    notes[noteIndex].tasks[taskIndex].done =
    !notes[noteIndex].tasks[taskIndex].done;

    saveStorage();
    renderNotes();
}

function editNote(index){
    editIndex = index;

    noteTitle.value = notes[index].title;
    noteText.value = notes[index].content;

    noteModal.style.display="flex";
}

function editTask(index){
    editIndex = index;

    taskTitle.value = notes[index].title;
    tasksArea.innerHTML = "";

    notes[index].tasks.forEach(t=>{
        addTaskField(t.text);
    });

    taskModal.style.display="flex";
}

renderNotes();