// Function to create a new input field group
function createInputFieldGroup() {
    const container = document.getElementById('inputContainer');
    const fieldGroup = document.createElement('div');
    fieldGroup.className = 'input-group';
    
    // Create label input
    const labelInput = document.createElement('input');
    labelInput.type = 'text';
    labelInput.placeholder = 'Enter label';
    labelInput.className = 'label-input';
    
    // Create data input
    const dataInput = document.createElement('input');
    dataInput.type = 'text';
    dataInput.placeholder = 'Enter data';
    dataInput.className = 'data-input';
    
    // Create remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-btn';
    removeBtn.onclick = function() {
        container.removeChild(fieldGroup);
    };
    
    // Append elements to field group
    fieldGroup.appendChild(labelInput);
    fieldGroup.appendChild(dataInput);
    fieldGroup.appendChild(removeBtn);
    
    // Add to container
    container.appendChild(fieldGroup);
}

// Function to save all data
function saveData() {
    const inputGroups = document.querySelectorAll('.input-group');
    const data = {};
    
    inputGroups.forEach(group => {
        const label = group.querySelector('.label-input').value.trim();
        const value = group.querySelector('.data-input').value.trim();
        
        if (label && value) {
            data[label] = value; // Store as key-value pair
        }
    });
    
    // Display saved data as plain text
    const dataDisplay = document.getElementById('dataDisplay');
    dataDisplay.innerHTML = ''; // Clear previous entries

    Object.entries(data).forEach(([key, value]) => {
        const entry = document.createElement('div');
        entry.textContent = value; // Display only the value
        
        // Create copy button
        const copyBtn = document.createElement('button');
        copyBtn.textContent = 'Copy';
        copyBtn.onclick = function() {
            navigator.clipboard.writeText(value) // Copy only the value
                .then(() => {
                    alert('Value copied to clipboard!');
                })
                .catch(err => {
                    console.error('Failed to copy: ', err);
                });
        };
        
        entry.appendChild(copyBtn);
        dataDisplay.appendChild(entry);
    });
    
    // Optional: Save to localStorage
    localStorage.setItem('formData', JSON.stringify(data));
    
    alert('Data saved successfully!');
}

// Function to clear all fields
function clearAll() {
    const container = document.getElementById('inputContainer');
    container.innerHTML = '';
    document.getElementById('dataDisplay').innerHTML = ''; // Clear displayed data
    localStorage.removeItem('formData');
}

// Function to load saved data
function loadSavedData() {
    const savedData = localStorage.getItem('formData');
    if (savedData) {
        const data = JSON.parse(savedData);
        const container = document.getElementById('inputContainer');
        
        for (const [label, value] of Object.entries(data)) {
            const fieldGroup = document.createElement('div');
            fieldGroup.className = 'input-group';
            
            const labelInput = document.createElement('input');
            labelInput.type = 'text';
            labelInput.placeholder = 'Enter label';
            labelInput.className = 'label-input';
            labelInput.value = label;
            
            const dataInput = document.createElement('input');
            dataInput.type = 'text';
            dataInput.placeholder = 'Enter data';
            dataInput.className = 'data-input';
            dataInput.value = value;
            
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.className = 'remove-btn';
            removeBtn.onclick = function() {
                container.removeChild(fieldGroup);
            };
            
            fieldGroup.appendChild(labelInput);
            fieldGroup.appendChild(dataInput);
            fieldGroup.appendChild(removeBtn);
            container.appendChild(fieldGroup);
        }
        
        // Display saved data
        saveData();
    }
}

// Event listeners
document.getElementById('addBtn').addEventListener('click', createInputFieldGroup);
document.getElementById('saveBtn').addEventListener('click', saveData);
document.getElementById('clearBtn').addEventListener('click', clearAll);

// Initialize with one field group
document.addEventListener('DOMContentLoaded', function() {
    loadSavedData();
    if (document.querySelectorAll('.input-group').length === 0) {
        createInputFieldGroup();
    }
});
