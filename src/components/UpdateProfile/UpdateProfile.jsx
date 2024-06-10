import { toast } from "react-toastify";
import useAuth from "../../hooks/Auth/useAuth";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { useMutation, useQuery } from "@tanstack/react-query";
import LoaderLine from "../LineLoading/LoaderLine";
import ErrorPage from "../../pages/Error/Error";
import useAxiosPublic from "../../hooks/AxiosPublic/useAxiosPublic";
import useImageUpload from "../../hooks/uploadImage/useImage";

const UpdateProfile = () => {
  const { updateProfiles, updateProfilesPhoto, user , setRender } = useAuth();
  const {uploadImage} = useImageUpload()
  const axioSecure = useAxiosPublic();
  const {data:UpdateProfile , isLoading , isError , refetch} = useQuery({
    queryKey: ["UpdateProfile"],
    queryFn: async () => {
      const res = await axioSecure.get(`/currentUser/${user.email}`)
      return res.data;
    },
  })
  const { mutate: updateProfilesInfo } = useMutation({
    mutationFn: async (userInfo) => {
        const res = await axioSecure.patch(`/user-update/${user.email}`, userInfo)
        return res.data;
    },
    onSuccess:async () => {
     
      refetch();
      setRender(false)
      toast.success("Profile Update successfully");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed Update profile");
    },
  });
  const fromHandle =async (event) => {
    event.preventDefault();
    // setrole();
    const username = event.target.username.value;
    const image = event.target.image.files[0];
    const img = await uploadImage(image);
    // console.log(img)

    const userInfo = {
      username,
      img
    };
    updateProfilesPhoto(img)
    updateProfiles(username)
    updateProfilesInfo(userInfo);

  };
  if(isLoading) return <LoaderLine/>
  if(isError) return <ErrorPage/>
  return (
    <div>
      <div>
        <div className="my-12">
          <h3 className="text-4xl text-gray-800 font-bold text-center mt-12">
            Profile Info
          </h3>
          <div className="flex justify-center my-7">
            <div className=" p-8 sm:flex rounded-3xl sm:space-x-6 bg-cyan-900 text-gray-100">
              <div className="flex-shrink-0 w-full mb-6 h-44 sm:h-32 sm:w-32 sm:mb-0">
                <img
                  src={UpdateProfile?.img}
                  alt=""
                  className="object-cover object-center w-full h-full rounded bg-gray-500"
                />
              </div>
              <div className="flex flex-col space-y-4">
                <div>
                  <h2 className="text-2xl font-semibold">
                    {UpdateProfile?.username}
                  </h2>
                  <span className="text-sm text-gray-400">
                    {user?.emailVerified ? "Verified" : "Not Verified"}
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="flex items-center space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      aria-label="Email address"
                      className="w-4 h-4"
                    >
                      <path
                        fill="currentColor"
                        d="M274.6,25.623a32.006,32.006,0,0,0-37.2,0L16,183.766V496H496V183.766ZM464,402.693,339.97,322.96,464,226.492ZM256,51.662,454.429,193.4,311.434,304.615,256,268.979l-55.434,35.636L57.571,193.4ZM48,226.492,172.03,322.96,48,402.693ZM464,464H48V440.735L256,307.021,464,440.735Z"
                      ></path>
                    </svg>
                    <span className="text-gray-400">{user?.email}</span>
                  </span>
                  <span className="flex items-center space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      aria-label="Phonenumber"
                      className="w-4 h-4"
                    >
                      <path
                        fill="currentColor"
                        d="M449.366,89.648l-.685-.428L362.088,46.559,268.625,171.176l43,57.337a88.529,88.529,0,0,1-83.115,83.114l-57.336-43L46.558,362.088l42.306,85.869.356.725.429.684a25.085,25.085,0,0,0,21.393,11.857h22.344A327.836,327.836,0,0,0,461.222,133.386V111.041A25.084,25.084,0,0,0,449.366,89.648Zm-20.144,43.738c0,163.125-132.712,295.837-295.836,295.837h-18.08L87,371.76l84.18-63.135,46.867,35.149h5.333a120.535,120.535,0,0,0,120.4-120.4v-5.333l-35.149-46.866L371.759,87l57.463,28.311Z"
                      ></path>
                    </svg>
                    <span className="text-gray-400">+880 17930-35***</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center w-full lg:w-1/3 md:w-2/3 mx-auto my-14">
        <form onSubmit={fromHandle} className="space-y-4 md:space-y-6">
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
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <input
            type="submit"
            value="Update"
            className="w-full text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-[rgb(56,134,233)] border-orange-500 border"
          />
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
