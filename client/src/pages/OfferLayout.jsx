import { Dropdown, Table } from "flowbite-react";
import { DropdownItem } from "flowbite-react/lib/esm/components/Dropdown/DropdownItem";
import React, { useEffect } from "react";
import { QueryClient, useMutation, useQuery } from "react-query";
import Navbars from "../components/Navbars";
import { API } from "../config/api";
import moment from "moment";
import HourGlass from "../assets/Hourglass.svg";
import Cancel from "../assets/cancel.svg";
import Success from "../assets/Success.svg";


export default function OfferLayout() {

  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  const { data: offerData, refetch} = useQuery("offerCache", async () => {
    const config = {
      header: {
        "Authorization" : localStorage.token
      }
    }

    const response = await API.get("/orders", config)
    return response.data
  })

  const updateStatus = useMutation( async ({id, status}) => {
    const body = {status}
    const response = await API.patch(`/hired/${id}`, body)
    return response.data
  },
  {
    onSuccess: () => {
      refetch();
    }
  },
  );

  const handleCancel = (id) => {
    updateStatus.mutate({ id, status: "failed"})
  };

  const handleApprove = (id) => {
    updateStatus.mutate({ id, status: "success"})
  }

  useEffect(() => {
    if (updateStatus.isSuccess) {
      refetch();
    }
  }, [updateStatus.isSuccess, refetch])


  return (
    <>
      <Navbars />

      <div className="py-8 max-w-screen-lg mx-auto">
        <div className="flex flex-row justify-center">
          <h1 className="text-3xl font-bold">MY OFFER</h1>
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
            {offerData?.hired.map((item) => {
              return (
              <Table.Row key={item?.id}>
                <Table.Cell>
                  {item?.id}
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
                  <Table.Cell className="text-yellow-700"><div className="flex flex-row gap-5 justify-between">
                    <button onClick={() => handleCancel(item?.id)} className="bg-red-600 py-1 px-3 rounded-md text-white font-semibold hover:bg-red-900">Cancel</button>
                    <button onClick={() => handleApprove(item?.id)} className="bg-green-600 py-1 px-3 rounded-md text-white font-semibold hover:bg-green-900">Approve</button>
                  </div></Table.Cell>
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