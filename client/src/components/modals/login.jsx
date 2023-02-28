import React from "react";
import { useState } from "react";
import { Alert, Modal, TextInput } from "flowbite-react";
import { useMutation } from "react-query";
import { API } from "../../config/api";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Roller } from "react-awesome-spinners";


export default function LoginModal({ show, handleClose }) {
  const navigate = useNavigate();
  const [state, dispacth] = useContext(AppContext);
  const [alert, setAlert] = useState();
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  const { email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    setLoading(true);
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify(form);

      const response = await API.post("/login", body, config)
      setLoading(false)

      if (response.status === 200) {
        Swal.fire({
            title: "Success",
            text: "Login Success",
            icon: "success",
            confirmButtonText: "OK",
            }).then((result) => {
            if (result.isConfirmed) {
                handleClose()
                dispacth({
                  type: "LOGIN_SUCCESS",
                  payload: response.data.data
                });
            }
            })
        } else {
        Swal.fire({
            title: "Error",
            text: error.response.data.message,
            icon: "error",
            confirmButtonText: "OK",
        }).then((result) => {
        if (result.isConfirmed) {
                handleClose()
        }})
    }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  })

  return (
    <div>
      <Modal show={show} size="sm" popup={true} onClose={handleClose}>
          <Modal.Header />
          <Modal.Body>
              <div className="p-0">
                  <h1 className="text-xl font-semibold text-[#2FC4B2]">
                    Login
                  </h1>
                  {alert}
                  <form
                      onSubmit={(e) => handleSubmit.mutate(e)}
                      className="flex flex-col gap-4 mt-6"
                  >
                      <div>
                          <TextInput
                              id="email"
                              name="email"
                              type="email"
                              placeholder="Email"
                              required={true}
                              onChange={handleChange}
                              value={email}
                          />
                      </div>
                      <div>
                          <TextInput
                              id="password"
                              name="password"
                              type="password"
                              placeholder="Password"
                              required={true}
                              onChange={handleChange}
                              value={password}
                          />
                      </div>

                      <button
                          type="submit"
                          className="px-4 py-2 mt-3 rounded-md text-white font-medium bg-[#2FC4B2] text-xs lg:text-sm"
                          disabled="loading"
                      >
                          {loading ? "Login" : <Roller />}
                      </button>
                  </form>
                  <p className="text-xs text-center mt-4">
                      Don't have an account ? Click Here
                  </p>
              </div>
          </Modal.Body>
      </Modal>
    </div>
  )
}