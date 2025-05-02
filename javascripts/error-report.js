// Error Alert Report JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the report
    initializeErrorReport();
    
    // Set up event listeners
    document.getElementById('exportBtn').addEventListener('click', exportReport);
});

// Initialize the error report
function initializeErrorReport() {
    // Load error data
    loadErrorData();
    
    // You could also add filter controls, date pickers, etc. here
}

// Load error data from the database
function loadErrorData() {
    const tableBody = document.querySelector('#errorAlertTable tbody');
    
    // Show loading indicator
    tableBody.innerHTML = `
        <tr>
            <td colspan="5" class="loading-indicator">Loading error data...</td>
        </tr>
    `;
    
    // In a real application, you would fetch data from your database
    // For demonstration, we'll use sample data
    setTimeout(() => {
        // This timeout simulates network delay
        // Replace with actual API call in production
        
        // Sample data - replace with your database call
        const errorData = [
            {
                date: '2025-04-25',
                errorType: 'System Malfunction',
                description: 'Sorting machine stopped responding during operation',
                resolutionStatus: 'Resolved',
                notes: 'Reset system and updated firmware'
            },
            {
                date: '2025-04-26',
                errorType: 'Quality Alert',
                description: 'Higher than normal defect rate detected in batch #A-2345',
                resolutionStatus: 'Pending',
                notes: 'Investigation ongoing, likely supplier issue'
            },
            {
                date: '2025-04-27',
                errorType: 'Network Error',
                description: 'Connection to central database lost for 15 minutes',
                resolutionStatus: 'Resolved',
                notes: 'Network router restarted, monitoring for further issues'
            }
            // Add more data as needed
        ];
        
        displayErrorData(errorData);
    }, 500);
}

// Display error data in the table
function displayErrorData(data) {
    const tableBody = document.querySelector('#errorAlertTable tbody');
    
    // Clear the table first
    tableBody.innerHTML = '';
    
    if (data.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center; padding: 20px;">No error data available</td>
            </tr>
        `;
        return;
    }
    
    // Add data rows
    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${formatDate(item.date)}</td>
            <td>${item.errorType}</td>
            <td>${item.description}</td>
            <td>${item.resolutionStatus}</td>
            <td>${item.notes}</td>
        `;
        tableBody.appendChild(row);
    });
    
    // Add empty rows to match the original design (7 rows total)
    const emptyRowsNeeded = 7 - data.length;
    for (let i = 0; i < emptyRowsNeeded; i++) {
        const emptyRow = document.createElement('tr');
        emptyRow.classList.add('empty-row');
        emptyRow.innerHTML = `
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        `;
        tableBody.appendChild(emptyRow);
    }
}

// Helper function to format dates
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Export report functionality
function exportReport() {
    // Show export in progress
    alert('Exporting error/alert report...');
    
    // In a real application, you would implement proper export functionality here
    // Options include:
    // 1. Generate PDF using a library like jsPDF
    // 2. Export to Excel using libraries like SheetJS
    // 3. Send a request to the server to generate and return the file
    
    // Example implementation for server-side export might look like:
    /*
    fetch('/api/reports/errors/export', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            format: 'pdf',
            // Add any filters or date ranges here
        })
    })
    .then(response => response.blob())
    .then(blob => {
        // Create download link
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'error-alert-report.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    })
    .catch(error => {
        console.error('Export failed:', error);
        alert('Export failed. Please try again.');
    });
    */
}