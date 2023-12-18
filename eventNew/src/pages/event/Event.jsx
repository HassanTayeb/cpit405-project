import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";

const Event = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    event_name: "",
    event_date: "",
    event_time: "",
    event_description: "",
    event_img: "",
  });
  const [editEvent, setEditEvent] = useState(null);

  const handleCloseModal = () => {
    setShowModal(false);
    setEditEvent(null);
    setNewEvent({
      event_name: "",
      event_date: "",
      event_time: "",
      event_description: "",
      event_img: "",
    });
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({
      ...newEvent,
      [name]: value,
    });
  };

  const handleEditEvent = (event) => {
    setEditEvent(event);
    setNewEvent({
      event_name: event.event_name,
      event_date: event.event_date,
      event_time: event.event_time,
      event_description: event.event_description,
      event_img: event.event_img,
    });
    handleShowModal();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewEvent({
      ...newEvent,
      event_img: file,
    });
  };
  
  const handleAddEvent = () => {
    // Validate that all required fields are filled (excluding image)
    if (!newEvent.event_name || !newEvent.event_date || !newEvent.event_time || !newEvent.event_description) {
      // Display an error message using SweetAlert2
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fill in all required fields.',
      });
      return; // Do not proceed with the API call if validation fails
    }
  
    // Create a FormData object to handle the file
    const formData = new FormData();
    formData.append("event_name", newEvent.event_name);
    formData.append("event_date", newEvent.event_date);
    formData.append("event_time", newEvent.event_time);
    formData.append("event_description", newEvent.event_description);
    formData.append("event_img", newEvent.event_img);
  
    // Define the create API endpoint
    const createApiUrl = "http://localhost:8080/eventNew/API/events/create.php";
  
    // Perform the create operation using Axios
    axios.post(createApiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        console.log("Event created successfully:", response.data);
  
        // Display a success message using SweetAlert2
        Swal.fire({
          icon: 'success',
          title: 'Event Created',
          text: 'The event has been created successfully!',
        });
  
        // Close the modal
        handleCloseModal();
  
        // Fetch updated events after adding a new event
        fetchData();
      })
      .catch(error => {
        console.error("Error creating event:", error);
  
        // Display an error message using SweetAlert2
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while creating the event.',
        });
      });
  };
  
  
  const handleUpdateEvent = () => {
    // Validate that all required fields are filled (excluding image)
    if (!newEvent.event_name || !newEvent.event_date || !newEvent.event_time || !newEvent.event_description) {
      // Display an error message using SweetAlert2
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fill in all required fields.',
      });
      return; // Do not proceed with the API call if validation fails
    }
  
    // Define the update API endpoint
    const updateApiUrl = `http://localhost:8080/eventNew/API/events/edit.php`;
  
    // Include the 'event_id' in the update payload
    const updatedEvent = {
      id: editEvent.id,
      ...newEvent,
    };
  
    // Create a FormData object to handle the file
    const formData = new FormData();
    formData.append("id", updatedEvent.id);
    formData.append("event_name", updatedEvent.event_name);
    formData.append("event_date", updatedEvent.event_date);
    formData.append("event_time", updatedEvent.event_time);
    formData.append("event_description", updatedEvent.event_description);
    formData.append("event_img", newEvent.event_img); // Only add the new image if it's selected
  
    // Perform the update operation using Axios
    axios.post(updateApiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        console.log("Event updated successfully:", response.data);
  
        // Display a success message using SweetAlert2
        Swal.fire({
          icon: 'success',
          title: 'Event Updated',
          text: 'The event has been updated successfully!',
        });
  
        // Close the modal
        handleCloseModal();
  
        // Fetch updated events after updating an event
        fetchData();
      })
      .catch(error => {
        console.log("Error updating event:", error);
  
        // Display an error message using SweetAlert2
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while updating the event.',
        });
      });
  };
  

  const handleDelete = (eventId) => {
    // Define the delete API endpoint
    const deleteApiUrl = "http://localhost:8080/eventNew/API/events/delete.php";

    // Perform the delete operation using Axios
    axios.post(deleteApiUrl, { event_id: eventId })
      .then(response => {
        console.log("Event deleted successfully:", response.data);

        // Display a success message using SweetAlert2
        Swal.fire({
          icon: 'success',
          title: 'Event Deleted',
          text: 'The event has been deleted successfully!',
        });

        // Fetch updated events after deleting an event
        fetchData();
      })
      .catch(error => {
        console.error("Error deleting event:", error);

        // Display an error message using SweetAlert2
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while deleting the event.',
        });
      });
  };

  const fetchData = () => {
    // Fetch data from the API using Axios
    axios.get("http://localhost:8080/eventNew/API/events/index.php")
      .then(response => {
        // Log the response to the console to inspect its structure
        console.log("API Response:", response.data);

        // Assuming the API response is an object with an 'events' property
        setEvents(response.data.events);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      }); 
  };

  const [timeRemaining, setTimeRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Function to calculate the time remaining between two dates
  const calculateTimeRemaining = (eventDate) => {
    const now = new Date();
    const endDate = new Date(eventDate);
    const timeDifference = endDate - now;

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    setTimeRemaining({ days, hours, minutes, seconds });
  };

  // Update the time remaining every second
  useEffect(() => {
    const interval = setInterval(() => {
      events.forEach((event) => {
        calculateTimeRemaining(event.event_date);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [events]);


  useEffect(() => {
    // Fetch initial data when the component mounts
    fetchData();
  }, []); // The empty dependency array ensures that this effect runs only once (on mount)

  return (
    <div className="container mt-5">
      <div className="row mb-5">
        <div dir="end">
      <Button variant="dark" onClick={handleShowModal}>
        Add Event
      </Button>
      </div>
      </div>
      <div className="row d-flex justify-content-center">
      {events.map((event) => (
        <div key={event.id} className="col-md-9 mb-4">
          <div className="card">
            <img
              src={`http://localhost:8080/eventNew/API/uploads/${event.event_img}`}
              className="card-img-top"
              alt={event.event_name}
              height="300px"
            />
            <div className="card-body">
              <h5 className="card-title">{event.event_name}</h5>
              <p className="card-text">Date: {event.event_date}</p>
              <p className="card-text">Time: {event.event_time}</p>
              <p className="card-text">Countdown: {timeRemaining.days} days, {timeRemaining.hours} hours, {timeRemaining.minutes} minutes, {timeRemaining.seconds} seconds</p>
              <div className="col-12 row">
                <div className="col-6">
                  <Button variant="primary" onClick={() => handleEditEvent(event)}>Edit</Button>
                </div>
                <div className="col-6">
                  <Button variant="danger" onClick={() => handleDelete(event.id)}>Delete</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>

{/* Add/Edit Event Modal */}
<Modal show={showModal} onHide={handleCloseModal}>
  <Modal.Header closeButton>
    <Modal.Title>{editEvent ? 'Edit Event' : 'Add Event'}</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      {editEvent && (
        <Form.Group controlId="formEventId">
          <Form.Control
            type="hidden"
            name="id"
            value={editEvent.id}
            readOnly
          />
        </Form.Group>
      )}

      <Form.Group controlId="formEventName">
        <Form.Label>Event Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter event name"
          name="event_name"
          value={newEvent.event_name}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formEventDate">
        <Form.Label>Event Date</Form.Label>
        <Form.Control
          type="date"
          name="event_date"
          value={newEvent.event_date}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formEventTime">
        <Form.Label>Event Time</Form.Label>
        <Form.Control
          type="time"
          name="event_time"
          value={newEvent.event_time}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formEventDescription">
        <Form.Label>Event Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter event description"
          name="event_description"
          value={newEvent.event_description}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formEventImage">
        <Form.Label>Event Image</Form.Label>
        <Form.Control
          type="file"
          accept="image/*"
          onChange={(e) => handleImageChange(e)}
        />
      </Form.Group>
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleCloseModal}>
      Close
    </Button>
    {editEvent ? (
      <Button variant="primary" onClick={handleUpdateEvent}>
        Update Event
      </Button>
    ) : (
      <Button variant="primary" onClick={handleAddEvent}>
        Add Event
      </Button>
    )}
  </Modal.Footer>
</Modal>


    </div>
  );
};

export default Event;
