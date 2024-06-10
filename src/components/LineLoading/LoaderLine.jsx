import { Bars } from "react-loader-spinner";

const LoaderLine = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <Bars
          visible={true}
          height="50"
          width="50"
          color="grey"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
        </div>
    );
};

export default LoaderLine;