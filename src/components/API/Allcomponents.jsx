import axios from "axios";

export const getEmployeeData = async () => {
  try {
    const response = await axios.get("http://localhost:4001/form_data");
    console.log("data", response.data);
    return { isSuccess: true, data: response.data, errMsg: "" };
  } catch (error) {
    console.log("error : ", error);
    return {
      isSuccess: false,
      data: null,
      errMsg: error.message ?? "something went wrong",
    };
  }
};

export const DeleteData = async (row_id) => {
  try {
    const response = await axios.delete(
      `http://localhost:4001/form_data/${row_id}`
    );
    return response;
  } catch (error) {
    console.log("error : ", error);
    alert(error.message);
  }
};

export const UpdateData = async (form_data) => {
  try {
    const response = await axios.put(
      `http://localhost:4001/form_data/${form_data.id}`,
      {
        name: form_data.name,
        position: form_data.position,
        salary: form_data.salary,
        department: form_data.department,
        hiredate: form_data.hiredate,
      }
    );
    return response;
  } catch (error) {
    console.log("error : ", error);
    alert(error.message);
  }
};

//-----------------------createData-------------------------------

export const createData = async (form_data) => {
  try {
    const response = await axios.post("http://localhost:4001/form_data", {
      name: form_data.name,
      position: form_data.position,
      salary: form_data.salary,
      department: form_data.department,
      hiredate: form_data.hiredate,
    });
    return response;
  } catch (error) {
    console.log("error:", error);
  }
};
