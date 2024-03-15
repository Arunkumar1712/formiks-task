import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Api } from "./App";
import { Navbar } from "./Navbar";
import * as yup from 'yup';

export function AddBook() {
  const navigate = useNavigate();
  
  // Define validation schema using Yup
  const formValidationSchema = yup.object({
    title: yup.string().min(4,"need a longer name").required('Title is required'),
    author: yup.string().required('Author is required'),
    ISBNNumber: yup.string().required('ISBN Number is required'),
    date: yup.string().required('Date is required'),
    poster: yup.string().required('Poster is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Validate form values against the schema
      await formValidationSchema.validate(values, { abortEarly: false });
      // Make a POST request to the API endpoint to add the new book
      const response = await axios.post(Api, values);
      console.log("New book added:", response.data);
      navigate("/", { replace: true });
      window.location.reload();
    } catch (error) {
      if (error.name === "ValidationError") {
        error.inner.forEach((fieldError) => {
          // Set the corresponding field's error message in Formik
          fieldError(fieldError.path, fieldError.message);
        });
      } else {
        console.error("Error adding new book:", error);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const initialValues = {
    title: "",
    author: "",
    ISBNNumber: "",
    date: "",
    poster: ""
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-20 gap-4">
        <div className="w-6/12 mx-auto px-4 min-w-55 font-bold text-lg py-2 m-5 font-Domine gap-3 flex flex-col items-center space-y-2">
          <h1>Add New Book </h1>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={formValidationSchema} // Set validation schema
          >
            <Form>
              <div className="form-group">
                <label htmlFor="title" className="block mb-2">
                  Title
                </label>
                <Field
                  type="text"
                  id="title"
                  name="title"
                  className="h-12 w-full rounded-md border-0 py-1.5 pl-2 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-500"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="form-group">
                <label htmlFor="author" className="block mb-2">
                  Author
                </label>
                <Field
                  type="text"
                  id="author"
                  name="author"
                  className="h-12  rounded-md border-0 py-1.5 pl-2 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-500"
                />
                <ErrorMessage
                  name="author"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="form-group">
                <label htmlFor="ISBNNumber" className="block mb-2">
                  ISBN Number
                </label>
                <Field
                  type="text"
                  id="ISBNNumber"
                  name="ISBNNumber"
                  className="h-12 w-full rounded-md border-0 py-1.5 pl-2 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-500"
                />
                <ErrorMessage
                  name="ISBNNumber"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="form-group">
                <label htmlFor="date" className="block mb-2">
                  Date
                </label>
                <Field
                  type="text"
                  id="date"
                  name="date"
                  className="h-12 w-full rounded-md border-0 py-1.5 pl-2 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-500"
                />
                <ErrorMessage
                  name="date"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="form-group">
                <label htmlFor="poster" className="block mb-2">
                  Poster
                </label>
                <Field
                  type="text"
                  id="poster"
                  name="poster"
                  className="h-12 w-full rounded-md border-0 py-1.5 pl-2 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-500"
                />
                <ErrorMessage
                  name="poster"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Add Book
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
}
