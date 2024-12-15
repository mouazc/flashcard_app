<?php
require 'db_connect.php';

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    $email = $input['email'] ?? '';
    $new_password = $input['new_password'] ?? '';

    if (empty($email) || empty($new_password)) {
        echo json_encode(['status' => 'error', 'message' => 'Email and new password are required.']);
        exit;
    }

    try {
        // Update the plain text password directly (NOT RECOMMENDED)
        $stmt = $pdo->prepare("UPDATE users SET password = :password WHERE email = :email");
        $stmt->execute(['password' => $new_password, 'email' => $email]);

        if ($stmt->rowCount() > 0) {
            echo json_encode(['status' => 'success', 'message' => 'Password reset successful.']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Email not found.']);
        }
    } catch (PDOException $e) {
        echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
}
?>
