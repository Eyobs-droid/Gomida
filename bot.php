<?php
$content = file_get_contents("php://input");
$update = json_decode($content, true);

$chat_id = $update["message"]["chat"]["id"];
$message = $update["message"]["text"];

if($message == "/start") {
    sendMessage($chat_id, "Welcome to your new bot!");
}

function sendMessage($chat_id, $message) {
    $apiToken = "8012066704:AAGsTLV49q7rBvJR9jW121ZurVCUgp0PPOc";
    $url = "https://api.telegram.org/bot$apiToken/sendMessage?chat_id=$chat_id&text=".urlencode($message);
    file_get_contents($url);
}
?>
