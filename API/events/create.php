<?php
require_once('../connect_db.php');
include('../cors.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $event_name = $_POST['event_name'];
    $event_date = $_POST['event_date'];
    $event_time = $_POST['event_time'];
    $event_description = $_POST['event_description'];

    // Check if the file is uploaded successfully
    if (isset($_FILES['event_img']) && $_FILES['event_img']['error'] === UPLOAD_ERR_OK) {
        $file_tmp_name = $_FILES['event_img']['tmp_name'];
        $file_name = $_FILES['event_img']['name'];
        $file_extension = pathinfo($file_name, PATHINFO_EXTENSION);

        $unique_filename = uniqid() . '.' . $file_extension;
        $upload_path = '../uploads/' . $unique_filename;

        // Move the uploaded file to the destination folder
        if (move_uploaded_file($file_tmp_name, $upload_path)) {
            // File upload successful, proceed with database insertion
            try {
                $db = connect_to_db();

                $stmt = $db->prepare("INSERT INTO events (event_name, event_date, event_time, event_img, event_description) 
                                     VALUES (:event_name, :event_date, :event_time, :event_img, :event_description)");
                $stmt->bindParam(':event_name', $event_name);
                $stmt->bindParam(':event_date', $event_date);
                $stmt->bindParam(':event_time', $event_time);
                $stmt->bindParam(':event_img', $unique_filename);
                $stmt->bindParam(':event_description', $event_description);

                if ($stmt->execute()) {
                    http_response_code(201);
                    echo json_encode(["success" => true, "message" => "Event created successfully"]);
                } else {
                    http_response_code(500);
                    echo json_encode(["success" => false, "message" => "Failed to create event"]);
                }
            } catch (PDOException $e) {
                http_response_code(500);
                echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
            }
        } else {
            http_response_code(500);
            echo json_encode(["success" => false, "message" => "Failed to move uploaded file"]);
        }
    } else {
        // If event_img is not provided, insert into the database with NULL for event_img
        try {
            $db = connect_to_db();

            $stmt = $db->prepare("INSERT INTO events (event_name, event_date, event_time, event_description) 
                                 VALUES (:event_name, :event_date, :event_time, :event_description)");
            $stmt->bindParam(':event_name', $event_name);
            $stmt->bindParam(':event_date', $event_date);
            $stmt->bindParam(':event_time', $event_time);
            $stmt->bindParam(':event_description', $event_description);

            if ($stmt->execute()) {
                http_response_code(201);
                echo json_encode(["success" => true, "message" => "Event created successfully"]);
            } else {
                http_response_code(500);
                echo json_encode(["success" => false, "message" => "Failed to create event"]);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
        }
    }
} else {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Method Not Allowed"]);
}
?>
