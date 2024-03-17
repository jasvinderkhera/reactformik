import React from "react";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import axios from "axios";
import { employeeSchema } from "../schemas";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const initialValues = {
//   name: "",
//   position: "",
//   department: "",
//   salary: "",
//   hiredate: "",
// };

function FormValidation() {
  const [form_data, setForm_data] = useState(initialState());
  const [table_data, setTable_data] = useState([]);

  useEffect(function () {
    getData();
  }, []);

  // Get Data from API---------------------------------------------------------------

  async function getData() {
    try {
      const response = await axios.get("http://localhost:4001/form_data");
      console.log(response, "response");
      setTable_data(response.data);
    } catch (error) {
      console.log("error ", error.message);
    }
  }

  // Create Entry---------------------------------------------------------------------

  async function createEntry(values) {
    try {
      await axios.post("http://localhost:4001/form_data", values);
      getData();
    } catch (error) {
      console.log("error ", error.message);
    }
  }

  // Delete Entry------------------------------------------------------------------------------------

  async function deleteData(row_id) {
    try {
      await axios.delete(`http://localhost:4001/form_data/${row_id}`);
      getData();
      alert("Data Deleted Successfully");
    } catch (error) {
      console.log("error ", error.message);
    }
  }

  // Update Data----------------------------------------------------------------------------------------

  async function updateData() {
    try {
      await axios.put(`http://localhost:4001/form_data/${table_data.id}`, {
        name: values.name,
        position: values.position,
        salary: values.salary,
        department: values.department,
        hiredate: values.hiredate,
      });
      alert("Data Updated successfully");
      getData();
    } catch (error) {
      console.log("error ", error.message);
    }
  }

  // Reset Form Data----------------------------------------------------------------------

  // function onChangeHandler(event) {
  //   const { name, value } = event.target;
  //   setForm_data({ ...form_data, [name]: value });
  // }

  function initialState() {
    return {
      name: "",
      position: "",
      department: "",
      salary: "",
      hiredate: "",
    };
  }

  // const {values,errors,touched,handleBlur,handleSubmit,handleChange} = useFormik({
  //     initialValues : form_data,
  //     validationSchema: employeeSchema,

  //     onSubmit : function (values,action) {
  //       debugger
  //         console.log("Values: ", values)
  //         createEntry(values)
  //         action.resetForm()
  //     }

  // })
  // console.log("hello")

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: form_data,
      //   validationSchema: signUpSchema,
      onSubmit: async (values, action) => {
        if (form_data.id) {
          await updateData(values);
        } else {
          await createEntry(values);
        }
        await getData();
        action.resetForm();
        setForm_data(initialState());
      },
      enableReinitialize: true,
    });
  console.log(errors);

  // async function getData() {
  //   const res = await getData();
  //   console.log("res", res);
  //   if (res === undefined) {
  //     alert(res.AxiosError.message);
  //   } else if (res.status === 200) {
  //     setTable_data(res.data);
  //   }
  // else{
  // if(res.status!=200){
  // alert(res.message)
  // }
  // }

  // async function createEntry(form_data) {
  //   try {
  //     const res = await createEntry(form_data);
  //     console.log("res", res);
  //     console.log("data", res.data);
  //     if (res.status === 201) {
  //       toast.success("User created successfully");
  //     } else {
  //       throw new Error(res.message);
  //     }
  //     return res;
  //   } catch (error) {
  //     toast.error(error.message);
  //   }
  // }

  // async function deleteEntry(user_id) {
  //   const res = await deleteData(user_id);
  //   console.log("res", res);
  //   if (res.status === 200) {
  //     toast.success("user deleted successfully");
  //   }
  //   getData();
  // }

  // async function updateEntry(form_data) {
  //   const res = await updateData(form_data);
  //   console.log("res", res);
  //   if (res.status === 200) {
  //     alert("User updated successfully");
  //   }
  //   return res;
  // }

  return (
    <section>
      <div >
        <form>
          <table>
            <tbody>
              <tr>
                <td>
                  <label htmlFor="name">Name</label>
                </td>
                <td>
                  <input
                    type="text"
                    value={values.name}
                    id="name"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  ></input>
                </td>
                <td>
                  {errors.name && touched.name ? <p>{errors.name}</p> : null}
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="position">Position</label>
                </td>
                <td>
                  <input
                    type="text"
                    value={values.position}
                    id="position"
                    name="position"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  ></input>
                </td>
                <td>
                  {errors.position && touched.position ? (
                    <p>{errors.position}</p>
                  ) : null}
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="department">Department</label>
                </td>
                <td>
                  <input
                    type="text"
                    value={values.department}
                    id="department"
                    name="department"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  ></input>
                </td>
                <td>
                  {errors.department && touched.department ? (
                    <p>{errors.department}</p>
                  ) : null}
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="salary">Salary</label>
                </td>
                <td>
                  <input
                    type="number"
                    value={values.salary}
                    id="salary"
                    name="salary"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  ></input>
                </td>
                <td>
                  {errors.salary && touched.salary ? (
                    <p>{errors.salary}</p>
                  ) : null}
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="hiredate">HireDate</label>
                </td>
                <td>
                  <input
                    type="date"
                    value={values.hiredate}
                    id="hiredate"
                    name="hiredate"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  ></input>
                </td>
                <td>
                  {errors.hiredate && touched.hiredate ? (
                    <p>{errors.hiredate}</p>
                  ) : null}
                </td>
              </tr>

              <tr>
                <td colSpan="2">
                  <button type="button" onClick={handleSubmit}>
                    Submit
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>

      <div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Position</th>
              <th scope="col">Department</th>
              <th scope="col">Salary</th>
              <th scope="col">Hire Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {table_data.map((item) => (
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
                    onClick={() => deleteData(item.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => setForm_data(item)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default FormValidation;
