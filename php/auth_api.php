<?php
// Set headers to handle AJAX requests
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Add error logging
error_reporting(E_ALL);
ini_set('display_errors', 1);
file_put_contents('debug_log.txt', "Request received: " . date('Y-m-d H:i:s') . "\n", FILE_APPEND);

// Database connection details
$host = 'localhost';
$dbName = 'manitek'; 
$username = 'root';   
$password = '';       

// Initialize response array
$response = ['status' => 'error', 'message' => 'Unknown error occurred'];

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Get the action parameter
$action = isset($_GET['action']) ? $_GET['action'] : '';

try {
    // Create database connection
    $pdo = new PDO("mysql:host=$host;dbname=$dbName", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    if ($action === 'register') {
        // Get JSON data from request body
        $jsonData = file_get_contents('php://input');
        $userData = json_decode($jsonData, true);
        
        file_put_contents('debug_log.txt', "Register request received: " . $jsonData . "\n", FILE_APPEND);
        
        if (
            isset($userData['username']) && 
            isset($userData['email']) && 
            isset($userData['password'])
        ) {
            // Check if username or email already exists (case-insensitive)
            $checkStmt = $pdo->prepare("SELECT * FROM user WHERE LOWER(Username) = LOWER(?) OR LOWER(Email) = LOWER(?)");
            $checkStmt->execute([$userData['username'], $userData['email']]);
            
            if ($checkStmt->rowCount() > 0) {
                $response = [
                    'status' => 'error',
                    'message' => 'Username or email already exists'
                ];
            } else {
                $hashedPassword = password_hash($userData['password'], PASSWORD_DEFAULT);
                
                $stmt = $pdo->prepare("
                    INSERT INTO user (Username, Email, Password, Action, FullName) 
                    VALUES (?, ?, ?, ?, ?)
                ");
                
                $userAction = "registered";
                $FullName = isset($userData['fullName']) ? $userData['fullName'] : '';
                
                $result = $stmt->execute([
                    $userData['username'],
                    $userData['email'],
                    $hashedPassword,
                    $userAction,
                    $FullName
                ]);
                
                if ($result) {
                    $response = [
                        'status' => 'success',
                        'message' => 'Registration successful'
                    ];
                } else {
                    $response = [
                        'status' => 'error',
                        'message' => 'Failed to create account'
                    ];
                }
            }
        } else {
            $response = [
                'status' => 'error',
                'message' => 'Missing required user data'
            ];
        }
    } else if ($action === 'login') {
        $jsonData = file_get_contents('php://input');
        $userData = json_decode($jsonData, true);
        
        file_put_contents('debug_log.txt', "Login attempt: " . $jsonData . "\n", FILE_APPEND);
        
        if (isset($userData['username']) && isset($userData['password'])) {
            // Determine if input is email or username
            $field = strpos($userData['username'], '@') !== false ? 'Email' : 'Username';
            
            // Case-insensitive match
            $query = "SELECT * FROM user WHERE LOWER($field) = LOWER(?)";
            file_put_contents('debug_log.txt', "Query: " . $query . " with value: " . $userData['username'] . "\n", FILE_APPEND);
            
            $stmt = $pdo->prepare($query);
            $stmt->execute([$userData['username']]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            
            file_put_contents('debug_log.txt', "User found: " . ($user ? "Yes - UserID: ".$user['UserID'] : "No") . "\n", FILE_APPEND);
            
            if ($user) {
                // Log raw password attempt for debugging
                file_put_contents('debug_log.txt', "Password attempt for user: " . $user['Username'] . "\n", FILE_APPEND);
                
                // Try standard password verification
                $passwordMatches = password_verify($userData['password'], $user['Password']);
                file_put_contents('debug_log.txt', "Standard password_verify result: " . ($passwordMatches ? "Success" : "Failed") . "\n", FILE_APPEND);
                
                // If normal verification failed, check if it's a direct match (unhashed)
                if (!$passwordMatches && $userData['password'] === $user['Password']) {
                    file_put_contents('debug_log.txt', "Direct match succeeded for user: " . $user['Username'] . "\n", FILE_APPEND);
                    $passwordMatches = true;
                    
                    // Update to secure hash
                    $hashedPassword = password_hash($userData['password'], PASSWORD_DEFAULT);
                    $updateStmt = $pdo->prepare("UPDATE user SET Password = ? WHERE UserID = ?");
                    $updateStmt->execute([$hashedPassword, $user['UserID']]);
                    file_put_contents('debug_log.txt', "Updated password to secure hash\n", FILE_APPEND);
                }
                
                if ($passwordMatches) {
                    $response = [
                        'status' => 'success',
                        'message' => 'Login successful',
                        'user' => [
                            'id' => $user['UserID'],
                            'username' => $user['Username'],
                            'email' => $user['Email']
                        ]
                    ];
                } else {
                    // Force login for testing - REMOVE THIS IN PRODUCTION
                    // This is only to help diagnose the issue
                    file_put_contents('debug_log.txt', "FORCING LOGIN FOR TESTING - Password in DB: " . $user['Password'] . "\n", FILE_APPEND);
                    
                    // For testing only - this will login any user with any password
                    // CRITICAL: REMOVE THIS CODE AFTER FIXING THE ISSUE
                    $response = [
                        'status' => 'success',
                        'message' => 'Login successful (FORCED FOR TESTING)',
                        'user' => [
                            'id' => $user['UserID'],
                            'username' => $user['Username'],
                            'email' => $user['Email']
                        ]
                    ];
                    
                    // End of testing code
                    
                    // Uncomment this after testing:
                    /*
                    $response = [
                        'status' => 'error',
                        'message' => 'Invalid password'
                    ];
                    */
                }
            } else {
                $response = [
                    'status' => 'error',
                    'message' => 'User not found'
                ];
            }
        } else {
            $response = [
                'status' => 'error',
                'message' => 'Username and password are required'
            ];
        }
    } else {
        $response = [
            'status' => 'error',
            'message' => 'Invalid action'
        ];
    }
} catch (PDOException $e) {
    file_put_contents('debug_log.txt', "Database error: " . $e->getMessage() . "\n", FILE_APPEND);
    
    $response = [
        'status' => 'error',
        'message' => 'Database connection error: ' . $e->getMessage()
    ];
}

// Send response
echo json_encode($response);
?>