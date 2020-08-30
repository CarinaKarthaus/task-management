//JS for task-list (index.html)	

/**
 * Main function to load tasks from array and append them to task-list
 */
function showTasks() {
    loadAllTasks();
    // Load array of allTasks and access task-list
    if (allTasks.length != 0) {
        document.getElementById('empty-task-list-box').classList.add('d-none');
    }
    let list = document.getElementById('list-box');
    compileAndAddTask(list);
}   

/**
 * Load data of each specific task and add it to task-list	
 * @param {*} list 
 */
function compileAndAddTask(list) {
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
    assembleHtmlSnippets(picSectionHTML, contactDataHTML, category, i, details);    
    return newTaskHTML;
}

function addDeleteBtnHTML(i) {
    let deleteBtn =  `<button type="button" class="close" data-target="#deleteConfirmation" id="${i}" data-toggle="modal" data-placement="top" title="Delete task" >
                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>
                    </button>
                    </div>`;
    return deleteBtn;
}

/**
 * Put together all HTML-code-elements of the task-list-item
 */
function assembleHtmlSnippets(picSectionHTML, contactDataHTML, category, i, details) {

    newTaskHTML += picSectionHTML + ` </div> <div class="contact-data-section">` + contactDataHTML;

    newTaskHTML +=      `</div>
                    </div> 	
                    <p class="task-category">${category}</p> 	
                    <p id="details${i}" contenteditable="true" class="details" onkeyup="changeDetails(this.id, ${i})"{ >${details}</p>`;
    let deleteBtn = addDeleteBtnHTML(i);
    newTaskHTML += deleteBtn;
}
        
/**
 * Create first part of HTML-code for task-list-item
 */
function compileListItemStart(category) {
    specialCategory = categoryCheck(category);
    newTaskHTML = `	
            <div class="task-listed"> 	
                <div class="category-marker ${specialCategory}"></div>  	
                    <div class="assignee-section">
                        <div class= "assignee-pic-section" >`;
    return newTaskHTML;
}

/**
 * Check task-category to assign correct color for category-marker	 
 */
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

/**
 * compile pictures of assigned people for task and return it	
 */
function compilePicSection(personAssigned, picSectionHTML) {
    let taskContact = fetchContactData(personAssigned);
    let contactImg = taskContact[3];
    picSectionHTML += `<img src=${contactImg}>`;
    return picSectionHTML;
}

/**
 * Compile contact data of assigned people
 */
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