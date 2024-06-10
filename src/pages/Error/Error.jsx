import { Link } from "react-router-dom";
import ErrorAni from "../../components/ErrorAni/ErrorAni";


const ErrorPage = () => {
    return (
        <div className="h-screen w-screen lg:w-4/5 mx-auto flex items-center">
            <div className="container flex flex-col md:flex-row items-center justify-between px-5 text-gray-700">
                <div className="w-full lg:w-1/2 mx-8">
                    <div className="text-7xl text-[#ff0] font-dark font-extrabold mb-8">404</div>
                    <p className="text-2xl text-black md:text-3xl font-light leading-normal mb-8">
                        Sorry we couldn&apos;t find the page . Click Back to Home button
                    </p>
                    <Link
                        to='/'
                        className="px-5 inline py-3 text-sm font-medium leading-5 shadow-2xl text-black transition-all duration-400 border border-transparent rounded-lg focus:outline-none bg-red-600 active:bg-green-600 hover:bg-green-700"
                    >
                        back to homepage
                    </Link>
                </div>
                <div className="w-full lg:flex lg:justify-end lg:w-1/2 mx-5 my-12">
                    <ErrorAni/>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;