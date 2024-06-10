import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/AxiosPublic/useAxiosPublic";
import CategoryCard from "./CategoryCard";
import LoaderLine from "../LineLoading/LoaderLine";
import ErrorPage from "../../pages/Error/Error";


const Category = () => {
    const axiosPublic = useAxiosPublic()
    const {data:category , isError , isLoading} = useQuery({
        queryKey:['category'],
        queryFn:async()=>{
            const {data} = await axiosPublic.get('/category-all')
            return data
        }
    })
    if(isLoading) return <LoaderLine/>
    if(isError) return <ErrorPage/>
  return (
    <div className="w-[95%] md:w-5/6 mx-auto my-20">
      <h2 className="text-4xl md:text-5xl price-color font-bold text-center">Category</h2>
      <div className="my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {
            category.map(card => <CategoryCard key={card._id} card={card}/>)
        }
      </div>
    </div>
  );
};

export default Category;
