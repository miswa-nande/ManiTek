// Peanut Summary Report JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the report
    initializeSummaryReport();
    
    // Set up event listeners
    document.getElementById('exportBtn').addEventListener('click', exportReport);
});

// Initialize the summary report
function initializeSummaryReport() {
    // Load summary data
    loadSummaryData();
    
    // You could also add filter controls, date pickers, etc. here
}

// Load summary data from the database
function loadSummaryData() {
    const tableBody = document.querySelector('#energyReportTable tbody');
    
    // Show loading indicator
    tableBody.innerHTML = `
        <tr>
            <td colspan="8" class="loading-indicator">Loading peanut summary data...</td>
        </tr>
    `;
    
    // In a real application, you would fetch data from your database
    // For demonstration, we'll use sample data
    setTimeout(() => {
        // This timeout simulates network delay
        // Replace with actual API call in production
        
        // Sample data - replace with your database call
        const summaryData = [
            {
                dateRange: 'Apr 1 - Apr 7, 2025',
                totalProcessed: 1250,
                totalShelled: 950,
                defectivePeanuts: 5,
                goodPeanuts: 95,
                crackedYield: 875,
                income: 52500,
                peakHour: 14
            },
            {
                dateRange: 'Apr 8 - Apr 14, 2025',
                totalProcessed: 1380,
                totalShelled: 1050,
                defectivePeanuts: 4,
                goodPeanuts: 96,
                crackedYield: 980,
                income: 58800,
                peakHour: 13
            },
            {
                dateRange: 'Apr 15 - Apr 21, 2025',
                totalProcessed: 1420,
                totalShelled: 1080,
                defectivePeanuts: 6,
                goodPeanuts: 94,
                crackedYield: 995,
                income: 59700,
                peakHour: 15
            }
            // Add more data as needed
        ];
        
        displaySummaryData(summaryData);
    }, 500);
}

// Display summary data in the table
function displaySummaryData(data) {
    const tableBody = document.querySelector('#energyReportTable tbody');
    
    // Clear the table first
    tableBody.innerHTML = '';
    
    if (data.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="8" style="text-align: center; padding: 20px;">No peanut summary data available</td>
            </tr>
        `;
        return;
    }
    
    // Add data rows
    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.dateRange}</td>
            <td>${item.totalProcessed} kg</td>
            <td>${item.totalShelled} kg</td>
            <td>${item.defectivePeanuts}%</td>
            <td>${item.goodPeanuts}%</td>
            <td>${item.crackedYield} kg</td>
            <td>₱${item.income.toLocaleString()}</td>
            <td>${item.peakHour}:00</td>
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
            <td></td>
        `;
        tableBody.appendChild(emptyRow);
    }
}

// Export report functionality
function exportReport() {
    // Show export in progress
    alert('Exporting peanut summary report...');
    
    // In a real application, you would implement proper export functionality here
    // Options include:
    // 1. Generate PDF using a library like jsPDF
    // 2. Export to Excel using libraries like SheetJS
    // 3. Send a request to the server to generate and return the file
    
    // Example implementation for server-side export might look like:
    /*
    fetch('/api/reports/peanut-summary/export', {
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
        a.download = 'peanut-summary-report.pdf';
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