let allTasks = [];
let peopleAssigned = [];
let morePeopleCount = 1;
let categories= ['Marketing','Sales','Product','Management'];
let contacts = [
    [1, 'Darrin S. Jones', 'Darrin@gmail.com', 'img/profile1.jpg'],
    [2, 'Robert D. Cover', 'robert@gmail.com', 'img/profile2.jpg'],
    [3, 'Terri W. Bec', 'terri@gmail.com', 'img/profile3.jpg'],
    [4, 'Darrin S. Jones', 'Darrin@gmail.com', 'img/profile1.jpg'],
    [5, 'Robert D. Cover', 'robert@gmail.com', 'img/profile2.jpg'],
    [6, 'Terri W. Bec', 'terri@gmail.com', 'img/profile3.jpg']
];
let newTaskHTML;
//let contactName;	
//let contactEmail; 	
//let contactImg; 	
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
    let urgency = document.getElementById('task-urgency').value;
    let details = document.getElementById('task-details').value;
    let task = {
        'title': title,
        'createdAt': new Date().getTime(),
        'dueDate': dueDate,
        'category': category,
        'urgency': urgency,
        'details': details,
        'peopleAssigned': peopleAssigned
    };
    if (peopleAssigned < 1) {
        alert("Please select at least one person for the task");
    } else {
        allTasks.push(task);
        let allTasksAsString = JSON.stringify(allTasks);
        localStorage.setItem('allTasks', allTasksAsString);
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
    loadAllTasks();
    let list = document.getElementById('list-box');

    // Load data of each specific task and add it to task-list	
    for (i = 0; i < allTasks.length; i++) {
        let task = allTasks[i];
        let peopleAssigned = task.peopleAssigned;
        let category = task.category;
        let details = task.details;
        // Compile HTML-code for the new task-list-item
        newTaskHTML = compileListItemHTML(category, peopleAssigned, details);
        // Append HTML-code of a specific task to task list
        list.insertAdjacentHTML("beforeend", newTaskHTML);
    }
}
function compileListItemHTML(category, peopleAssigned, details) {
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
                    <p>${details}</p> 	
                </div>`;

    return newTaskHTML;
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

    contactDataHTML += `<div class="contact-data">
                            <p>${contactName}</p> 	
                            <p class="email">${contactEmail}</p> 	
                        </div>`;
    return contactDataHTML;
}

function fetchContactData(personAssigned) {
    if (personAssigned == '1'){	
        taskContact = contacts[0];	
    } else if (personAssigned == '2') {	
        taskContact = contacts[1];	
    } else if (personAssigned == '3') {	
        taskContact = contacts[2]; 	
    }	
    return taskContact;
}



// JS for the matrix seite

//Load all tasks to the matrix
function loadTasksMatrix() {
    loadAllTasks();
    for (i = 0; i < allTasks.length; i++) {
        compileTaskMatrixHTML("do-blue-box",i+1, i);
        assignCategory(allTasks[i].category, i+1, i);
        console.log(`task${i}`);
    }
}
//HTML code for each task to add to the matrix
function compileTaskMatrixHTML(id, taskId, i) {
    document.getElementById(id).insertAdjacentHTML('beforeend', `<div class='task-box' id='task${taskId}'>
    <div class='task-date'>${allTasks[i].dueDate}</div>
    <div class='task-title'>${allTasks[i].title}</div>
    <div class='task-description'>${allTasks[i].details}</div>
    <div class='task-box-bottom'>
        <div class='task-box-bottom-category'>
            <div class='task-category'>${allTasks[i].category}</div></div>
        <div class='task-box-bottom-pictures'>`
        + peopleAssignedPictures(allTasks[i]))

}
//Fetches pictures of all assigned people for a task
function peopleAssignedPictures(task) {
    let picturesHTML = "";
    for (j = 0; j < task.peopleAssigned.length; j++) {
        picturesHTML += `<img src='${contacts[task.peopleAssigned[j]-1][3]}'>`;
    }
    return picturesHTML;
}

//Assings a color for the task border depending on the category
function assignCategory(category, id, i) {
    let cssCategories= ['category-1','category-2','category-3','category-4'];
    for(i=0;i < categories.length; i++){
      if (category == categories[i]){
        document.getElementById(`task${id}`).classList.add(cssCategories[i]);
      }
    }
    
}