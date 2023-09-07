
const myForm = document.getElementsByTagName('form')[0];
const myTable = document.getElementsByTagName('table')[0];
const empty = document.getElementById('empty-table');

myForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const username = document.getElementById('input-username').value;
    const email = document.getElementById('input-email').value;
    const admin = document.getElementById('input-admin').checked ? 'X' : '-';
    const pictureInput = document.getElementById('input-image');
    
    // Check if a file is selected
    if (pictureInput.files.length > 0) {
      const picture = pictureInput.files[0];
      
      // check if the username exist by calling duplicatechecker function
      if (!duplicateChecker(username, email, admin, picture)) {
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

        const img = document.createElement('img');
        img.src = URL.createObjectURL(picture);
        img.width = 64;
        img.height = 64;
        const imageCell = document.createElement('td'); // Create a new cell for the image
        imageCell.appendChild(img);
        newRow.appendChild(imageCell);

        myTable.querySelector('tbody').appendChild(newRow);
      }
    }
  });
  

// When a duplicate is found edits the existing cell, is called when submiting form
function duplicateChecker(username, email, admin, picture) {
    let check = false;
    const rows = myTable.querySelectorAll('tbody tr');
    
    for (let row = 0; row < rows.length; row++) { 
        if(username === rows[row].childNodes[0].textContent){
            rows[row].childNodes[1].textContent = email;
            rows[row].childNodes[2].textContent = admin;
            
            let img = rows[row].childNodes[3].querySelector('img');
            
            // If the img element doesn't exist in the fourth column, it will be created
            if (!img) {
                img = document.createElement('img');
                img.width = 64;
                img.height = 64;
                rows[row].childNodes[3].appendChild(img);
            }
            
            img.src = URL.createObjectURL(picture);
            
            check = true;
        }    
    }
    return check;
}


empty.addEventListener('click', function() {
    // selecting all the rows from the body
    const rows = myTable.querySelectorAll('tbody tr');
    // removing the rows one by one
    for (let row = 0; row < rows.length; row++) { 
        rows[row].parentNode.removeChild(rows[row]);    
}

})
