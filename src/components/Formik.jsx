import React from "react";
import { useState, useEffect } from "react";
import { getEmployeeData, DeleteData, UpdateData, createData } from "./API/Allcomponents";
import { useFormik } from "formik";
import {Schemas} from './schemas/Schemas'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Formik() {
  const [form_data, setForm_data] = useState(initialState());
  const [table_data, setTable_data] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  function initialState() {
    return {
      name: "",
      position: "",
      department: "",
      salary: "",
      hiredate: "",
    };
  }

  const getData = async () => {
    const res = await getEmployeeData();
    if (res === undefined) {
      toast.error(res.message);
    } else if (res.status === 200) {
      setTable_data(res.data);
    }
  };

  const CreateEntry = async (form_data) => {
    const res = await createData(form_data);
    if (res.status === 200) {
      toast.success("User created successfully");
    }
    return res;
  };

  const DeleteEntry = async (user_id) => {
    const res = await DeleteData(user_id);
    if (res.status === 200) {
      toast.success("User deleted successfully");
    }
    getData();
  };

  const UpdateEntry = async (form_data) => {
    const res = await UpdateData(form_data);
    if (res.status === 200) {
      toast.success("User updated successfully");
    }
    return res;
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: form_data,
      validationSchema: Schemas,
      onSubmit: async (values, action) => {
        console.log("values: ", values);
        if (form_data.id) {
          const res = await UpdateEntry(values);
          console.log("res", res);
        } else {
          const res = await CreateEntry(values);
          console.log("res", res);
        }
        setForm_data(initialState);
        await getData();
        action.resetForm();
      },
      enableReinitialize: true,
    });

  return (
    <div>
      <form class="mx-auto" style={{width:"300px"}}>
        <div class="form-group pb-2">
          <label>
            Name
            <input
            class="form-control"
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter Name"
            />
          </label>
          {errors.name && touched.name ? <p>{errors.name}</p> : null}
        </div>
        <div class='pb-2'>
          <label>
            Position
            <input
            class="form-control"
              type="text"
              id="position"
              name="position"
              value={values.position}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter position"
            />
          </label>
          {errors.position && touched.position ? (
            <p>{errors.position}</p>
          ) : null}
        </div>
        <div class='pb-2'>
          <label>
            Department
            <input
            class="form-control"
              type="text"
              id="department"
              name="department"
              value={values.department}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter department"
            />
          </label>
          {errors.department && touched.department ? (
            <p>{errors.department}</p>
          ) : null}
        </div>
        <div class='pb-2'>
          <label>
            Salary
            <input
            class="form-control"
              type="number"
              id="salary"
              name="salary"
              value={values.salary}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter salary"
            />
          </label>
          {errors.salary && touched.salary ? <p>{errors.salary}</p> : null}
        </div>
        <div class='pb-2'>
          <label>
            Hiredate
            <input
             class="form-control"
              type="date"
              id="hiredate"
              name="hiredate"
              value={values.hiredate}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter hiredate"
            />
          </label>
          {errors.hiredate && touched.hiredate ? (
            <p>{errors.hiredate}</p>
          ) : null}
        </div>
        <div class='pb-4'>
          <button className="btn btn-primary" type="button" onClick={handleSubmit}>
            Submit Data
          </button>
        </div>
      </form>
      <div>
        <table className="table table-hover">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Position</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Hiredate</th>
            <th>Actions</th>
          </tr>

          {table_data.map((item) => {
            return (
              <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.position}</td>
                <td>{item.department}</td>
                <td>{item.salary}</td>
                <td>{item.hiredate}</td>
                <td>
                  <button className="btn btn-danger"
                    onClick={() => {
                      DeleteEntry(item.id);
                    }}
                  >
                    Delete
                  </button>
                  &nbsp;
                  <button className="btn btn-info"
                    onClick={() => {
                      setForm_data(item);
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
    </div>
  );
}

export default Formik;
