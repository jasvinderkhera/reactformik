import React from 'react'
import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { employeeSchema } from '../schemas';

const initialValues = {
  name: "",
  position: "",
  department: "",
  salary: "",
  hiredate: "",
};

function FormValidation() {
    // const [form_data,setForm_data] = useState(initialState());
    const [table_data,setTable_data] = useState([]);

    useEffect( function (){
        getData();
    },[]);


    // Get Data from API---------------------------------------------------------------

    async function getData(){
        try{
            const response = await axios.get("http://localhost:4001/form_data");
            console.log(response, "response")
            setTable_data(response.data)
        }
        catch (error){
            console.log("error ", error.message)
        }
    }


    // Create Entry---------------------------------------------------------------------

    async function createEntry(values){
        try{
            await axios.post("http://localhost:4001/form_data", values);
            getData()
        }
        catch(error){
            console.log("error ", error.message)
        }
    }

    // Delete Entry------------------------------------------------------------------------------------

    async function deleteData(row_id){
        try{
            await axios.delete(`http://localhost:4001/form_data/${row_id}`);
            getData()
            alert("Data Deleted Successfully")
        }
        catch (error){
            console.log("error ", error.message)
        }
    }

    // Update Data----------------------------------------------------------------------------------------

    async function updateData(row_id){
        try{
            await axios.put(`http://localhost:4001/form_data/${row_id}`, values);
            alert("Data Updated successfully")
            getData()
        }
        catch (error){
            console.log("error ", error.message)
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

     
        const {values,errors,touched,handleBlur,handleSubmit,handleChange} = useFormik({
            initialValues : initialValues,
            validationSchema: employeeSchema,
        
            onSubmit : function (values,action) {
              debugger
                console.log("Values: ", values)
                createEntry(values)
                action.resetForm()
            }
            
        })
        console.log("hello")

      return (
        <section>
          <div className="form">
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
                  <td>{errors.name && touched.name ? (<p>{errors.name}</p>): null}</td>
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
                   <td>{errors.position && touched.position ? (<p>{errors.position}</p>): null}</td>
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
                   <td>{errors.department && touched.department ? (<p>{errors.department}</p>): null}</td>
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
                   <td>{errors.salary && touched.salary ? (<p>{errors.salary}</p>): null}</td>
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
                   <td>{errors.hiredate && touched.hiredate ? (<p>{errors.hiredate}</p>): null}</td>
                 </tr>
                
                <tr>
                  <td colSpan="2">
                    <button type="button" onClick={handleSubmit}>Submit</button>
                  </td>
                </tr>
              </tbody>
            </table>
            </form>
          </div>
    
          <div>
            <table className="table">
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
                      <button className="btn btn-danger" onClick={() => deleteData(item.id)}>Delete</button>
                      {/* <button className="btn btn-secondary" onClick={() => setForm_data(item)}>Edit</button> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      );
}

export default FormValidation