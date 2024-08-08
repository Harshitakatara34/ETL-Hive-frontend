import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Welcome = () => {
  const [leads, setLeads] = useState([]);
  const [leadDetails, setLeadDetails] = useState({
    name: "",
    email: "",
    number: "",
    product: "A",
  });
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  const handleLeadChange = (e) => {
    setLeadDetails({ ...leadDetails, [e.target.name]: e.target.value });
  };

  const handleLeadSubmit = async (e) => {
    console.log("working");
    console.log(leadDetails);
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "https://etlhive-project-backend.onrender.com/api/auth/leads",
        leadDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Lead created successfully.");
      setLeadDetails({ name: "", email: "", number: "", product: "A" });
      fetchLeads();
    } catch (error) {
      toast.error("Lead creation failed.");
    }
  };

  const fetchLeads = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://etlhive-project-backend.onrender.com/api/auth/leads",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            search,
            sort,
          },
        }
      );
      setLeads(response.data);
    } catch (error) {
      toast.error("Failed to fetch leads.");
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [search, sort]);

  return (
    <div>
      <h2 className="text-white text-4xl font-extrabold mx-auto text-center">
        Welcome to the Lead App!
      </h2>
      <div className="">
        <form onSubmit={handleLeadSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              className="h-[2rem]"
              value={leadDetails.name}
              onChange={handleLeadChange}
              required
            />
          </label>
          <label className="-mt-12">
            Email:
            <input
              type="email"
              name="email"
              className="h-[2rem]"
              value={leadDetails.email}
              onChange={handleLeadChange}
              required
            />
          </label>
          <label className="-mt-12">
            Number:
            <input
              type="text"
              name="number"
              className="h-[2rem]"
              value={leadDetails.number}
              onChange={handleLeadChange}
              required
            />
          </label>
          <label className="-mt-12">
            Product:
            <select
              className="text-black"
              name="product"
              value={leadDetails.product}
              onChange={handleLeadChange}
              required
            >
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </label>
          <button type="submit" className="-mt-8">
            Create Lead
          </button>
        </form>
      </div>

      <div className="leads-list">
        <input
          type="text"
          className="h-[2rem]"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Sort By</option>
          <option value="name">Name</option>
          <option value="email">Email</option>
          <option value="number">Number</option>
          <option value="product">Product</option>
        </select>
        {leads.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Number</th>
                <th>Product</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead._id}>
                  <td>{lead.name}</td>
                  <td>{lead.email}</td>
                  <td>{lead.number}</td>
                  <td>{lead.product}</td>
                  <td>Edit</td>
                  <td>Delete</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No leads for now</p>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default Welcome;
