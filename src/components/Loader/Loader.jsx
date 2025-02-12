import { RotatingLines } from 'react-loader-spinner'

export const Loader = () => {
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <RotatingLines
          visible={true}
          height="96"
          width="96"
          color="grey"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    </>
  );
};
