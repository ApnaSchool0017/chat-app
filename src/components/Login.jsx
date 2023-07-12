import React from "react";
import {
  FaFacebook,
  FaLinkedin,
  FaInstagram,
  FaRegEnvelope,
} from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

function Login() {
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = (values) => {
    console.log(values);
    navigator("/sidebar");
  };

  return (
    <div className="flex flex-col min-h-screen py-2 bg-slate-100 items-center justify-center">
      <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
          <div className="w-3/5 p-5">
            <div className="text-left font-bold">
              <span className="text-purple-500">Company</span>Name
            </div>
            <div className="py-10">
              <h2 className="text-3xl font-bold mb-1 text-purple-500">
                Sign in to Account
              </h2>
              <div className="border-2 w-16 inline-block mb-2 border-purple-500 rounded-full"></div>
              <div className="flex items-center justify-center my-2 gap-3">
                <a
                  href="#"
                  className="border-2 border-purple-400  rounded-full p-2"
                >
                  <FaFacebook className="text-xl" />
                </a>
                <a
                  href="#"
                  className="border-2 border-purple-400 rounded-full p-2"
                >
                  <FaLinkedin className="text-xl" />
                </a>
                <a
                  href="#"
                  className="border-2 border-purple-400  rounded-full p-2"
                >
                  <FaInstagram className="text-xl" />
                </a>
              </div>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isValid, dirty }) => (
                  <form
                    className="flex flex-col items-center mt-10"
                    onSubmit={handleSubmit}
                  >
                    {/* Form fields and error messages */}
                    <div className="bg-gray-200 w-64 p-3 rounded-2xl flex items-center mb-4">
                      <FaRegEnvelope className="mr-2 bg-gray-200" />
                      <Field
                        type="text"
                        name="username"
                        placeholder="username"
                        className="bg-gray-200 outline-none text-sm flex-1"
                      />
                    </div>
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="text-red-500"
                    />
                    <div className="bg-gray-200 w-64 p-3 rounded-2xl flex items-center">
                      <MdLockOutline className="mr-2 bg-gray-200" />
                      <Field
                        type="password"
                        name="password"
                        placeholder="password"
                        className="bg-gray-200 outline-none text-sm flex-1"
                      />
                    </div>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500"
                    />
                    <div className="flex w-80 mt-2 items-center justify-end">
                      <a className="text-sm font-semibold">Forget Password?</a>
                    </div>
                    <Link
                      to={isValid && dirty ? "/sidebar" : ""}
                      className={`text-purple-500 shadow-lg mt-4 border-2 border-purple-500 rounded-full px-12 py-2 inline-block font-semibold hover:bg-purple-500 hover:text-white ${
                        !isValid || !dirty
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      Sign in
                    </Link>
                  </form>
                )}
              </Formik>
            </div>
          </div>
          <div className="w-2/5 bg-purple-500 text-white rounded-tr-2xl rounded-br-2xl py-36 px-8">
            <h2 className="text-3xl font-bold mb-1">Welcome Friend</h2>
            <div className="border-2 w-14 inline-block mb-2 border-white rounded-full"></div>
            <p className="mb-8">
              Fill up personal info and start a journey with us.
            </p>
            <a
              href="#"
              className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-purple-500"
            >
              Sign up
            </a>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Login;
