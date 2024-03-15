import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Api } from "./App";
export function UpdateBooks() {

  const { id } = useParams();
 const [book, setBook] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      const apiUrl = `${Api}/${id}`;
      try {
        const res = await axios.get(apiUrl);
        setBook(res.data);
      } catch (error) {
        console.error(`Error fetching data from ${apiUrl}:`, error);
        setError(error.message); // Set error state with error message
      }
    };


    fetchBook();
  }, [id]);

  if (error) {
    return <h1>Error: {error}</h1>; // Render error message if there's an error
  }

  return book ? <EditBook book={book} /> : <h1>Your Data is Loading</h1>;
}


function EditBook({ book }) {
  const navigate = useNavigate();

  // Initialize state with book data
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [ISBNNumber, setISBNNumber] = useState(book.ISBNNumber);
  const [date, setDate] = useState(book.date);
  const [poster, setPoster] = useState(book.poster);

  const handleSubmit = async () => {
    const updatedBook = {
      title,
      author,
      ISBNNumber,
      date,
      poster
    };
    try {
      await axios.put(`${Api}/${book.id}`, updatedBook);
      navigate("/books");
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  const handleCancel = () => {
    navigate("/books");
  };

  return (
    <div className="container mx-auto mt-20 gap-4">
      <div className="w-6/12 mx-auto px-4 min-w-55 font-bold text-lg py-2 m-5 font-Domine gap-3 flex flex-col items-center space-y-2">
        <h1>Edit Book</h1>
        <Formik initialValues={{}} onSubmit={handleSubmit}>
          <Form>
            <div className="form-group flex justify-between">
              <label htmlFor="title" className="inline-block mb-6">
                Title
              </label>
              <Field
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="h-12 sm:w-60 md:w-96 rounded-md border-0 py-1.5 pl-2 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="error text-red-500"
              />
            </div>

            <div className="form-group flex justify-between">
              <label htmlFor="author" className="inline-block mb-6">
                Author
              </label>
              <Field
                type="text"
                id="author"
                name="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="h-12 sm:w-60 md:w-96 rounded-md border-0 py-1.5 pl-2 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
              />
              <ErrorMessage
                name="author"
                component="div"
                className="error text-red-500"
              />
            </div>

            <div className="form-group flex justify-between">
              <label htmlFor="ISBNNumber" className="inline-block mb-6">
                ISBN Number
              </label>
              <Field
                type="text"
                id="ISBNNumber"
                name="ISBNNumber"
                value={ISBNNumber}
                onChange={(e) => setISBNNumber(e.target.value)}
                className="h-12 sm:w-60 md:w-96 rounded-md border-0 py-1.5 pl-2 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
              />
              <ErrorMessage
                name="ISBNNumber"
                component="div"
                className="error text-red-500"
              />
            </div>

            <div className="form-group flex justify-between">
              <label htmlFor="date" className="inline-block mb-6">
                Date
              </label>
              <Field
                type="text"
                id="date"
                name="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="h-12 sm:w-60 md:w-96 rounded-md border-0 py-1.5 pl-2 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
              />
              <ErrorMessage
                name="date"
                component="div"
                className="error text-red-500"
              />
            </div>

            <div className="form-group flex justify-between">
              <label htmlFor="poster" className="inline-block mb-6">
                Poster
              </label>
              <Field
                type="text"
                id="poster"
                name="poster"
                value={poster}
                onChange={(e) => setPoster(e.target.value)}
                className="h-12 sm:w-60 md:w-96 rounded-md border-0 py-1.5 pl-2 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
              />
              <ErrorMessage
                name="poster"
                component="div"
                className="error text-red-500"
              />
            </div>

            <button
              type="submit"
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Update Book
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="mt-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}