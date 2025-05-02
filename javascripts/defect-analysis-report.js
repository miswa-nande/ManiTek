// Defect Analysis Report JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the report
    initializeDefectReport();
    
    // Set up event listeners
    document.getElementById('exportBtn').addEventListener('click', exportReport);
});

// Initialize the defect report
function initializeDefectReport() {
    // Load defect data
    loadDefectData();
    
    // You could also add filter controls, date pickers, etc. here
}

// Load defect data from the database
function loadDefectData() {
    const tableBody = document.querySelector('#defectReportTable tbody');
    
    // Show loading indicator
    tableBody.innerHTML = `
        <tr>
            <td colspan="5" class="loading-indicator">Loading defect analysis data...</td>
        </tr>
    `;
    
    // In a real application, you would fetch data from your database
    // For demonstration, we'll use sample data
    setTimeout(() => {
        // This timeout simulates network delay
        // Replace with actual API call in production
        
        // Sample data - replace with your database call
        const defectData = [
            {
                date: '2025-04-25',
                defectType: 'Discoloration',
                defectPercentage: 5.2,
                affectedBatchNumber: 'B-10045',
                totalDefectiveCount: 156
            },
            {
                date: '2025-04-26',
                defectType: 'Undersized',
                defectPercentage: 3.8,
                affectedBatchNumber: 'B-10046',
                totalDefectiveCount: 114
            },
            {
                date: '2025-04-27',
                defectType: 'Shell Fragments',
                defectPercentage: 4.5,
                affectedBatchNumber: 'B-10047',
                totalDefectiveCount: 135
            },
            {
                date: '2025-04-28',
                defectType: 'Mold',
                defectPercentage: 1.2,
                affectedBatchNumber: 'B-10048',
                totalDefectiveCount: 36
            }
            // Add more data as needed
        ];
        
        displayDefectData(defectData);
    }, 500);
}

// Display defect data in the table
function displayDefectData(data) {
    const tableBody = document.querySelector('#defectReportTable tbody');
    
    // Clear the table first
    tableBody.innerHTML = '';
    
    if (data.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center; padding: 20px;">No defect data available</td>
            </tr>
        `;
        return;
    }
    
    // Add data rows
    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${formatDate(item.date)}</td>
            <td>${item.defectType}</td>
            <td>${item.defectPercentage}%</td>
            <td>${item.affectedBatchNumber}</td>
            <td>${item.totalDefectiveCount}</td>
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
    alert('Exporting defect analysis report...');
    
    // In a real application, you would implement proper export functionality here
    // Options include:
    // 1. Generate PDF using a library like jsPDF
    // 2. Export to Excel using libraries like SheetJS
    // 3. Send a request to the server to generate and return the file
    
    // Example implementation for server-side export might look like:
    /*
    fetch('/api/reports/defects/export', {
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
        a.download = 'defect-analysis-report.pdf';
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