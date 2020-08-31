let allTasks = [];
let peopleAssigned = [];
let morePeopleCount = 1;
const categories = ['Marketing', 'Sales', 'Product', 'Management'];
const contacts = [
    [1, 'Darrin S. Jones', 'Darrin@gmail.com', 'img/profile1.jpg'],
    [2, 'Robert D. Cover', 'robert@gmail.com', 'img/profile2.jpg'],
    [3, 'Terri W. Bec', 'terri@gmail.com', 'img/profile3.jpg'],
    [4, 'Darrin S. Jones', 'Darrin@gmail.com', 'img/profile1.jpg'],
    [5, 'Robert D. Cover', 'robert@gmail.com', 'img/profile2.jpg'],
    [6, 'Terri W. Bec', 'terri@gmail.com', 'img/profile3.jpg']
];
let newTaskHTML;
let specialCategory;
let allTasksSelected = [];

/**
 * Lets overlay-menu slide in and sets black backdrop 
 */
function showMenu() {
    document.getElementById('menu-overlay').classList.add('show-menu-overlay');
    document.getElementById('menu-backdrop').classList.remove('d-none');
}

/**
 * Lets overlay menu slide out and removes backdrop
 */
function closeMenu() {
    document.getElementById('menu-overlay').classList.remove('show-menu-overlay');
    document.getElementById('menu-backdrop').classList.add('d-none');
}

function reloadAllTasks(){
    let allTasksAsString = JSON.stringify(allTasks);
    localStorage.setItem('allTasks', allTasksAsString); 
    location.reload();
}

/**
 * When plus-button is clicked, more people will be shown
 */
function showMorePeople() {
    if (contacts.length != null) {
        for (i = 0; i < 3; i++) {
            if (morePeopleCount < contacts.length) {
                morePeopleCount++;
                document.getElementById('plus-btn').insertAdjacentHTML('beforebegin', `<img onclick='selectPerson(this.id)' class='assigned-pic' src='${contacts[morePeopleCount - 1][3]}' id='${morePeopleCount}'>`);
            } else document.getElementById('plus-btn').classList.add('d-none')
        }
    }
}

/**
 * if person is already selected, remove selection and remove from peopleAssigned array; else select & add to array	
 */
function selectPerson(id) {
    if (document.getElementById(id).classList.contains('selected-person-pic')) {
        document.getElementById(id).classList.remove('selected-person-pic');
        for (i = 0; i < peopleAssigned.length; i++) {
            if (peopleAssigned[i] == id) {
                peopleAssigned.splice(i, 1);
            }
        }
    } else if (!document.getElementById(id).classList.contains('selected-person-pic')) {
        document.getElementById(id).classList.add('selected-person-pic');
        peopleAssigned.push(id);
    }
}

/**
 * Generate JSON-object with provided info
 */
function addTask() {
    let title = document.getElementById('task-title').value;
    let dueDate = document.getElementById('task-due-date').value;
    let category = document.getElementById('task-category').value;
    let importance = document.getElementById('task-importance').value;
    let details = document.getElementById('task-details').value;
    let task = {
        'title': title,
        'createdAt': new Date().getTime(),
        'dueDate': dueDate,
        'category': category,
        'importance': importance,
        'details': details,
        'peopleAssigned': peopleAssigned
    };
    taskSubmission(task);
}

/**
 * Check if all mandatory info is provided an push task to allTasks-array
 * @param {*} task 
 */
function taskSubmission(task) {
    if (peopleAssigned < 1) {
        alert("Please select at least one person for the task");
    } else {
        allTasks.push(task);
        let allTasksAsString = JSON.stringify(allTasks);
        localStorage.setItem('allTasks', allTasksAsString);
        window.location.href = 'index.html';
    }
}

function loadAllTasks() {
    if (localStorage.getItem('allTasks') != null) {
        let allTasksAsString = localStorage.getItem('allTasks');
        allTasks = JSON.parse(allTasksAsString);
    }
}

/**
 * Saves changes of task-details
 */
function changeDetails(detailsId, taskIndex){
    let details = document.getElementById(detailsId).innerHTML;
    let task = allTasks[taskIndex];
    task.details = details;
    let allTasksAsString = JSON.stringify(allTasks);
    localStorage.setItem('allTasks', allTasksAsString);
}

/**
 * Add HTML-Code to create a delete-btn in task-list and matrix
 */
function createDeleteBtnHTML(i) {
    let deleteBtn =  `<button type="button" class="close" data-target="#deleteConfirmation" id="${i}" data-toggle="modal" data-placement="top" title="Delete task" >
                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>
                    </button>
                    </div>`;
    return deleteBtn;
}