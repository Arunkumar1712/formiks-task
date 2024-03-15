import React, { useState, useEffect } from "react";
import axios from "axios";
import { Api1 } from "./App"; // Importing the API endpoint from the App module
import { useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";

// Function component to display author details
export function Authordetails() {
  const [data, setData] = useState([]); // State to store fetched data
  const navigate = useNavigate(); // Hook to navigate between routes
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(Api1); // Fetch data from the API
        setData(response.data); // Update the state with fetched data
      } catch (error) {
        console.error("Error fetching data:", error); 
      }
    };
    fetchData(); // Call the fetchData function
  }, []); // this effect runs only once, on mount

  // Function to handle delete operation for an author
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${Api1}/${id}`); // Send DELETE request to API endpoint
      navigate("/"); // Navigate back to the home page after successful deletion
    } catch (error) {
      console.error("Error deleting user:", error); // Log any errors
    }
  };

  // Function to handle edit operation for an author
  const handleEdit = (id) => {
    navigate(`/update-Author/${id}`); // Navigate to the edit page for the selected author
  };

  return (
    <>
      <Navbar /> {/* Render the Navbar component */}
      {/* Display author cards */}
      <div className="card flex flex-wrap justify-around mx-auto m-4">
        {/* Map over the data array and render an Authors component for each author */}
        {data.map((author) => (
          <Authors
            key={author.id} // Set a unique key for each author
            author={author} // Pass author data as props to the Authors component
            onDelete={() => handleDelete(author.id)} // Pass handleDelete function as prop
            onEdit={handleEdit} // Pass handleEdit function as prop
          />
        ))}
      </div>
    </>
  );
}

// Function component to display individual author card
function Authors({ author, onDelete, onEdit }) {
  const handleDeleteClick = () => {
    onDelete(author.id); // Calling the onDelete function with author id
  };

  const handleEditClick = () => {
    onEdit(author.id); // Calling the onEdit function with author id
  };

  return (
    <div
      className="m-5 p-4 min-w-60 max-w-80 min-h-80 max-h-full bg-grey-400 gap-2 rounded border shadow-md shadow-zinc-600 text-center flex flex-col justify-evenly authors-center"
      id="card"
    >
      {/* Displaying author details */}
      <img
        src={author.poster}
        className="h-60 w-full object-contain"
        alt={author.title}
      />
      <h2>{author.name}</h2>
      <p>
        <strong>Birth Date:</strong> {author.birthDate}
      </p>
      <p>{author.biography}</p>
      {/* Buttons for edit and delete operations */}
      <div className="flex justify-around space-x-4 mt-4">
        <button
          className="bg-blue-500 hover:bg-green-600 text-white px-4 py-2 rounded-full"
          onClick={handleEditClick} // Handle edit button click
        >
          Edit
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full"
          onClick={handleDeleteClick} // Handle delete button click
        >
          Delete
        </button>
      </div>
    </div>
  );
}
