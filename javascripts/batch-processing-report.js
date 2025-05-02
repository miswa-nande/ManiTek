// Batch Processing Report JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the report
    initializeBatchReport();
    
    // Set up event listeners
    document.getElementById('exportBtn').addEventListener('click', exportReport);
});

// Initialize the batch processing report
function initializeBatchReport() {
    // Load batch data
    loadBatchData();
    
    // You could also add filter controls, date pickers, etc. here
}

// Load batch data from the database
function loadBatchData() {
    const tableBody = document.querySelector('#batchReportTable tbody');
    
    // Show loading indicator
    tableBody.innerHTML = `
        <tr>
            <td colspan="5" class="loading-indicator">Loading batch data...</td>
        </tr>
    `;
    
    // In a real application, you would fetch data from your database
    // For demonstration, we'll use sample data
    setTimeout(() => {
        // This timeout simulates network delay
        // Replace with actual API call in production
        
        // Sample data - replace with your database call
        const batchData = [
            {
                batchNumber: 'B001',
                date: '2025-04-25',
                totalPeanuts: 1250,
                defectivePeanuts: 18,
                processingTime: 45,
                packagingTime: 30
            },
            {
                batchNumber: 'B002',
                date: '2025-04-26',
                totalPeanuts: 1350,
                defectivePeanuts: 22,
                processingTime: 50,
                packagingTime: 35
            },
            {
                batchNumber: 'B003',
                date: '2025-04-27',
                totalPeanuts: 1200,
                defectivePeanuts: 15,
                processingTime: 42,
                packagingTime: 28
            }
            // Add more data as needed
        ];
        
        displayBatchData(batchData);
    }, 500);
}

// Display batch data in the table
function displayBatchData(data) {
    const tableBody = document.querySelector('#batchReportTable tbody');
    
    // Clear the table first
    tableBody.innerHTML = '';
    
    if (data.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center; padding: 20px;">No batch processing data available</td>
            </tr>
        `;
        return;
    }
    
    // Add data rows
    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.batchNumber}</td>
            <td>${formatDate(item.date)}</td>
            <td>${item.totalPeanuts} kg</td>
            <td>${item.defectivePeanuts} (${((item.defectivePeanuts/item.totalPeanuts)*100).toFixed(1)}%)</td>
            <td>${item.processingTime} min</td>
            <td>${item.packagingTime} min</td>
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
    alert('Exporting batch processing report...');
    
    // In a real application, you would implement proper export functionality here
    // Options include:
    // 1. Generate PDF using a library like jsPDF
    // 2. Export to Excel using libraries like SheetJS
    // 3. Send a request to the server to generate and return the file
    
    // Example implementation for server-side export might look like:
    /*
    fetch('/api/reports/batch/export', {
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
        a.download = 'batch-processing-report.pdf';
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