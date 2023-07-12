import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Select from "react-select";
import FadeLoader from "react-spinners/FadeLoader";

function Table() {
  // state for data
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // state for filter
  const [selectedFilters, setSelectedFilters] = useState({
    name: "",
    status: "",
  });

  // state for asc order sort
  const [sortOrder, setSortOrder] = useState("asc");

  // state for loader
  const [loading, setLoading] = useState(true);

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Address",
      selector: (row) => row.address,
      sortable: true,
    },
    {
      name: "Phone Number",
      selector: (row) => row.phone_no,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => (
        <div
          className={`${
            row.status === "active" ? "bg-green-500" : "bg-red-500"
          } text-white px-4 py-2 rounded`}
        >
          {row.status}
        </div>
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <button
          onClick={() => handleDelete(row)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  // api
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      if (response.status == 200) {
        setData(response.data);
        setFilteredData(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // call api ftn after 3sec delay
  useEffect(() => {
    const delay = 3000; // 3 seconds

    const timer = setTimeout(() => {
      fetchData();
    }, delay);

    return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
  }, []);

  const handleDelete = (row) => {
    const updatedData = data.filter((item) => item.id !== row.id);
    setData(updatedData);
    setFilteredData(updatedData);
  };

  const handleFilterChange = (fieldName, selectedOptions) => {
    setSelectedFilters((prevSelectedFilters) => ({
      ...prevSelectedFilters,
      [fieldName]: selectedOptions,
    }));

    if (selectedOptions.length === 0) {
      setFilteredData(data);
    }
  };

  const handleFilter = () => {
    let filteredResults = data;

    if (selectedFilters.name) {
      filteredResults = filteredResults.filter((row) =>
        selectedFilters.name.some((name) => name.value === row.name)
      );
    }

    if (selectedFilters.status) {
      filteredResults = filteredResults.filter((row) =>
        selectedFilters.status.some((status) => status.value === row.status)
      );
    }

    setFilteredData(filteredResults);
  };

  const handleClearFilters = () => {
    setSelectedFilters({
      name: "",
      status: "",
    });
    setFilteredData(data);
  };

  const handleFilterActive = () => {
    const filteredResults = data.filter((row) => row.status === "active");
    setFilteredData(filteredResults);
  };

  const handleFilterUnactive = () => {
    const filteredResults = data.filter((row) => row.status === "unactive");
    setFilteredData(filteredResults);
  };

  const handleSortAsc = () => {
    const sortedResults = [...filteredData].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setSortOrder("asc");
    setFilteredData(sortedResults);
  };

  const handleSortDesc = () => {
    const sortedResults = [...filteredData].sort((a, b) =>
      b.name.localeCompare(a.name)
    );
    setSortOrder("desc");
    setFilteredData(sortedResults);
  };

  const nameOptions = data.map((row) => ({
    value: row.name,
    label: row.name,
  }));

  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "unactive", label: "Unactive" },
  ];

  return (
    <div>
      <h2 className="mb-4 font-bold text-3xl">Table</h2>

      <div className="bg-white rounded-lg shadow-md rounded-tr-lg rounded-tl-lg mt-4">
        <div className="flex mb-8">
          <div className="flex-1  rounded-lg bg-purple-500 px-2 pb-8 pt-4">
            <h2 className="font-semibold text-lg pl-6">Search:</h2>
            <div className="flex flex-wrap flex-col items-center px-6  gap-4 mt-2">
              <div className="flex w-full items-center gap-4 px-6 ">
                <div className="flex-1">
                  <Select
                    isMulti
                    options={nameOptions}
                    value={selectedFilters.name}
                    onChange={(selectedOptions) =>
                      handleFilterChange("name", selectedOptions)
                    }
                    placeholder="Search name"
                  />
                </div>
                <div className="flex-1">
                  <Select
                    isMulti
                    options={statusOptions}
                    value={selectedFilters.status}
                    onChange={(selectedOptions) =>
                      handleFilterChange("status", selectedOptions)
                    }
                    placeholder="Search status"
                  />
                </div>
                <div>
                  <button
                    onClick={handleFilter}
                    className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded shadow-lg"
                  >
                    Apply Search
                  </button>
                </div>
                <div>
                  <button
                    onClick={handleClearFilters}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded shadow-lg"
                  >
                    Clear{" "}
                  </button>
                </div>
              </div>
              <div className="w-[700px] border-[1px] rounded-full bg-gray-400 mt-2"></div>
              <div className="flex w-full justify-between">
                <div>
                  <h3 className="font-semibold text-lg ">Filter By:</h3>

                  <div className="flex items-center gap-8 py-2 px-6">
                    <div>
                      <button
                        onClick={handleFilterActive}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow-lg"
                      >
                        Active Users
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={handleFilterUnactive}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow-lg"
                      >
                        Unactive Users
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg ">Sort By:</h3>
                  <div className="flex items-center gap-8 py-2 px-6">
                    <div>
                      <button
                        onClick={handleSortAsc}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow-lg"
                      >
                        Ascending
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={handleSortDesc}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow-lg"
                      >
                        Descending
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* check for loader and table */}
        {loading ? (
          <div className="flex justify-center items-center h-40">
            {/* fade loader if loading true */}
            <FadeLoader color="#a940f5" loading={loading} size={50} />
          </div>
        ) : (
          // if loading state false table
          <DataTable
            className="w-full"
            columns={columns}
            data={filteredData}
            keyField="id"
            responsive
            striped
            highlightOnHover
            noHeader
            customStyles={{
              headRow: {
                style: {
                  backgroundColor: "#4E73DF",
                  color: "#FFFFFF",
                  fontWeight: "bold",
                },
                className: "text-center",
              },
            }}
            pagination
            paginationPerPage={20}
            paginationDefaultPage={1}
            paginationRowsPerPageOptions={[20, 30, 40]}
          />
        )}
      </div>
    </div>
  );
}

export default Table;
