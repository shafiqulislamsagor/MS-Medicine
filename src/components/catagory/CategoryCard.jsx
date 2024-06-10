import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../hooks/AxiosPublic/useAxiosPublic";
import LoaderLine from "../LineLoading/LoaderLine";
import ErrorPage from "../../pages/Error/Error";

const CategoryCard = ({card}) => {
    const axiosPublic = useAxiosPublic()
    const {data:CardCount , isLoading , isError} = useQuery({
        queryKey:['category-count'],
        queryFn:async()=>{
            const {data} = await axiosPublic.get('/products')
            return data
        }
    })
    if(isLoading) return <LoaderLine/>
    if(isError) return <ErrorPage/>
    const productFilter = CardCount.filter(cards => cards.category === card.name)
    return (
        <Link to={`/category-details/${card.name}`} key={card._id} className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow ">
        <div className="h-44"><img className="w-full h-full" src={card.img} alt="" /></div>
        <h5 className="mb-2 text-2xl text-center font-bold tracking-tight mt-4 text-gray-900 ">
          {card.name}
        </h5>
        <h2 className="font-bold text-lg price-color">Products: <span>{productFilter.length}</span></h2>
      </Link>
    );
};

export default CategoryCard;