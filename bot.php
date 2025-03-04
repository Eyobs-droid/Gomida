<?php
$content = file_get_contents("php://input");
$update = json_decode($content, true);

if (isset($update["message"])) {
    $chat_id = $update["message"]["chat"]["id"];
    $telegram_user_id = $update["message"]["from"]["id"]; // Grab telegram user ID

    // Replace with your local XAMPP path
    $registrationLink = "http://localhost/gomida/login.html?telegram_id=" . $telegram_user_id;  // Assuming project folder is "gomida"
    $message = "Please register or continue playing: " . $registrationLink;
    sendMessage($chat_id, $message);
}

function sendMessage($chat_id, $message) {
    $apiToken = "8012066704:AAGsTLV49q7rBvJR9jW121ZurVCUgp0PPOc";
    $url = "https://api.telegram.org/bot$apiToken/sendMessage?chat_id=$chat_id&text=".urlencode($message);
    file_get_contents($url);
}
?>
