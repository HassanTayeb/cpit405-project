<?php
require_once('../connect_db.php');
include('../cors.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    // Check if event_id is provided in the request
    if (isset($data->event_id)) {
        $event_id = $data->event_id;

        try {
            $db = connect_to_db();

            // Check if the event with the given ID exists
            $stmt = $db->prepare("SELECT * FROM events WHERE id = :event_id");
            $stmt->bindParam(':event_id', $event_id);
            $stmt->execute();

            if ($stmt->rowCount() > 0) {
                // Event found, proceed with deletion
                $deleteStmt = $db->prepare("DELETE FROM events WHERE id = :event_id");
                $deleteStmt->bindParam(':event_id', $event_id);

                if ($deleteStmt->execute()) {
                    http_response_code(200);
                    echo json_encode(["success" => true, "message" => "Event deleted successfully"]);
                } else {
                    http_response_code(500);
                    echo json_encode(["success" => false, "message" => "Failed to delete event"]);
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
        echo json_encode(["success" => false, "message" => "event_id is required"]);
    }
} else {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Method Not Allowed"]);
}
?>
