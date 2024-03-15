import React, { useState, useEffect } from "react";
import axios from "axios";
import { Api1 } from "./App";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, useParams } from "react-router-dom";

export function Updateauthor() {
  const { id } = useParams();

  const [author, setAuthor] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAuthor = async () => {
      const apiUrl = `${Api1}/${id}`;
      try {
        const res = await axios.get(apiUrl);
        setAuthor(res.data);
      } catch (error) {
        console.error(`Error fetching data from ${apiUrl}:`, error);
        setError(error.message); // Set error state with error message
      }
    };

    fetchAuthor();
  }, [id]);
  if (error) {
    return <h1>Error: {error}</h1>; // Render error message if there's an error
  }
  return author ? (
    <EditAuthor author={author} />
  ) : (
    <h1>Your Data is Loading</h1>
  );
}
function EditAuthor({ author }) {
  //author,poster,name,birthDate,biography
  const navigate = useNavigate();
  const [name, setName] = useState(author.name);
  const [birthDate, setBirthDate] = useState(author.birthDate);
  const [biography, setBiography] = useState(author.biography);
  const [poster, setPoster] = useState(author.poster);

  const handleSubmit = async () => {
    const updatedAuthor = {
      name,
      birthDate,
      biography,
      poster,
    };
    try {
      await axios.put(`${Api1}/${author.id}`, updatedAuthor);
      navigate("/authors");
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  const handleCancel = () => {
    navigate("/authors");
  };
  return (

    <div className="container mx-auto mt-20 gap-4">
      <div className="w-6/12 mx-auto px-4 min-w-55 font-bold text-lg py-2 m-5 font-Domine gap-3 flex flex-col items-center space-y-2">
        <h1>Edit Author details</h1>
        <Formik initialValues={{}} onSubmit={handleSubmit}>
          <Form>
            <div className="form-group flex justify-between">
              <label htmlFor="name" className="inline-block mb-6">
                Name
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12 sm:w-60 md:w-96 rounded-md border-0 py-1.5 pl-2 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6" />
              <ErrorMessage
                name="name"
                component="div"
                className="error text-red-500" />
            </div>

            <div className="form-group flex justify-between">
              <label htmlFor="poster" className="inline-block mb-6">
                poster
              </label>
              <Field
                type="text"
                id="poster"
                name="poster"
                value={poster}
                onChange={(e) => setPoster(e.target.value)}
                className="h-12 sm:w-60 md:w-96 rounded-md border-0 py-1.5 pl-2 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6" />
              <ErrorMessage
                name="poster"
                component="div"
                className="error text-red-500" />
            </div>

            <div className="form-group flex justify-between">
              <label htmlFor="birthDate" className="inline-block mb-6">
                Birth Date
              </label>
              <Field
                type="text"
                id="birthDate"
                name="birthDate"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="h-12 sm:w-60 md:w-96 rounded-md border-0 py-1.5 pl-2 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6" />
              <ErrorMessage
                name="birthDate"
                component="div"
                className="error text-red-500" />
            </div>

            <div className="form-group flex justify-between">
              <label htmlFor="biography" className="inline-block mb-6">
                Biography
              </label>
              <Field
                type="text"
                id="biography"
                name="biography"
                value={biography}
                onChange={(e) => setBiography(e.target.value)}
                className="h-12 sm:w-60 md:w-96 rounded-md border-0 py-1.5 pl-2 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6" />
              <ErrorMessage
                name="biography"
                component="div"
                className="error text-red-500" />
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
