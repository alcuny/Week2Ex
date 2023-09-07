
const myForm = document.getElementsByTagName('form')[0];
const myTable = document.getElementsByTagName('table')[0];
const empty = document.getElementById('empty-table');

myForm.addEventListener('submit', (event) => {
  // if not for this the data would disapear  
  event.preventDefault();
  
  const username = document.getElementById('input-username').value;
  const email = document.getElementById('input-email').value;
  // cheks if the ckeckbox is true or false(checked or unchecked)
  const admin = document.getElementById('input-admin').checked ? 'X' : '-';
  // adding a new row only if the username doesn't already exist
  if(duplicateChecker(username, email, admin) == false){
  
  // building a row scruture. Buildingblocks: td tags and a tr tag
  const newRow = document.createElement('tr');
  const usernameCell = document.createElement('td');
  usernameCell.textContent = username;
  newRow.appendChild(usernameCell);
  const emailCell = document.createElement('td');
  emailCell.textContent = email;
  newRow.appendChild(emailCell);
  const adminCell = document.createElement('td');
  adminCell.textContent = admin;
  newRow.appendChild(adminCell);
  myTable.querySelector('tbody').appendChild(newRow);
  
  }
});

// When a duplicate is found edits the existing cell, is called when submiting form
function duplicateChecker(username, email, admin) {
    
    let check = false;

    const rows = myTable.querySelectorAll('tbody tr');
    //console.log(rows[0].childNodes[0].textContent);
    for (let row = 0; row < rows.length; row++) { 
        
        if(username === rows[row].childNodes[0].textContent){
            rows[row].childNodes[1].textContent = email;
            rows[row].childNodes[2].textContent = admin;
            check = true
        }    
    }
    return check
}

empty.addEventListener('click', function() {
    // selecting all the rows from the body
    const rows = myTable.querySelectorAll('tbody tr');
    // removing the rows one by one
    for (let row = 0; row < rows.length; row++) { 
        rows[row].parentNode.removeChild(rows[row]);    
}

})
