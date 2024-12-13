<?php
require 'db_connect.php';
session_start();

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    $category = $input['category'] ?? '';
    $question = $input['question'] ?? '';
    $answer = $input['answer'] ?? '';
    $user_id = $_SESSION['user_id'] ?? null;

    if (empty($category) || empty($question) || empty($answer)) {
        echo json_encode(['status' => 'error', 'message' => 'All fields are required.']);
        exit;
    }

    try {
        $stmt = $pdo->prepare("INSERT INTO flashcards (user_id, category, question, answer) VALUES (:user_id, :category, :question, :answer)");
        $stmt->execute([
            'user_id' => $user_id,
            'category' => $category,
            'question' => $question,
            'answer' => $answer
        ]);
        echo json_encode(['status' => 'success', 'message' => 'Card added successfully!']);
    } catch (PDOException $e) {
        echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
}
?>
