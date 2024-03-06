import * as Yup from "yup";

export const employeeSchema = Yup.object({
  name: Yup.string().min(3).max(20).required("Please enter the name"),
  position: Yup.string().min(3).max(20).required("Please enter the Position"),
  department: Yup.string()
    .min(3)
    .max(20)
    .required("Please enter the department"),
  salary: Yup.number()
    .required("Required")
    .max(100000000, "To big")
    .min(0, "Not negative number"),
});
