<?php
include 'db.php';

try {
    $stmt = $conn->prepare("SELECT name, coins FROM users ORDER BY coins DESC LIMIT 10");
    $stmt->execute();
    $leaderboard = $stmt->fetchAll(PDO::FETCH_ASSOC);

    header('Content-Type: application/json');
    echo json_encode($leaderboard);
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>
