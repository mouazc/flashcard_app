<?php
require 'db_connect.php';
session_start();

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["status" => "error", "message" => "User not logged in."]);
    exit;
}

try {
    // Fetch categories
    $stmtCategories = $pdo->prepare("SELECT DISTINCT category FROM flashcards WHERE user_id = :user_id");
    $stmtCategories->execute(["user_id" => $_SESSION['user_id']]);
    $categories = $stmtCategories->fetchAll(PDO::FETCH_COLUMN);

    // Fetch flashcards
    $stmtFlashcards = $pdo->prepare("SELECT id, question, answer, category FROM flashcards WHERE user_id = :user_id");
    $stmtFlashcards->execute(["user_id" => $_SESSION['user_id']]);
    $flashcards = $stmtFlashcards->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(["status" => "success", "categories" => $categories, "flashcards" => $flashcards]);
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Database error: " . $e->getMessage()]);
}
