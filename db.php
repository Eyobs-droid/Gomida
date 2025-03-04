<?php
$host = 'localhost';
$dbname = 'gomida';
$username = 'root';
$password = '';

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password); // Add charset
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $conn->setAttribute(PDO::ATTR_EMULATE_PREPARES, false); // Disable emulated prepares
} catch (PDOException $e) {
    error_log("Database connection error: " . $e->getMessage());
    die("Failed to connect to the database. Please check your connection settings."); // Fatal error
}
?>
