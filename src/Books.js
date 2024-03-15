import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Api } from "./App";
import { Navbar } from "./Navbar";

// Function component for displaying books
export function Books() {
  const [data, setData] = useState([]); // State to store books data
  const navigate = useNavigate();

  // Fetch books data from API when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(Api); // Fetch data from API
        setData(response.data); // Set data in state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Function to handle deletion of a book
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${Api}/${id}`); // Send delete request to API
      navigate("/", { replace: true }); // Navigate back to home page
      window.location.reload(); // Refresh the page to reflect changes
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Function to handle editing of a book
  const handleEdit = (id) => {
    navigate(`/update-book/${id}`); // Navigate to the update book page
  };

  return (
    <>
      <Navbar /> {/* Render the Navbar component */}
      <div className="card flex flex-wrap justify-around mx-auto m-4">
        {/* Map through the books data and render each book as a Card */}
        {data ? (
          data.map((item) => (
            <Card key={item.id} item={item} onDelete={() => handleDelete(item.id)} onEdit={handleEdit} />
          ))
        ) : (
          <div className="loader"></div> // Render loader if data is not available
        )}
      </div>
    </>
  );
}

// Function component for rendering each book as a card
function Card({ item, onDelete, onEdit }) {
  // Function to handle edit button click
  const handleEditClick = () => {
    onEdit(item.id);
  };

  // Function to handle delete button click
  const handleDeleteClick = () => {
    onDelete(item.id);
  };

  return (
    <div className="m-5 p-4 min-w-60 max-w-80 min-h-80 max-h-full bg-grey-400 gap-2 rounded border shadow-md shadow-zinc-600 text-center flex flex-col justify-evenly items-center" id="card">
      {/* Display book details */}
      <img src={item.poster} className="h-60 w-full object-contain" alt={item.title} />
      <div className="flex flex-col items-center mt-2">
        <p className="p-1 text-2xl font-bold font-poppins mt-2">{item.title}</p>
        <p className=" text-xl font-medium font-poppins">Author - {item.author}</p>
        <p className="p-1 text-base text-gray-500 font-poppins">ISBN Number - {item.ISBNNumber}</p>
        <p className="p-1 text-base text-gray-500 font-poppins">Published on - {item.date}</p>
        {/* Buttons for edit and delete actions */}
        <div className="flex justify-around space-x-4 mt-4">
          <button className="bg-blue-500 hover:bg-green-600 text-white px-4 py-2 rounded-full" onClick={handleEditClick}>
            Edit
          </button>
          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full" onClick={handleDeleteClick}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
