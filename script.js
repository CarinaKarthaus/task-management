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