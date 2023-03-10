import { Spinner } from "flowbite-react";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Navbars from "../components/Navbars";
import { API } from "../config/api";
import search from "../assets/icons8-search.svg"
import { Plock } from "react-plock"

export default function HomePage() {

  const { data: post } = useQuery("postCache", async () => {
    const response = await API.get("/posts");
    return response.data.data.post;
  });

  const thumbnail = Array.isArray(post) ? post.map((item) => {
    return item.post_image[0];
  }) : [];

  
  return (
    <>
      <Navbars />
      
      <div className="w-full pt-5 lg:max-w-screen-3xl" style={{ paddingLeft: "3.5rem", paddingRight: "4rem"}}>
        <div className=" flex justify-between items-center">
          <div>
              <select
                  id="countries"
                  className="bg-gray-200 border-none text-gray-600 text-xs rounded-md focus:ring-0 focus:border-none block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
              >
                  <option value="today">Todays</option>
                  <option value="US">Followed</option>
              </select>
          </div>

          <div>
              <form className="flex items-center">
                  <div className="relative w-full">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <img src={search} alt="search" width={20} height={20}/>
                      </div>
                      <input
                          type="text"
                          id="simple-search"
                          className="w-48 bg-gray-200 border-none text-gray-900 text-xs rounded-lg focus:ring-0 focus:border-none block pl-10   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Search"
                      />
                  </div>
              </form>
          </div>
        </div>

        <div className="pt-8 font-medium">
          <h1 className="mb-4">today's post</h1>
          <Plock nColumns={3} gap={15}>
            {post?.map((item) => (
              <Link to={`/detail/${item?.id}`} key={item?.id}>
                {item.post_image?.map((img, index) => (
                    <img key={index} src={img.image} className="w-full shadow-md shadow-green-400 rounded-md hover:shadow-lg hover:shadow-green-500 hover:transition-shadow hover:ease-in-out" alt="thumbnail" />
                )).shift()}
              </Link>
            ))}
          </Plock>
        </div>
    </div>
    </>
  )
}
