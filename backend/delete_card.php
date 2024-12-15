<?php
// CORS configuration
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Include the database connection file
include_once 'db_connect.php';

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Get the raw POST data
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['id'])) {
    echo json_encode([
        "status" => "error",
        "message" => "Card ID is missing.",
    ]);
    exit();
}

$cardId = $data['id'];

try {
    // Prepare the DELETE statement
    $stmt = $pdo->prepare("DELETE FROM flashcards WHERE id = :id");
    $stmt->bindParam(':id', $cardId, PDO::PARAM_INT);

    if ($stmt->execute()) {
        echo json_encode([
            "status" => "success",
            "message" => "Card deleted successfully.",
        ]);
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "Failed to delete card.",
        ]);
    }
} catch (PDOException $e) {
    echo json_encode([
        "status" => "error",
        "message" => "Database error: " . $e->getMessage(),
    ]);
}
