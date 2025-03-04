<?php
include 'db.php';

if (isset($_GET['telegram_id'])) {
    $telegram_id = $_GET['telegram_id'];

    try {
        $stmt = $conn->prepare("SELECT COUNT(*) FROM users WHERE telegram_id = :telegram_id");
        $stmt->bindParam(':telegram_id', $telegram_id);
        $stmt->execute();
        $count = $stmt->fetchColumn();

        header('Content-Type: application/json');
        echo json_encode(['exists' => ($count > 0)]); // Returns true if user exists, false otherwise

    } catch (PDOException $e) {
        error_log("Error checking user: " . $e->getMessage());
        header('Content-Type: application/json');
        echo json_encode(['exists' => false, 'error' => 'Database error']);
    }
} else {
    header('Content-Type: application/json');
    echo json_encode(['exists' => false, 'error' => 'No Telegram ID provided']);
}
?>
