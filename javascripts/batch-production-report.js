document.addEventListener('DOMContentLoaded', function() {
    // Initialize the report
    initializeBatchProductionReport();
    
    // Set up event listeners
    document.getElementById('exportBtn').addEventListener('click', exportReport);
});

// Initialize the energy report
function initializeBatchProductionReport() {
    // Load energy data
    loadBatchProductionData();
    
    // You could also add filter controls, date pickers, etc. here
}

// Load energy data from the database
function loadBatchProductionData() {
    const tableBody = document.querySelector('#energyReportTable tbody');
    
    // Show loading indicator
    tableBody.innerHTML = `
        <tr>
            <td colspan="7" class="loading-indicator">Loading energy data...</td>
        </tr>
    `;
    
    // In a real application, you would fetch data from your database
    // For demonstration, we'll use sample data
    setTimeout(() => {
        // This timeout simulates network delay
        // Replace with actual API call in production
        
        // Sample data - replace with your database call
        const batchProductionData = [
            {
                dateAndtime: '2025-04-25 04:25:05',
                defectivePeanuts: 5,
                goodPeanuts: 95,
                peanutSize: 'Medium',
                packedPeanutsYield: 25,
                avgProcessingTime: '45 min',
                Income: '₱2275' 
            }
        ];
        
        displayBatchProduction(batchProductionData);
    }, 500);
}

// Display energy data in the table
function displayBatchProduction(data) {
    const tableBody = document.querySelector('#energyReportTable tbody');
    
    // Clear the table first
    tableBody.innerHTML = '';
    
    if (data.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; padding: 20px;">No energy data available</td>
            </tr>
        `;
        return;
    }
    
    // Add data rows
    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${formatDate(item.dateAndtime)}</td>
            <td>${item.defectivePeanuts}%</td>
            <td>${item.goodPeanuts}%</td>
            <td>${item.peanutSize}</td>
            <td>${item.packedPeanutsYield} kg</td>
            <td>${item.avgProcessingTime}</td>
            <td>${item.Income}</td>
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
    alert('Exporting energy report...');
    
    // In a real application, you would implement proper export functionality here
    // Options include:
    // 1. Generate PDF using a library like jsPDF
    // 2. Export to Excel using libraries like SheetJS
    // 3. Send a request to the server to generate and return the file
    
    // Example implementation for server-side export might look like:
    /*
    fetch('/api/reports/energy/export', {
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
        a.download = 'energy-report.pdf';
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