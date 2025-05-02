// User Activity Report JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the report
    initializeUserActivityReport();
    
    // Set up event listeners
    document.getElementById('exportBtn').addEventListener('click', exportReport);
});

// Initialize the user activity report
function initializeUserActivityReport() {
    // Load user activity data
    loadUserActivityData();
    
    // You could also add filter controls, date pickers, etc. here
}

// Load user activity data from the database
function loadUserActivityData() {
    const tableBody = document.querySelector('#userActivityTable tbody');
    
    // Show loading indicator
    tableBody.innerHTML = `
        <tr>
            <td colspan="4" class="loading-indicator">Loading user activity data...</td>
        </tr>
    `;
    
    // In a real application, you would fetch data from your database
    // For demonstration, we'll use sample data
    setTimeout(() => {
        // This timeout simulates network delay
        // Replace with actual API call in production
        
        // Sample data - replace with your database call
        const activityData = [
            {
                date: '2025-04-27',
                user: 'John Doe',
                action: 'Login',
                notes: 'First login of the day'
            },
            {
                date: '2025-04-27',
                user: 'John Doe',
                action: 'File Download',
                notes: 'Downloaded quarterly report'
            },
            {
                date: '2025-04-27',
                user: 'Jane Smith',
                action: 'Data Entry',
                notes: 'Updated customer records'
            },
            {
                date: '2025-04-28',
                user: 'Mark Johnson',
                action: 'Report Generation',
                notes: 'Created monthly summary'
            }
            // Add more data as needed
        ];
        
        displayUserActivityData(activityData);
    }, 500);
}

// Display user activity data in the table
function displayUserActivityData(data) {
    const tableBody = document.querySelector('#userActivityTable tbody');
    
    // Clear the table first
    tableBody.innerHTML = '';
    
    if (data.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="4" style="text-align: center; padding: 20px;">No activity data available</td>
            </tr>
        `;
        return;
    }
    
    // Add data rows
    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${formatDate(item.date)}</td>
            <td>${item.user}</td>
            <td>${item.action}</td>
            <td>${item.notes}</td>
        `;
        tableBody.appendChild(row);
    });
    
    // Add empty rows to match the design (fill the table with empty rows)
    const emptyRowsNeeded = 10 - data.length; // Assuming we want 10 rows total
    for (let i = 0; i < emptyRowsNeeded; i++) {
        const emptyRow = document.createElement('tr');
        emptyRow.classList.add('empty-row');
        emptyRow.innerHTML = `
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
    alert('Exporting user activity report...');
    
    // In a real application, you would implement proper export functionality here
    // Options include:
    // 1. Generate PDF using a library like jsPDF
    // 2. Export to Excel using libraries like SheetJS
    // 3. Send a request to the server to generate and return the file
    
    // Example implementation for server-side export might look like:
    /*
    fetch('/api/reports/user-activity/export', {
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
        a.download = 'user-activity-report.pdf';
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