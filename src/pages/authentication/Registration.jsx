import { MdOutlineMailOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import Buttons from "../../components/Button/Buttons";
import {  MenuItem, Select } from "@mui/material";
import { Link } from "react-router-dom";
import useImageUpload from "../../hooks/uploadImage/useImage";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";


// import { useState } from "react";

const Registration = () => {
const {uploadedImageUrl, uploadImage} = useImageUpload()

  const handleChange = async(event) => {
    event.preventDefault()
    // setrole();
    const username = event.target.username.value
    const email = event.target.email.value
    const userRole = event.target.Userrole.value
    const image = event.target.image.files[0]
    await uploadImage(image)
    const uploadImaged = uploadedImageUrl
    const password = event.target.password.value
    const userInfo = {username , password, userRole , uploadImaged ,email}
    
    console.log("🚀 ~ handleChange ~ userInfo:", userInfo)
  };
  return (
    <>
      <div className="pt-10 w-2/4 mx-auto">
        <Buttons
          text="Back"
          link=""
          style="hover:!bg-blue-500 hover:!text-white"
        />
        <section className="bg-gray-50 mt-11 mb-8">
          <div className="w-full background-img rounded-lg shadow">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <p className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Create an new account
              </p>
              <form onSubmit={handleChange} className="space-y-4 md:space-y-6">
                <div>
                  <label
                    htmlFor="user"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Username
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md">
                      <FaRegUserCircle className="w-4 h-4 text-gray-500" />
                    </span>
                    <input
                      type="text"
                      id="user"
                      name="username"
                      className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5"
                      placeholder="Enter Your name"
                      required
                    />
                  </div>
                </div>
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Your Email
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md">
                      <MdOutlineMailOutline className="w-4 h-4 text-gray-500" />
                    </span>
                    <input
                    name="email"
                      type="email"
                      id="email"
                      className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5"
                      placeholder="Your Email Address"
                      required
                    />
                  </div>
                </div>

                {/* roles */}

                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Your Roles
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md">
                      <MdOutlineAdminPanelSettings className="w-4 h-4 text-gray-500" />
                    </span>

                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-0"
                    //   value={role}
                      label="role"
                      required
                      defaultValue={'user'}
                      name="Userrole"
                    >
                      <MenuItem value={"user"}>User</MenuItem>
                      <MenuItem value={"seller"}>Seller</MenuItem>
                    </Select>
                  </div>
                </div>
                {/* image uploading */}

                <div>
                <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Your Uploaded Photo
                  </label>
                  <div className="flex">
                  <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md">
                      <MdOutlineAddPhotoAlternate className="w-4 h-4 text-gray-500" />
                    </span>
                  <input
                    className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5"
                    id="file_input"
                    type="file"
                    name="image"
                  />
                  </div>
                </div>
                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Your New Password
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md">
                      <RiLockPasswordLine className="w-4 h-4 text-gray-500" />
                    </span>
                    <input
                      type="password"
                      id="password"
                      className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5"
                      placeholder="••••••••"
                      required
                      name="password"
                    />
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="terms"
                      className="font-medium text-gray-900"
                    >
                      I accept the{" "}
                      <a
                        className="font-medium text-gray-900 hover:underline"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <input
                  type="submit"
                  value="Log-In"
                  className="w-full text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-[rgb(56,134,233)] border-orange-500 border"
                />

                {/* Registration Link */}
                <p className="text-sm font-light text-gray-900">
                  Already have an account?{" "}
                  <Link
                    to="/join-us"
                    href="#"
                    className="font-medium text-primary-600 hover:underline"
                  >
                   Log-in
                  </Link>
                </p>
              </form>
            </div>
            
          </div>
        </section>
      </div>
    </>
  );
};

export default Registration;
