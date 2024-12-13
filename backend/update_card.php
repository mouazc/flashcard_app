<?php
// Database connection
include 'db_connection.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!empty($data['id']) && !empty($data['category']) && !empty($data['question']) && !empty($data['answer'])) {
    $id = $data['id'];
    $category = $data['category'];
    $question = $data['question'];
    $answer = $data['answer'];

    $stmt = $conn->prepare("UPDATE flashcards SET category = ?, question = ?, answer = ? WHERE id = ?");
    $stmt->bind_param("sssi", $category, $question, $answer, $id);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Card updated successfully."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to update card."]);
    }

    $stmt->close();
} else {
    echo json_encode(["status" => "error", "message" => "Invalid input."]);
}

$conn->close();
?>
