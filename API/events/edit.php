<?php
require_once('../connect_db.php');
include('../cors.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = isset($_POST['id']) ? $_POST['id'] : null;

    if ($id) {
        try {
            $db = connect_to_db();
            $selectStmt = $db->prepare("SELECT * FROM events WHERE id = :id");
            $selectStmt->bindParam(':id', $id);
            $selectStmt->execute();

            if ($selectStmt->rowCount() > 0) {
                // Handle image upload for update
                if (isset($_FILES['event_img']) && $_FILES['event_img']['error'] === UPLOAD_ERR_OK) {
                    $file_tmp_name = $_FILES['event_img']['tmp_name'];
                    $file_name = $_FILES['event_img']['name'];
                    $file_extension = pathinfo($file_name, PATHINFO_EXTENSION);

                    $unique_filename = uniqid() . '.' . $file_extension;
                    $upload_path = '../uploads/' . $unique_filename;

                    if (move_uploaded_file($file_tmp_name, $upload_path)) {
                        // Update event with new image
                        $updateStmt = $db->prepare("UPDATE events 
                            SET event_name = :event_name, 
                                event_date = :event_date, 
                                event_time = :event_time, 
                                event_img = :event_img, 
                                event_description = :event_description
                            WHERE id = :id");

                        $updateStmt->bindParam(':event_name', $_POST['event_name']);
                        $updateStmt->bindParam(':event_date', $_POST['event_date']);
                        $updateStmt->bindParam(':event_time', $_POST['event_time']);
                        $updateStmt->bindParam(':event_img', $unique_filename);
                        $updateStmt->bindParam(':event_description', $_POST['event_description']);
                        $updateStmt->bindParam(':id', $id);

                        if ($updateStmt->execute()) {
                            $updatedStmt = $db->prepare("SELECT * FROM events WHERE id = :id");
                            $updatedStmt->bindParam(':id', $id);
                            $updatedStmt->execute();

                            $updatedEvent = $updatedStmt->fetch(PDO::FETCH_ASSOC);

                            http_response_code(200);
                            echo json_encode(["success" => true, "message" => "Event updated successfully", "event" => $updatedEvent]);
                        } else {
                            http_response_code(500);
                            echo json_encode(["success" => false, "message" => "Failed to update event"]);
                        }
                    } else {
                        http_response_code(500);
                        echo json_encode(["success" => false, "message" => "Failed to move uploaded file"]);
                    }
                } else {
                    // Update event without changing the image
                    $updateStmt = $db->prepare("UPDATE events 
                        SET event_name = :event_name, 
                            event_date = :event_date, 
                            event_time = :event_time, 
                            event_description = :event_description
                        WHERE id = :id");

                    $updateStmt->bindParam(':event_name', $_POST['event_name']);
                    $updateStmt->bindParam(':event_date', $_POST['event_date']);
                    $updateStmt->bindParam(':event_time', $_POST['event_time']);
                    $updateStmt->bindParam(':event_description', $_POST['event_description']);
                    $updateStmt->bindParam(':id', $id);

                    if ($updateStmt->execute()) {
                        $updatedStmt = $db->prepare("SELECT * FROM events WHERE id = :id");
                        $updatedStmt->bindParam(':id', $id);
                        $updatedStmt->execute();

                        $updatedEvent = $updatedStmt->fetch(PDO::FETCH_ASSOC);

                        http_response_code(200);
                        echo json_encode(["success" => true, "message" => "Event updated successfully", "event" => $updatedEvent]);
                    } else {
                        http_response_code(500);
                        echo json_encode(["success" => false, "message" => "Failed to update event"]);
                    }
                }
            } else {
                http_response_code(404);
                echo json_encode(["success" => false, "message" => "Event not found"]);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "id is required"]);
    }
} else {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Method Not Allowed"]);
}
?>
