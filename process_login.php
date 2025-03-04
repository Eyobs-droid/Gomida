<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['login_email'];
    $password = $_POST['login_password'];
    $telegram_id = $_POST['telegram_id'];

    if (empty($email) || empty($password)) {
        echo "Please enter your email and password.";
        exit;
    }

    try {
        $stmt = $conn->prepare("SELECT id, password FROM users WHERE email = :email");
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user) {
            if (password_verify($password, $user['password'])) {
                // Login successful
                // Optionally update telegram_id if it's not already set (handle cases where user registered directly)
                $stmt = $conn->prepare("UPDATE users SET telegram_id = :telegram_id WHERE id = :id AND telegram_id IS NULL");
                $stmt->bindParam(':telegram_id', $telegram_id);
                $stmt->bindParam(':id', $user['id']);
                $stmt->execute();

                // Redirect to the game
                header("Location: index.html?login=success");
                exit;
            } else {
                echo "Incorrect password.";
                exit;
            }
        } else {
            echo "User not found. Please sign up.";
            exit;
        }

    } catch (PDOException $e) {
        error_log("Login error: " . $e->getMessage());
        echo "An error occurred. Please try again later.";
    }
}
?>
