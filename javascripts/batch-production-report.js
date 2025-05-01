// Energy Report JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the report
    initializeEnergyReport();
    
    // Set up event listeners
    document.getElementById('exportBtn').addEventListener('click', exportReport);
});

// Initialize the energy report
function initializeEnergyReport() {
    // Load energy data
    loadEnergyData();
    
    // You could also add filter controls, date pickers, etc. here
}

// Load energy data from the database
function loadEnergyData() {
    const tableBody = document.querySelector('#energyReportTable tbody');
    
    // Show loading indicator
    tableBody.innerHTML = `
        <tr>
            <td colspan="6" class="loading-indicator">Loading energy data...</td>
        </tr>
    `;
    
    // In a real application, you would fetch data from your database
    // For demonstration, we'll use sample data
    setTimeout(() => {
        // This timeout simulates network delay
        // Replace with actual API call in production
        
        // Sample data - replace with your database call
        const energyData = [
            {
                date: '2025-04-25',
                batteryLevel: 85,
                solarPanelStatus: 'Operational',
                solarEnergyCollected: 12.5,
                batteryEnergyUsed: 8.3,
                solarVsBatteryUsage: '60% / 40%'
            },
            {
                date: '2025-04-26',
                batteryLevel: 78,
                solarPanelStatus: 'Operational',
                solarEnergyCollected: 10.8,
                batteryEnergyUsed: 9.2,
                solarVsBatteryUsage: '54% / 46%' ,
            },
            {
                date: '2025-04-27',
                batteryLevel: 62,
                solarPanelStatus: 'Reduced Output',
                solarEnergyCollected: 5.4,
                batteryEnergyUsed: 11.7,
                solarVsBatteryUsage: '32% / 68%'
            }
            // Add more data as needed
        ];
        
        displayEnergyData(energyData);
    }, 500);
}

// Display energy data in the table
function displayEnergyData(data) {
    const tableBody = document.querySelector('#energyReportTable tbody');
    
    // Clear the table first
    tableBody.innerHTML = '';
    
    if (data.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; padding: 20px;">No energy data available</td>
            </tr>
        `;
        return;
    }
    
    // Add data rows
    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${formatDate(item.date)}</td>
            <td>${item.batteryLevel}%</td>
            <td>${item.solarPanelStatus}</td>
            <td>${item.solarEnergyCollected} kWh</td>
            <td>${item.batteryEnergyUsed} kWh</td>
            <td>${item.solarVsBatteryUsage}</td>
            <td>${item.solarVsBatteryUsage}</td>
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