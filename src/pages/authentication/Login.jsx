import { MdOutlineMailOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import Buttons from "../../components/Button/Buttons";
import { Divider } from "@mui/material";
import { Link } from "react-router-dom";

const Login = () => {
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
                Log-In your account
              </p>
              <form className="space-y-4 md:space-y-6">
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
                      type="email"
                      id="email"
                      className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5"
                      placeholder="Your Email Address"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Your Password
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
                    />
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Confirm Password
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md">
                      <RiLockPasswordLine className="w-4 h-4 text-gray-500" />
                    </span>
                    <input
                      type="password"
                      id="confirm-password"
                      className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5"
                      placeholder="••••••••"
                      required
                    />
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
                 Create a new accounts?{" "}
                  <Link to='/registration'
                    href="#"
                    className="font-medium text-primary-600 hover:underline"
                  >
                    Registration Now
                  </Link>
                </p>
              </form>
            </div>
            <Divider>Social Log-In</Divider>
            <div
              className=" rounded-md w-full mx-auto max-w-sm  bg-transparent p-6 "
              id="login-model"
            >

              <div className="mt-4">
                <a href="#" className="block">
                  <button className="w-full text-center py-2 my-3 border flex items-center justify-center gap-2 border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150">
                    <span className="[&>svg]:h-7 [&>svg]:w-7 [&>svg]:fill-[#000000]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 488 512"
                      >
                        
                        <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                      </svg>
                    </span>
                    <span className="text-gray-900 font-bold">
                      Login with Google
                    </span>
                  </button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Login;
