import { Dropdown, Table } from "flowbite-react";
import { DropdownItem } from "flowbite-react/lib/esm/components/Dropdown/DropdownItem";
import React from "react";
import { useQuery } from "react-query";
import Navbars from "../components/Navbars";
import { API } from "../config/api";
import moment from "moment";
import HourGlass from "../assets/Hourglass.svg";
import Cancel from "../assets/cancel.svg";
import Success from "../assets/Success.svg";


export default function OrderLayout() {

  const { data: orderData, refetch} = useQuery("orderCache", async () => {
    const config = {
      header: {
        "Authorization" : localStorage.token
      }
    }

    const response = await API.get("/offers", config)
    return response.data
  })

  return (
    <>
      <Navbars />

      <div className="py-8 max-w-screen-lg mx-auto">
        <div className="flex flex-row justify-center">
          <h1 className="text-3xl font-bold">MY ORDER</h1>
        </div>
        <Table className="mt-4">
          <Table.Head>
            <Table.HeadCell>
              No
            </Table.HeadCell>
            <Table.HeadCell>
              Client
            </Table.HeadCell>
            <Table.HeadCell>
              Order
            </Table.HeadCell>
            <Table.HeadCell>
              Start Project
            </Table.HeadCell>
            <Table.HeadCell>
              End Project
            </Table.HeadCell>
            <Table.HeadCell>
              Status
            </Table.HeadCell>
            <Table.HeadCell>
              Action
            </Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {orderData?.hired.map((item) => {
              return (
              <Table.Row>
                <Table.Cell>
                  {item?.buyer_id}
                </Table.Cell>
                <Table.Cell>
                  {item?.buyer.fullname}
                </Table.Cell>
                <Table.Cell>
                  {item?.title}
                </Table.Cell>
                <Table.Cell>
                  {moment(item?.startProject).format("MMMM Do YYYY")}
                </Table.Cell>
                <Table.Cell>
                  {moment(item?.endProject).format("MMMM Do YYYY")}
                </Table.Cell>
                {item?.status === "success" ? (
                <Table.Cell className="text-green-600">{item?.status}</Table.Cell>
                ) : item?.status === "failed" ? (
                  <Table.Cell className="text-red-800">{item?.status}</Table.Cell>
                ) : item?.status === "pending" ? (
                  <Table.Cell className="text-yellow-700">{item?.status}</Table.Cell>
                ) : item?.status === "Approved Project" ? (
                  <Table.Cell className="text-cyan-700">{item?.status}</Table.Cell>
                ) : (
                  <Table.Cell>{item?.status}</Table.Cell>
                )}
                {item?.status === "success" ? (
                <Table.Cell className="text-green-600"><img src={Success} alt="" /></Table.Cell>
                ) : item?.status === "failed" ? (
                  <Table.Cell className="text-red-800"><img src={Cancel} alt="" /></Table.Cell>
                ) : item?.status === "pending" ? (
                  <Table.Cell className="text-yellow-700"><img src={HourGlass} alt="" /></Table.Cell>
                ) : item?.status === "approved" ? (
                  <Table.Cell className="text-cyan-700"><button className="bg-green-700 py-1 px-3"> View Project</button></Table.Cell>
                ) : (
                  <Table.Cell>{item?.status}</Table.Cell>
                )}
              </Table.Row>
              )
            })}
          </Table.Body>
        </Table>
      </div>
    </>
  )
}