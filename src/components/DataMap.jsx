import { useEffect } from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useFormik } from "formik";

function DataMap() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    id: "",
    name: "",
    position: "",
    department: "",
    salary: "",
    hiredate: "",
  });

  useEffect(() => {
    getEmployeeData();
  }, []);

  //---------------- Get Data-----------------------------------------

  const getEmployeeData = async () => {
    try {
      const response = await axios.get("http://localhost:4001/form_data");
      console.log("data", response.data);
      setData(response.data);
    } catch (error) {
      console.log("error : ", error);
      alert(error.message);
    }
  };

  //---------------- Delete Data-----------------------------------------

  const DeleteData = async (row_id) => {
    try {
      const restData = await axios.delete(
        `http://localhost:4001/form_data/${row_id}`
      );
      getEmployeeData();
      alert("Record deleted successfully!");
    } catch (error) {
      console.log("error : ", error);
      alert(error.message);
    }
  };

  //---------------- Update Data-----------------------------------------

  const UpdateData = async () => {
    try {
      const updatedData = await axios.put(
        `http://localhost:4001/form_data/${form.id}`,
        {
          name: form.name,
          position: form.position,
          department: form.department,
          salary: form.salary,
          hiredate: form.hiredate,
        }
      );
      getEmployeeData();
    } catch (error) {
      console.log("error : ", error);
      alert(error.message);
    }
  };

  // -------------------onChangehandler----------------------------------

  function onChangeHandler(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  // -----------------------------submit Data----------------------------------

  async function submitData() {
    if (form.id) {
      await UpdateData();
    } else {
      try {
        const createData = await axios.post("http://localhost:4001/form_data", {
          name: form.name,
          position: form.position,
          department: form.department,
          salary: form.salary,
          hiredate: form.hiredate,
        });
        getEmployeeData();
      } catch (error) {
        console.log("error:", error);
      }
    }
  }

  //---------------------Formik----------------------------------------
  

  return (
    <div>
      <div>
        <div>
          <div>
            <label>
              Name:
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter name"
                value={form.name}
                onChange={onChangeHandler}
              />
            </label>
          </div>
          <div>
            <label>
              Position:
              <input
                type="text"
                name="position"
                id="position"
                placeholder="Enter position"
                value={form.position}
                onChange={onChangeHandler}
              />
            </label>
          </div>
          <div>
            <label>
              department:
              <input
                type="text"
                name="department"
                id="department"
                placeholder="Enter department"
                value={form.department}
                onChange={onChangeHandler}
              />
            </label>
          </div>
          <div>
            <label>
              Salary:
              <input
                type="number"
                name="salary"
                id="salary"
                placeholder="Enter salary"
                value={form.salary}
                onChange={onChangeHandler}
              />
            </label>
          </div>
          <div>
            <label>
              Hire Date:
              <input
                type="date"
                name="hiredate"
                id="hiredate"
                placeholder="Enter hiredate"
                value={form.hiredate}
                onChange={onChangeHandler}
              />
            </label>
          </div>
          <div>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={submitData}
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      <table className="table table-hover">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Position</th>
          <th>Designation</th>
          <th>Salary</th>
          <th>Hire Date</th>
          <th>Actions</th>
        </tr>
        {data.map((item) => {
          return (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.position}</td>
              <td>{item.department}</td>
              <td>{item.salary}</td>
              <td>{item.hiredate}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    DeleteData(item.id);
                  }}
                >
                  Delete
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setForm(item);
                  }}
                >
                  Edit
                </button>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default DataMap;
// (item,index)=>{

// }
// (item,index)=>(

// )
