<?php
if (isset($_POST['score'])) {
    $score = intval($_POST['score']);
    $conn = new mysqli("localhost", "root", "", "lcm_game");
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $stmt = $conn->prepare("INSERT INTO scores (score) VALUES (?)");
    $stmt->bind_param("i", $score);
    $stmt->execute();
    echo "Score saved successfully!";
    $stmt->close();
    $conn->close();
}
?>