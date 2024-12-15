<?php
include 'db_connect.php'; // Include your database connection file

header("Content-Type: application/json");

if (!isset($_GET['id'])) {
    echo json_encode(["status" => "error", "message" => "Card ID is missing."]);
    exit();
}

$card_id = intval($_GET['id']);

// Debug: Check if the ID is being received
error_log("Fetching card with ID: " . $card_id);

$query = "SELECT * FROM flashcards WHERE id = ?";
$stmt = $conn->prepare($query);

if ($stmt === false) {
    echo json_encode(["status" => "error", "message" => "Failed to prepare query."]);
    exit();
}

$stmt->bind_param("i", $card_id);

if ($stmt->execute()) {
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        $card = $result->fetch_assoc();
        echo json_encode(["status" => "success", "card" => $card]);
    } else {
        echo json_encode(["status" => "error", "message" => "Card not found."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Query execution failed."]);
}

$stmt->close();
$conn->close();
?>
