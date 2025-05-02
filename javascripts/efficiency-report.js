// Peanut Processing Efficiency Report JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the report
    initializeEfficiencyReport();
    
    // Set up event listeners
    document.getElementById('exportBtn').addEventListener('click', exportReport);
});

// Initialize the efficiency report
function initializeEfficiencyReport() {
    // Load efficiency data
    loadEfficiencyData();
    
    // You could also add filter controls, date pickers, etc. here
}

// Load efficiency data from the database
function loadEfficiencyData() {
    const tableBody = document.querySelector('#efficiencyReportTable tbody');
    
    // Show loading indicator
    tableBody.innerHTML = `
        <tr>
            <td colspan="5" class="loading-indicator">Loading efficiency data...</td>
        </tr>
    `;
    
    // In a real application, you would fetch data from your database
    // For demonstration, we'll use sample data
    setTimeout(() => {
        // This timeout simulates network delay
        // Replace with actual API call in production
        
        // Sample data - replace with your database call
        const efficiencyData = [
            {
                date: '2025-04-25',
                machineEfficiency: 92,
                sensorAccuracy: 97,
                productionRate: 450,
                packagingEfficiency: 380
            },
            {
                date: '2025-04-26',
                machineEfficiency: 88,
                sensorAccuracy: 95,
                productionRate: 425,
                packagingEfficiency: 360
            },
            {
                date: '2025-04-27',
                machineEfficiency: 94,
                sensorAccuracy: 98,
                productionRate: 470,
                packagingEfficiency: 395
            }
            // Add more data as needed
        ];
        
        displayEfficiencyData(efficiencyData);
    }, 500);
}

// Display efficiency data in the table
function displayEfficiencyData(data) {
    const tableBody = document.querySelector('#efficiencyReportTable tbody');
    
    // Clear the table first
    tableBody.innerHTML = '';
    
    if (data.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center; padding: 20px;">No efficiency data available</td>
            </tr>
        `;
        return;
    }
    
    // Add data rows
    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${formatDate(item.date)}</td>
            <td>${item.machineEfficiency}%</td>
            <td>${item.sensorAccuracy}%</td>
            <td>${item.productionRate} peanuts/hr</td>
            <td>${item.packagingEfficiency} bags/hr</td>
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
    alert('Exporting efficiency report...');
    
    // In a real application, you would implement proper export functionality here
    // Options include:
    // 1. Generate PDF using a library like jsPDF
    // 2. Export to Excel using libraries like SheetJS
    // 3. Send a request to the server to generate and return the file
    
    // Example implementation for server-side export might look like:
    /*
    fetch('/api/reports/efficiency/export', {
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
        a.download = 'peanut-efficiency-report.pdf';
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