import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Api1 } from "./App";
import { Navbar } from "./Navbar";
import * as yup from 'yup';

export function AddAuthor() {
  const navigate = useNavigate();
  
  // Define validation schema using Yup
  const formValidationSchema = yup.object({
    name: yup.string().min(5, "Need a longer name").required("Name is required"),
    birthDate: yup.string().min(5, "Need a longer birthDate").required("Birth Date is required"),
    biography: yup.string().min(20, "Need a longer biography").required("Biography is required"),
    poster: yup.string().min(5, "Need a longer poster").required("Poster is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Validate form values against the schema
      await formValidationSchema.validate(values, { abortEarly: false });
      // Make a POST request to the API endpoint to add the new author
      const response = await axios.post(Api1, values);
      console.log("New author added:", response.data);
      navigate("/authors");
    
    } catch (error) {
      if (error.name === "ValidationError") {
        error.inner.forEach((fieldError) => {
          // Set the corresponding field's error message in Formik
          fieldError(fieldError.path, fieldError.message);
        });
      } else {
        console.error("Error adding new author:", error);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const initialValues = {
    name: "",
    birthDate: "",
    biography: "",
    poster: ""
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-20 gap-4">
        <div className="w-6/12 mx-auto px-4 min-w-55 font-bold text-lg py-2 m-5 font-Domine gap-3 flex flex-col items-center space-y-2">
          <h1>Add New Author </h1>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={formValidationSchema} // Set validation schema
          >
            <Form>
              <div className="form-group">
                <label htmlFor="name" className="block mb-2">
                  Name
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="h-12 w-full rounded-md border-0 py-1.5 pl-2 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-500"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="form-group">
                <label htmlFor="birthDate" className="block mb-2">
                  Birth Date
                </label>
                <Field
                  type="text"
                  id="birthDate"
                  name="birthDate"
                  className="h-12 w-full rounded-md border-0 py-1.5 pl-2 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-500"
                />
                <ErrorMessage
                  name="birthDate"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="form-group">
                <label htmlFor="biography" className="block mb-2">
                  Biography
                </label>
                <Field
                  type="text"
                  id="biography"
                  name="biography"
                  className="h-12 w-full rounded-md border-0 py-1.5 pl-2 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-500"
                />
                <ErrorMessage
                  name="biography"
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
                Add Author
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
}
