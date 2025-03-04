<?php
$content = file_get_contents("php://input");
$update = json_decode($content, true);

if (isset($update["message"])) {
    $chat_id = $update["message"]["chat"]["id"];
    $telegram_user_id = $update["message"]["from"]["id"]; // Grab telegram user ID

    // Always redirect to login.html with the Telegram ID
    $registrationLink = "http://localhost/gomida/login.html?telegram_id=" . $telegram_user_id;  // Replace "gomida" and domain as needed
    $message = "Please sign up or log in to play: " . $registrationLink;
    sendMessage($chat_id, $message);
}

function sendMessage($chat_id, $message) {
    $apiToken = "8012066704:AAGsTLV49q7rBvJR9jW121ZurVCUgp0PPOc";
    $url = "https://api.telegram.org/bot$apiToken/sendMessage?chat_id=$chat_id&text=".urlencode($message);
    file_get_contents($url);
}
?>
