// Notifications JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Fetch notifications when the page loads
    fetchNotifications();
});

// Function to fetch notifications from the database
function fetchNotifications() {
    // The container where notifications will be displayed
    const notificationContainer = document.getElementById('notificationContainer');
    
    // Here you would normally make an AJAX call to your server
    // For example using fetch API:
    /*
    fetch('/api/notifications')
        .then(response => response.json())
        .then(data => {
            // Process the notifications
            displayNotifications(data);
        })
        .catch(error => {
            console.error('Error fetching notifications:', error);
            showEmptyState();
        });
    */
    
    // For demonstration purposes, we'll use sample data
    // Replace this with your actual database call
    const sampleNotifications = [
        {
            id: 1,
            title: 'Machine Maintenance Required',
            message: 'Machine ID: M001 requires scheduled maintenance',
            time: '2 hours ago',
            read: false,
            type: 'maintenance'
        },
        {
            id: 2,
            title: 'Production Target Achieved',
            message: 'Batch #2345 has reached the production target',
            time: '5 hours ago',
            read: true,
            type: 'success'
        },
        {
            id: 3,
            title: 'System Update',
            message: 'System will be updated tonight at 2:00 AM',
            time: '1 day ago',
            read: false,
            type: 'system'
        },
        {
            id: 4,
            title: 'Error Alert',
            message: 'Error detected in production line B. Attention required.',
            time: '2 days ago',
            read: true,
            type: 'error'
        }
    ];
    
    // Display the notifications
    displayNotifications(sampleNotifications);
}

// Function to display notifications
function displayNotifications(notifications) {
    const notificationContainer = document.getElementById('notificationContainer');
    
    // Clear existing content
    notificationContainer.innerHTML = '';
    
    if (notifications.length === 0) {
        showEmptyState();
        return;
    }
    
    // Create HTML for each notification
    notifications.forEach(notification => {
        const notificationElement = document.createElement('div');
        notificationElement.className = `notification-item ${notification.read ? 'read' : 'unread'}`;
        notificationElement.dataset.id = notification.id;
        
        let iconSrc = 'Images/notification-default.png'; // Default icon
        
        // Determine icon based on notification type
        switch (notification.type) {
            case 'maintenance':
                iconSrc = 'Images/maintenance-icon.png';
                break;
            case 'success':
                iconSrc = 'Images/success-icon.png';
                break;
            case 'system':
                iconSrc = 'Images/system-icon.png';
                break;
            case 'error':
                iconSrc = 'Images/error-icon.png';
                break;
        }
        
        notificationElement.innerHTML = `
            <img src="${iconSrc}" alt="${notification.type}" class="notification-icon">
            <div class="notification-content">
                <div class="notification-title">${notification.title}</div>
                <div class="notification-message">${notification.message}</div>
                <div class="notification-time">${notification.time}</div>
            </div>
            <div class="notification-actions">
                ${!notification.read ? 
                    `<button class="mark-read-btn" onclick="markAsRead(${notification.id})">Mark as read</button>` 
                    : ''}
            </div>
        `;
        
        notificationContainer.appendChild(notificationElement);
    });
}

// Function to handle marking a notification as read
function markAsRead(notificationId) {
    // Here you would make an API call to update the notification status in your database
    // For example:
    /*
    fetch(`/api/notifications/${notificationId}/read`, {
        method: 'PUT'
    })
    .then(response => {
        if (response.ok) {
            // Update the UI
            const notification = document.querySelector(`.notification-item[data-id="${notificationId}"]`);
            if (notification) {
                notification.classList.remove('unread');
                notification.classList.add('read');
                const markReadBtn = notification.querySelector('.mark-read-btn');
                if (markReadBtn) {
                    markReadBtn.remove();
                }
            }
        }
    })
    .catch(error => console.error('Error marking notification as read:', error));
    */
    
    // For demonstration purposes, we'll just update the UI
    const notification = document.querySelector(`.notification-item[data-id="${notificationId}"]`);
    if (notification) {
        notification.classList.remove('unread');
        notification.classList.add('read');
        const markReadBtn = notification.querySelector('.mark-read-btn');
        if (markReadBtn) {
            markReadBtn.remove();
        }
    }
}

// Function to display empty state when no notifications are available
function showEmptyState() {
    const notificationContainer = document.getElementById('notificationContainer');
    
    // Display empty state message
    notificationContainer.innerHTML = `
        <div class="no-notifications">
            <p>No notifications available</p>
        </div>
        
        <!-- Empty notification slots for design purposes -->
        <div class="empty-notification-item"></div>
        <div class="empty-notification-item"></div>
        <div class="empty-notification-item"></div>
        <div class="empty-notification-item"></div>
        <div class="empty-notification-item"></div>
        <div class="empty-notification-item"></div>
    `;
}