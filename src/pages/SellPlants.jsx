/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createSalesData } from "../api/plants";

const validationSchema = Yup.object().shape({
  quantity: Yup.number().required("Required").min(1, "Must be at least 1"),
  farmerName: Yup.string().required("Required"),
  mobile: Yup.string()
    .required("Required")
    .matches(/^[0-9]{10}$/, "Invalid mobile number"),
  place: Yup.string().required("Required"),
  amount: Yup.number().required("Required").min(0),
});

const SellPlants = () => {
  const { plantId } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setError("");

      // Convert numeric values to numbers
      const payload = {
        ...values,
        plantId,
        quantity: Number(values.quantity),
        amount: Number(values.amount),
      };

      const response = await createSalesData(payload);

      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to save sale. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-20 min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold mb-6 text-center text-primary">
            Sell Plants
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
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div>
                  <label className="block text-white mb-2">Quantity</label>
                  <Field
                    type="number"
                    name="quantity"
                    className="input input-bordered"
                  />
                  <ErrorMessage
                    name="quantity"
                    component="div"
                    className="text-error"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2">Farmer Name</label>
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
                  <label className="block text-white mb-2">Mobile Number</label>
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
                  <label className=" block text-white mb-2">Place</label>
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
                  <label className=" block text-white mb-2">Amount</label>
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
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save Sale"}
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
