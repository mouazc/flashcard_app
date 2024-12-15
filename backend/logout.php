<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Destroy the session
    session_unset();
    session_destroy();

    echo json_encode(['status' => 'success', 'message' => 'Logged out successfully.']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
}
?>
