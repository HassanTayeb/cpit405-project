<?php
require_once('../connect_db.php');
include('../cors.php');
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $db = connect_to_db();

        // Select all events from the events table
        $stmt = $db->prepare("SELECT * FROM events");
        $stmt->execute();
        $events = $stmt->fetchAll(PDO::FETCH_ASSOC);

        http_response_code(200);
        echo json_encode(["success" => true, "events" => $events]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Method Not Allowed"]);
}
?>
