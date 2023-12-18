<?php
require_once('../connect_db.php');
include('../cors.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    $username = $data->username;
    $email = $data->email;
    $password = password_hash($data->password, PASSWORD_BCRYPT);
    $phone = $data->phone;

    try {
        $db = connect_to_db();
        
        // Check if the email is already taken
        $stmt = $db->prepare("SELECT * FROM users WHERE email = :email");
        $stmt->bindParam(':email', $email);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            http_response_code(400);
            echo json_encode(["message" => "Email is already taken"]);
        } else {
            // Register the user
            $stmt = $db->prepare("INSERT INTO users (username, email, password, phone) VALUES (:username, :email, :password, :phone)");
            $stmt->bindParam(':username', $username);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':password', $password);
            $stmt->bindParam(':phone', $phone);

            if ($stmt->execute()) {
                http_response_code(201);
                echo json_encode(["message" => "Registration successful"]);
            } else {
                http_response_code(500);
                echo json_encode(["message" => "Registration failed"]);
            }
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["message" => "Database error: " . $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(["message" => "Method Not Allowed"]);
}
?>
