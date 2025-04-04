/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Joi from "joi";
import { createSalesData, getPlantById } from "../api/plants"; // Import getPlant

const SellPlants = () => {
  const { plantId } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [currentStock, setCurrentStock] = useState(0); // Add current stock state

  // Fetch plant data to get current stock
  useEffect(() => {
    const fetchPlant = async () => {
      try {
        const response = await getPlantById(plantId);

        setCurrentStock(response?.stock);
      } catch (err) {
        setError("Failed to load plant data");
      }
    };
    fetchPlant();
  }, [plantId]);

  // Joi validation schema
  const validationSchema = Joi.object({
    quantity: Joi.number()
      .min(1)
      .max(currentStock)
      .required()
      .messages({
        "number.base": "Quantity must be a number",
        "number.min": "Must sell at least 1 plant",
        "number.max": `Cannot exceed available stock of ${currentStock}`,
        "any.required": "Quantity is required",
      }),
    farmerName: Joi.string().required().messages({
      "string.empty": "Farmer name is required",
    }),
    mobile: Joi.string()
      .pattern(/^[0-9]{10}$/)
      .required()
      .messages({
        "string.pattern.base": "Invalid mobile number (10 digits required)",
        "string.empty": "Mobile number is required",
      }),
    place: Joi.string().required().messages({
      "string.empty": "Place is required",
    }),
    amount: Joi.number().min(0).required().messages({
      "number.base": "Amount must be a number",
      "number.min": "Amount cannot be negative",
      "any.required": "Amount is required",
    }),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setError("");
      const { error } = validationSchema.validate(values, {
        abortEarly: false,
      });

      if (error) {
        const errors = {};
        error.details.forEach((detail) => {
          errors[detail.path[0]] = detail.message;
        });
        throw errors;
      }

      const payload = {
        ...values,
        plantId,
        quantity: Number(values.quantity),
        amount: Number(values.amount),
      };

      await createSalesData(payload);
      navigate("/dashboard");
    } catch (err) {
      if (err.response) {
        setError(
          err.response?.data?.message ||
            "Failed to save sale. Please try again."
        );
      } else {
        // Form validation errors
        setError("Please fix the errors in the form");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-20 min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold mb-6 text-center text-primary">
            Sell Plants (Stock: {currentStock})
          </h2>

          {error && (
            <div className="alert alert-error mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <Formik
            initialValues={{
              quantity: "",
              farmerName: "",
              mobile: "",
              place: "",
              amount: "",
            }}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors }) => (
              <Form className="space-y-4">
                <div>
                  <label className="block text-gray-600 mb-2">Quantity</label>
                  <Field
                    type="number"
                    name="quantity"
                    className="input input-bordered"
                    min="1"
                    max={currentStock}
                  />
                  <ErrorMessage
                    name="quantity"
                    component="div"
                    className="text-error text-sm mt-1"
                  />
                </div>

                <div>
                  <label className="block text-gray-600 mb-2">
                    Farmer Name
                  </label>
                  <Field
                    type="text"
                    name="farmerName"
                    className="input input-bordered"
                  />
                  <ErrorMessage
                    name="farmerName"
                    component="div"
                    className="text-error"
                  />
                </div>

                <div>
                  <label className="block text-gray-600 mb-2">
                    Mobile Number
                  </label>
                  <Field
                    type="text"
                    name="mobile"
                    className="input input-bordered"
                  />
                  <ErrorMessage
                    name="mobile"
                    component="div"
                    className="text-error"
                  />
                </div>

                <div>
                  <label className=" block text-gray-600 mb-2">Place</label>
                  <Field
                    type="text"
                    name="place"
                    className="input input-bordered"
                  />
                  <ErrorMessage
                    name="place"
                    component="div"
                    className="text-error"
                  />
                </div>

                <div>
                  <label className=" block text-gray-600 mb-2">Amount</label>
                  <Field
                    type="number"
                    name="amount"
                    className="input input-bordered"
                  />
                  <ErrorMessage
                    name="amount"
                    component="div"
                    className="text-error"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary mt-6 btn-block rounded-full"
                  disabled={isSubmitting || currentStock === 0}
                >
                  {currentStock === 0
                    ? "Out of Stock"
                    : isSubmitting
                    ? "Saving..."
                    : "Save Sale"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SellPlants;
