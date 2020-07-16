let allTasks = [];
let peopleAssigned = [];
let morePeopleCount = 1;
let categories = ['Marketing', 'Sales', 'Product', 'Management'];
let contacts = [
    [1, 'Darrin S. Jones', 'Darrin@gmail.com', 'img/profile1.jpg'],
    [2, 'Robert D. Cover', 'robert@gmail.com', 'img/profile2.jpg'],
    [3, 'Terri W. Bec', 'terri@gmail.com', 'img/profile3.jpg'],
    [4, 'Darrin S. Jones', 'Darrin@gmail.com', 'img/profile1.jpg'],
    [5, 'Robert D. Cover', 'robert@gmail.com', 'img/profile2.jpg'],
    [6, 'Terri W. Bec', 'terri@gmail.com', 'img/profile3.jpg']
];
let newTaskHTML;
let specialCategory;
//When plus-button is clicked, more people will be shown	
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
//if person is already selected, remove selection and remove from peopleAssigned array; else select & add to array	
function selectPerson(id) {
    if (document.getElementById(id).classList.contains('selected-person-pic')) {
        document.getElementById(id).classList.remove('selected-person-pic');
        for (i = 0; i < peopleAssigned.length; i++) {
            if (peopleAssigned[i] == id) {
                peopleAssigned.splice(i, 1);
                console.log(peopleAssigned);
            }
        }
    } else if (!document.getElementById(id).classList.contains('selected-person-pic')) {
        document.getElementById(id).classList.add('selected-person-pic');
        peopleAssigned.push(id);
        console.log(peopleAssigned);
    }
}
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
        console.log('Loaded all tasks: ', allTasks);
        console.log('People assigned: ' + peopleAssigned);
    }
}


//JS for task-list (index.html)	


// Main function to load tasks from array and append them to task-list 	
function showTasks() {
    // Load array of allTasks and access task-list
    if (allTasks.length != 0) {
        document.getElementById('empty-task-list').classList.add('d-none');
    }
    loadAllTasks();
    let list = document.getElementById('list-box');

    // Load data of each specific task and add it to task-list	
    for (i = 0; i < allTasks.length; i++) {
        let task = allTasks[i];
        let peopleAssigned = task.peopleAssigned;
        let category = task.category;
        let details = task.details;
        // Compile HTML-code for the new task-list-item
        newTaskHTML = compileListItemHTML(category, peopleAssigned, details, i);
        // Append HTML-code of a specific task to task list
        list.insertAdjacentHTML("beforeend", newTaskHTML);
    }
}
function compileListItemHTML(category, peopleAssigned, details, i) {
    // Create first part of HTML-code for task-list-item 
    newTaskHTML = compileListItemStart(category);

    let picSectionHTML = '';
    let contactDataHTML = '';

    // Create HTML-code for the picture & contact section based on who has been assigned 
    for (j = 0; j < peopleAssigned.length; j++) {
        picSectionHTML = compilePicSection(peopleAssigned[j], picSectionHTML);
        contactDataHTML = compileContactData(peopleAssigned[j], contactDataHTML);
    };
    // Put together all HTML-code-elements
    newTaskHTML += picSectionHTML + ` </div> <div class="contact-data-section">` + contactDataHTML;

    newTaskHTML += `
                        </div>
                    </div> 	
                    <p class="task-category">${category}</p> 	
                    <p class="details">${details}</p> 	
                    <button type="button" class="close" onclick="deleteTask(${i})">
                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>
                    </button>
                </div>`;

    return newTaskHTML;
}
// Deletes task from array and reloads page
function deleteTask(taskIndex) {
    alert('Task will be deleted');
    allTasks.splice(taskIndex, 1);
    let allTasksAsString = JSON.stringify(allTasks);
    localStorage.setItem('allTasks', allTasksAsString);
    location.reload();
}

// Create first part of HTML-code for task-list-item
function compileListItemStart(category) {
    specialCategory = categoryCheck(category);
    newTaskHTML = `	
            <div class="task-listed"> 	
                <div class="category-marker ${specialCategory}"></div>  	
                    <div class="assignee-section">
                        <div class= "assignee-pic-section" >`;
    return newTaskHTML;
}

// Check task-category to assign correct color for category-marker	
function categoryCheck(category) {
    if (category == 'Marketing') {
        specialCategory = 'Marketing';
    } else if (category == 'Sales') {
        specialCategory = 'ctg-sales';
    } else if (category == 'Product') {
        specialCategory = 'ctg-product';
    } else if (category == 'Management') {
        specialCategory = 'ctg-mgmt';
    };
    return specialCategory;
}
// compile pictures of assigned people for task and return it	
function compilePicSection(personAssigned, picSectionHTML) {
    let taskContact = fetchContactData(personAssigned);
    let contactImg = taskContact[3];
    picSectionHTML += `<img src=${contactImg}>`;
    return picSectionHTML;
}
// compile contact data of assigned people
function compileContactData(personAssigned, contactDataHTML) {
    let taskContact = fetchContactData(personAssigned);
    let contactName = taskContact[1];
    let contactEmail = taskContact[2];
    console.log(contactName);
    contactDataHTML += `<div class="contact-data">
                            <p>${contactName}</p> 	
                            <p class="email">${contactEmail}</p> 	
                        </div>`;
    return contactDataHTML;
}

function fetchContactData(personAssigned) {
    let personAssignedInt = parseInt(personAssigned);

    for (k = 1; k <= contacts.length; k++) {
        if (personAssignedInt == k) {
            taskContact = contacts[k - 1];
        } else {
            continue
        }
        return taskContact;
    }
}

// JS for the matrix seite

//Load all tasks to the different boxes in the matrix
function loadTasksMatrix() {
    loadAllTasks();
    let urgency;
    let importance;
    for (i = 0; i < allTasks.length; i++) {
        urgency = checkUrgency(i);
        importance = allTasks[i].importance;
        if (urgency == "High" && importance == "High") compileTaskMatrixHTML("do-blue-box", i + 1, i,"Low");
        else if (urgency == "High" && importance == "Low") compileTaskMatrixHTML("delegate-blue-box", i + 1, i, "High");
        else if (urgency == "Low" && importance == "High") compileTaskMatrixHTML("schedule-blue-box", i + 1, i, "Low");
        else if (urgency == "Low" && importance == "Low") compileTaskMatrixHTML("eliminate-blue-box", i + 1, i, "High");

        assignCategory(allTasks[i].category, i + 1, i);
    }
}

// Check and return urgency level
function checkUrgency(i) {
    let currentDate = new Date();
    let taskDueDate = new Date(allTasks[i].dueDate);
    console.log(taskDueDate);

    // Transfer dates and times into millisecond-value
    let sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;
    let currentDateInMs = currentDate.getTime();
    let taskDueDateInMs = taskDueDate.getTime();

    if (taskDueDateInMs < (currentDateInMs + sevenDaysInMs)) {
        console.log('High urgency' + currentDate.getDate());
        console.log('High urgency' + taskDueDate.getDate());
        return 'High';
    } else {
        console.log('Low urgency');
        return 'Low';
    }
}

//HTML code for each task to add to the matrix
function compileTaskMatrixHTML(id, taskId, i, importanceNonSelected) {
    let dueDate = new Date(allTasks[i].dueDate);
    document.getElementById(id).insertAdjacentHTML('beforeend', `<div class='task-box' id='task${taskId}'>
    <div class='task-date'>${dueDate.getDate()}-${dueDate.getMonth()}-${dueDate.getFullYear()}</div>
    <div class='task-title'>${allTasks[i].title}</div>
    <div class='task-description'>${allTasks[i].details}</div>
    <div class='task-box-bottom'>
        <div class='task-box-bottom-btns'>
            <div class='task-category'>${allTasks[i].category}</div>
            <select id="task-importance" class="task-importance" onchange='changeImportance(${i})'>
                <option selected>${allTasks[i].importance}</option>
                <option>${importanceNonSelected}</option>
            </select>
        </div>
        <div class='task-box-bottom-pictures'>`
        + peopleAssignedPictures(allTasks[i]))
}
//Changes importance of a task and locate in the corresponding box
function changeImportance(i){
    console.log(allTasks[i]);
    if(allTasks[i].importance == "High"){
        allTasks[i].importance == "Low";
    } else if (allTasks[i].importance == "Low"){
        allTasks[i].importance == "High";
    }
    loadAllTasks();
    console.log(allTasks[i].importance);
}
//Fetches pictures of all assigned people for a task
function peopleAssignedPictures(task) {
    let picturesHTML = "";
    for (j = 0; j < task.peopleAssigned.length; j++) {
        picturesHTML += `<img src='${contacts[task.peopleAssigned[j] - 1][3]}'>`;
    }
    return picturesHTML;
}

//Assings a color for the task border depending on the category
function assignCategory(category, id, i) {
    let cssCategories = ['category-1', 'category-2', 'category-3', 'category-4'];
    for (i = 0; i < cssCategories.length; i++) {
        if (category == cssCategories[i]) {
            document.getElementById(`task${id}`).classList.add(cssCategories[i]);
        }
    }
}