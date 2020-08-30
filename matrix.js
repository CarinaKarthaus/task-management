// JS for the matrix seite

/**
 * Selects tasks to allow assigning new values for urgency and/or importance (see assignParameter())
 */
function selectTask(taskId) {
    highlightAllArrows();
    let id = taskId-1;
    let selectedTaskHTML = document.getElementById('task' + taskId).classList;
    if (selectedTaskHTML.contains('selected-task')) {
        selectedTaskHTML.remove('selected-task');
        for (s = 0; s < allTasksSelected.length; s++) {
            if (allTasksSelected[s] == id) {
                allTasksSelected.splice(s, 1);
            };
        }
    } else if (!selectedTaskHTML.contains('selected-task')) {
        selectedTaskHTML.add('selected-task');
        allTasksSelected.push(id);
    };
}


/**
 * Assigns importance and urgency manually by clicking the arrows in matrix.html
 */
function changeKeyValuePair(key, value){
    for (n=0; n < allTasksSelected.length; n++) {
        let taskId = allTasksSelected[n];
        let taskSelected = allTasks[taskId];
        document.getElementById('task' + (taskId+1)).classList.remove('selected-task');
        if (key == 'urgency'){
            taskSelected.urgency = value;
        } else if (key == 'importance') {
            taskSelected.importance = value;
        }
    };
    allTasksSelected = [];
    reloadAllTasks();
}

/**
 * Removes empty-task-list notification and unhides blue matrix-boxes
 */
function loadMatrixArea(){
    if (allTasks.length != 0){
        document.getElementById('empty-task-list-box').classList.add('d-none');
        document.getElementById('do-blue-box').classList.remove('d-none');
        document.getElementById('schedule-blue-box').classList.remove('d-none');
        document.getElementById('delegate-blue-box').classList.remove('d-none');
        document.getElementById('eliminate-blue-box').classList.remove('d-none');
    };
}

/**
* Load all tasks, the matrix area (blue boxes) and assign them to the different boxes in the matrix
*/
function loadTasksMatrix() {
    loadAllTasks();
    loadMatrixArea();
    assignTaskToBox();
}

/**
 * Check urgency & importance and assign the tasks to the correct box 
 */
function assignTaskToBox() {
    let urgency;
    let importance;
    for (i = 0; i < allTasks.length; i++) {
        if (allTasks[i].urgency == null ) urgency = checkUrgency(i);
        else urgency = allTasks[i].urgency;

        importance = allTasks[i].importance;
        if (urgency == "High" && importance == "High") compileTaskMatrixHTML("do-blue-box", i + 1, i, "Low");
        else if (urgency == "High" && importance == "Low") compileTaskMatrixHTML("delegate-blue-box", i + 1, i, "High");
        else if (urgency == "Low" && importance == "High") compileTaskMatrixHTML("schedule-blue-box", i + 1, i, "Low");
        else if (urgency == "Low" && importance == "Low") compileTaskMatrixHTML("eliminate-blue-box", i + 1, i, "High");
        assignCategory(allTasks[i].category, i + 1, i);
    }
}
    
/**
 * Check and return urgency level
 *  */
function checkUrgency(i) {
    let currentDate = new Date();
    let taskDueDate = new Date(allTasks[i].dueDate);

    // Transfer dates and times into millisecond-value
    let sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;
    let currentDateInMs = currentDate.getTime();
    let taskDueDateInMs = taskDueDate.getTime();

    if (taskDueDateInMs < (currentDateInMs + sevenDaysInMs)) {
        return 'High';
    } else {
        return 'Low';
    }
}

/**
 * HTML code for each task to add to the matrix
 */
function compileTaskMatrixHTML(id, taskId, i, importanceNonSelected) {
    let dueDate = new Date(allTasks[i].dueDate);
    document.getElementById(id).insertAdjacentHTML('beforeend', `<div class='task-box' id='task${taskId}' onclick="selectTask(${taskId})">
    <div class='task-date'>${dueDate.getDate()}-${dueDate.getMonth()+1}-${dueDate.getFullYear()}</div>
    <button type="button" class="close delete-task" data-target="#deleteConfirmation" id="${i}" data-toggle="modal" data-placement="top" title="Delete task">
        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
        </svg>
    </button>
    <div class='task-title'>${allTasks[i].title}</div>
    <div class='task-description'><p id="details${i}" contenteditable="true" onkeyup="changeDetails(this.id,${i})">${allTasks[i].details}<p></div>
    <div class='task-category'>${allTasks[i].category}</div>
    <div id="task-importance" class="task-importance">
        <div id="importance-mark" class="importance-icon"><img src='./img/importance-icon.png'></div>
        <select onchange='changeImportance(${i})'>
            <option selected>${allTasks[i].importance}</option>
            <option>${importanceNonSelected}</option>
        </select>
    </div>
    <div class='task-box-bottom-pictures'>`
        + peopleAssignedPictures(allTasks[i]))
}

/**
 * Changes importance of a task and locate in the corresponding box
 */
function changeImportance(i) {
    alert("Importance has been changed, task will be relocated!");
    if (allTasks[i].importance == "High") {
        allTasks[i].importance = "Low";
    } else if (allTasks[i].importance == "Low") {
        allTasks[i].importance = "High";
    }
    reloadAllTasks();
}

/**
 * Fetches pictures of all assigned people for a task
 */
function peopleAssignedPictures(task) {
    let picturesHTML = "";
    for (j = 0; j < task.peopleAssigned.length; j++) {
        picturesHTML += `<img src='${contacts[task.peopleAssigned[j] - 1][3]}'>`;
    }
    return picturesHTML;
}

/**
 * Assings a color for the task border depending on the category
 */
function assignCategory(category, id, i) {
    let cssCategories = ['category-1', 'category-2', 'category-3', 'category-4'];
    for (i = 0; i < cssCategories.length; i++) {
        if (category == cssCategories[i]) {
            document.getElementById(`task${id}`).classList.add(cssCategories[i]);
        }
    }
}

/**
 * Highlights Arrows
 */
 function arrowHighlight(arrowId){
    document.getElementById(arrowId).firstElementChild.classList.add('arrow-line-highlight');
    document.getElementById(arrowId).lastElementChild.classList.add('arrow-end-highlight');
 }

 function arrowStopHighlight (arrowId) {   
    document.getElementById(arrowId).firstElementChild.classList.remove('arrow-line-highlight');
    document.getElementById(arrowId).lastElementChild.classList.remove('arrow-end-highlight');
 }

 function highlightAllArrows(){
    let arrowsDesktop = ['urgency-high-arrow-desktop','urgency-low-arrow-desktop','importance-high-arrow-desktop','importance-low-arrow-desktop'];
    let arrowsPortrait = ['urgency-high-arrow-portrait','urgency-low-arrow-portrait','importance-high-arrow-portrait','importance-low-arrow-portrait'];
    for(i=0;i<4;i++){
        addHighlightClass(arrowsDesktop, arrowsPortrait, i);
    }
    setTimeout(function(){
    for(j=0;j<4;j++){
        removeHighlightClass(arrowsDesktop, arrowsPortrait, j);
    }
    },500); 
}

function addHighlightClass(arrowsDesktop, arrowsPortrait,i) {
    document.getElementById(arrowsDesktop[i]).firstElementChild.classList.add('arrow-line-highlight');
    document.getElementById(arrowsDesktop[i]).lastElementChild.classList.add('arrow-end-highlight');
    document.getElementById(arrowsPortrait[i]).firstElementChild.classList.add('arrow-line-highlight');
    document.getElementById(arrowsPortrait[i]).lastElementChild.classList.add('arrow-end-highlight');
}

function removeHighlightClass(arrowsDesktop, arrowsPortrait,j) {
    document.getElementById(arrowsDesktop[j]).firstElementChild.classList.remove('arrow-line-highlight');
    document.getElementById(arrowsDesktop[j]).lastElementChild.classList.remove('arrow-end-highlight');
    document.getElementById(arrowsPortrait[j]).firstElementChild.classList.remove('arrow-line-highlight');
    document.getElementById(arrowsPortrait[j]).lastElementChild.classList.remove('arrow-end-highlight');
}