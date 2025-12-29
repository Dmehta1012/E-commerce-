import { useQuery } from "@tanstack/react-query";
import { getproduct } from "../api/productapi";
import { Button } from "./ui/button";
import { HeartIcon, Search } from "lucide-react";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
export const Product = () => {
  const [searchItem, setSearchItem] = useState("");
  const [category, setcategory] = useState("all");
//   const [additem,setadditem]=useState([])
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: getproduct,
  });
  const handleInputChange = (e) => {
    setSearchItem(e.target.value);
  };

  if (isError) return <h1>Error fetching the product</h1>;
  if (isLoading) return <h1>Loading...</h1>;

    const filterData = data.filter((product) => {
    const filterproduct = product.title
      .toLowerCase()
      .includes(searchItem.toLowerCase());
    const filtercategory = category === "all" || product.category === category;
    return filterproduct && filtercategory;
  });
// const addtocart=(products)=>{
//     if(products.additem===0)
// }
const handlereset=()=>{
    setcategory("all")
}
  return (
    <>
      <div className="m-10">
        <nav>
          <div className="grid grid-cols-2 mb-10 border rounded-2xl p-2">
            <div className="ml-20">
              <h1 className="font-bold text-2xl">E-store</h1>
            </div>
            <div className="p-1 flex gap-4 ">
              <Button>
                <FaShoppingCart size={20} />
              </Button>
              <Button>
                <HeartIcon size={20} />
              </Button>
            </div>
          </div>
        </nav>
        <div className="flex gap-8">
          <div className=" p-3 w-sm h-1/2 border rounded-3xl ">
            <h1 className="text-center text-3xl">Filter</h1>
            <Button className="mt-2 w-full">Clear all </Button>
            <div className="mt-3 mb-3">
              <div className="">
                <h1 className="text-2xl  font-bold">Categories</h1>
                <input
                  type="checkbox"
                  checked={category==="electronics"}
                  onChange={() => setcategory("electronics")}
                />
                <label htmlFor="">Electronics</label>
                <br />
                <input
                  type="checkbox"

                  checked={category==="jewelery"}
                  onChange={() => setcategory("jewelery")}
                />
                <label htmlFor="">Jewelery</label>
                <br />
                <input
                  type="checkbox"
                  checked={category==="men's clothing"}
                  onChange={() => setcategory("men's clothing")}
                />
                <label htmlFor="">Men's Clothing</label>
                <br />
                <input
                  type="checkbox"
                    checked={category==="women's clothing"}
                  onChange={() => setcategory("women's clothing")}
                />
                <label htmlFor="">Women's Clothing</label>
                <br />
              </div>
            </div>
            <hr />
            <div className="mt-3">
              <h1 className="font-bold text-2xl">Price Range:</h1>
              <input type="range" />
              <Button className="mt-2 w-full">Apply Price Filter </Button>
            </div>
            <hr />
            <div className="mt-3">
              <h1 className="font-bold text-2xl">Minimum Rating</h1>
              <input type="checkbox" />
            </div>
          </div>
          <div className="">
            <div className="w-full flex">
              <input
                type="search"
                className=" items-center mb-6 border rounded-3xl p-2 text-center w-2xl "
                placeholder="search"
                onChange={handleInputChange}
              />
              <Button className="h-10 ml-3 rounded-3xl">
                <Search />
              </Button>
            </div>
            <div className="grid  grid-cols-3 gap-8">
              {filterData?.map(({ id, title, price, image, category }) => (
                <div
                  key={id}
                  className="w-auto border rounded-2xl p-5 hover:shadow-2xl"
                >
                  <img
                    src={image}
                    alt={title}
                    className="w-full h-66 p-4 border-2 rounded-2xl"
                  />
                  <p className="font-extralight  rounded-3xl ">{category}</p>
                  <h2 className="font-light mt-3">
                    <span className="font-bold ">Name:</span>
                    {title}
                  </h2>
                  <p className="font-bold mt-2">Price:${price}</p>

                  <Button className="mt-2">
                    <FaShoppingCart /> Add to cart
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};