import React, { useState, useEffect } from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useCarContext } from "./CarContext"; // Make sure to adjust the import path

const Reserve = () => {
  const { selectedCar } = useCarContext();
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    email: "",
    fullName: "",
    pickUpDate: "",
    returnDate: "",
  };

  const today = new Date().toISOString().split("T")[0];

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    fullName: Yup.string().required("Required"),
    pickUpDate: Yup.date()
      .min(today, "Pick-up date cannot be in the past")
      .required("Required"),
    returnDate: Yup.date()
      .min(Yup.ref("pickUpDate"), "Return date cannot be before pick-up date")
      .required("Required"),
  });

  const handleSubmit = (values) => {
    try {
      console.log("Submitting...");
      setIsLoading(true);

      setTimeout(() => {
        console.log("Form submitted with values:", values);
        setIsLoading(false);
      }, 3000);
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
    }
  };

  // Calculate total price based on selected dates and base price
  const calculateTotalPrice = (values) => {
    if (values.pickUpDate && values.returnDate) {
      const pickUpDate = new Date(values.pickUpDate);
      const returnDate = new Date(values.returnDate);

      if (returnDate < pickUpDate) {
        // Return date is before pick-up date, set total price to 0
        setTotalPrice(0);
      } else {
        // Calculate difference in days, ensuring a minimum of 1 day
        const differenceInMilliseconds = returnDate - pickUpDate;
        const differenceInDays = Math.max(
          1,
          Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24))
        );

        // Calculate total price based on the difference in days
        const total = selectedCar.price * differenceInDays;
        setTotalPrice(total);
      }
    }
  };

  useEffect(() => {
    // Calculate total price whenever pick-up or return date changes
    calculateTotalPrice(initialValues);
  }, [initialValues]);

  return (
    <div className="flex flex-col lg:flex-row mx-auto w-full pt-12 justify-around px-4 items-center">
      <div className="max-w-lg w-full p-6 bg-white rounded-md shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Reservation Form</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="fullName" className="block mb-1">
                  Full Name
                </label>
                <Field
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  className="w-full p-2 border rounded"
                />
                <ErrorMessage
                  name="fullName"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block mb-1">
                  Email Address
                </label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="w-full p-2 border rounded"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="pickUpDate" className="block mb-1">
                  Pick Up Date
                </label>
                <Field
                  type="date"
                  name="pickUpDate"
                  min={today}
                  className="w-full p-2 border rounded"
                  onChange={(e) => {
                    handleChange(e);
                    calculateTotalPrice({
                      ...values,
                      pickUpDate: e.target.value,
                    });
                  }}
                />
                <ErrorMessage
                  name="pickUpDate"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="returnDate" className="block mb-1">
                  Return Date
                </label>
                <Field
                  type="date"
                  name="returnDate"
                  min={today}
                  className="w-full p-2 border rounded"
                  onChange={(e) => {
                    handleChange(e);
                    calculateTotalPrice({
                      ...values,
                      returnDate: e.target.value,
                    });
                  }}
                />
                <ErrorMessage
                  name="returnDate"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-orange-600 text-white shadow-md shadow-orange-500 hover:shadow-lg hover:shadow-orange-500 duration-500 hover:scale-105 rounded-md"
              >
                {isLoading ? "Submitting..." : "Submit"}
              </button>
              <div className="text-gray-400 pt-2 text-sm underline">
                <Link to="/">Go Back</Link>
              </div>
              <div>
                <h2 className="text-center font-semibold">
                  Price per day: ${selectedCar.price}
                </h2>
                <h2 className="text-center font-semibold">
                  Total Price: ${totalPrice}
                </h2>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div className="md:px-8">
        <h1 className="text-3xl text-center font-bold pb-4 pt-8 lg:pt-0">
          Your Dream Vehicle Awaits!
        </h1>
        <img src={selectedCar.img} width={800} alt="Vehicle" />
      </div>
    </div>
  );
};

export default Reserve;
