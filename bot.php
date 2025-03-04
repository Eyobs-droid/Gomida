<?php
$content = file_get_contents("php://input");
$update = json_decode($content, true);

$chat_id = $update["message"]["chat"]["id"];
$message = $update["message"]["text"];
$telegram_user_id = $update["message"]["from"]["id"]; // Grab telegram user ID

include 'db.php';

try {
    // Check if user exists in the database
    $stmt = $conn->prepare("SELECT id FROM users WHERE telegram_id = :telegram_id");
    $stmt->bindParam(':telegram_id', $telegram_user_id);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        // User exists, welcome them back
        sendMessage($chat_id, "Welcome back! Let's play!");
        // (You can add code here to retrieve user's coin balance or other game data)
    } else {
        // User doesn't exist, send them to the registration page
        $registrationLink = "https://yourdomain.com/login.html?telegram_id=" . $telegram_user_id;  // Replace yourdomain.com

        sendMessage($chat_id, "Welcome! Please register to play: " . $registrationLink);
    }

} catch (PDOException $e) {
    error_log("Database error: " . $e->getMessage());
    sendMessage($chat_id, "An error occurred. Please try again later."); // User-friendly error
}

function sendMessage($chat_id, $message) {
    $apiToken = "8012066704:AAGsTLV49q7rBvJR9jW121ZurVCUgp0PPOc";
    $url = "https://api.telegram.org/bot$apiToken/sendMessage?chat_id=$chat_id&text=".urlencode($message);
    file_get_contents($url);
}
?>
