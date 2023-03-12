import { useMemo, useState, useEffect } from "react";
import MaterialReactTable from "material-react-table";
import { getDocs, doc, collection, deleteDoc } from "firebase/firestore";
import { db } from "../componenets/config/firebase";
import { useNavigate } from "react-router-dom";
import { getList } from "./helperFunctions/functions";

function Table() {
  //navigate
  const navigate = useNavigate();

  //List of employees fetched from Firebase
  const [employeeList, setEmployeeList] = useState([]);

  //Collection of the employees from the firebase
  const employeesColectionRef = collection(db, "employees");

  //Data snapshot - Get list of employees

  //Function for deleting employees
  const deleteEmployeeHandler = async (e) => {
    const rowElement = e.target.closest("tr");
    const employeeId =
      rowElement.children[rowElement.children.length - 1].textContent;

    const employeeDoc = doc(db, "employees", employeeId);
    await deleteDoc(employeeDoc);
    getList(
      employeesColectionRef,
      employeeEditHandler,
      deleteEmployeeHandler,
      setEmployeeList
    );
  };

  //Function for editing employees
  const employeeEditHandler = (e) => {
    //Getting row
    const rowElement = e.target.closest("tr");
    //Getting it's children
    const rowChildren = rowElement.children;

    //Array of properties for the object
    const objProp = [
      "EditDelete",
      "fullName",
      "jobTitle",
      "currentTask",
      "email",
      "password",
      "phoneNumber",
      "birthday",
      "monthlySalaray",
      "id",
    ];

    //Creating object for an update page
    const updateObj = {};

    //Looping over rowChildren to get valutes for the object
    Array.from(rowChildren).forEach((child, i) => {
      const property = child.textContent;

      //Guard clause, because first element is from the button 'EditDelete'
      if (i === 0) return;
      else {
        //Updating object
        updateObj[objProp[i]] = property;
      }
    });

    //Navigatin to the update user page
    navigate("/update-user", { state: updateObj });
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "actionButton",
        header: "Action button",
      },
      {
        accessorKey: "fullName",
        header: "Full name",
      },
      {
        accessorKey: "jobTitle",
        header: "Job title",
      },
      {
        accessorKey: "currentTask",
        header: "Current Task",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "password",
        header: "Security code",
      },
      {
        accessorKey: "phoneNumber",
        header: "Phone number",
      },
      {
        accessorKey: "birthday",
        header: "Day of birth",
      },
      {
        accessorKey: "monthlySalaray",
        header: "Monthly Salary",
      },
      {
        accessorKey: "id",
        header: "User ID",
      },
    ],
    []
  );

  useEffect(() => {
    getList(
      employeesColectionRef,
      employeeEditHandler,
      deleteEmployeeHandler,
      setEmployeeList
    );
  }, []);

  return (
    <>
      <MaterialReactTable columns={columns} data={employeeList} />
    </>
  );
}

export default Table;
