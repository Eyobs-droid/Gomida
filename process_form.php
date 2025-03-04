<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['action']) && $_POST['action'] === 'join_telegram') {
        $userId = $_POST['user_id'];
        $coins = 2500;

        // Update user balance
        $stmt = $conn->prepare("UPDATE users SET coins = coins + :coins WHERE id = :userId");
        $stmt->bindParam(':coins', $coins);
        $stmt->bindParam(':userId', $userId);
        $stmt->execute();

        echo "Coins added successfully.";
        exit;
    }

    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $confirm = $_POST['confirm'];
    $coins = isset($_POST['coins']) ? (int)$_POST['coins'] : 0;
    $telegram_id = isset($_POST['telegram_id']) ? $_POST['telegram_id'] : null; // Get Telegram ID

    if (empty($name) || empty($email) || empty($password) || empty($confirm)) {
        echo "All fields are required.";
        exit;
    }

    if ($password !== $confirm) {
        echo "Passwords do not match.";
        exit;
    }

    try {
        $stmt = $conn->prepare("SELECT COUNT(*) FROM users WHERE email = :email");
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        $count = $stmt->fetchColumn();

        if ($count > 0) {
            echo "This email is already registered.";
            exit;
        }

        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        $stmt = $conn->prepare("INSERT INTO users (name, email, password, coins, telegram_id) VALUES (:name, :email, :password, :coins, :telegram_id)");
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password', $hashedPassword);
        $stmt->bindParam(':coins', $coins);
        $stmt->bindParam(':telegram_id', $telegram_id); // Bind Telegram ID
        $stmt->execute();

        echo "Registration successful.";
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
}
?>
