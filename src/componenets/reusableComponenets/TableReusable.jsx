import { useMemo, useState, useEffect } from "react";
import MaterialReactTable from "material-react-table";
import { doc, collection, deleteDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import { db } from "../config/firebase";
import { getList } from "../helperFunctions/functions";

function Table({ type }) {
  //navigate
  const navigate = useNavigate();

  //List of emloyees / tasks fetched from Firebase
  const [typeList, setTypeList] = useState([]);

  //Collection of the emloyees / tasks from the firebase
  const typeColectionRef = collection(db, type);

  //Function for deleting emloyees / tasks
  const deletTypeHandler = async (e) => {
    const rowElement = e.target.closest("tr");
    const typeId =
      rowElement.children[rowElement.children.length - 1].textContent;

    //Warning message before deleteing data
    const response = confirm(
      `Warning! You are about to delete {type === 'tasks'? 'task' : 'employee'} permanently. Pressing OK will delete the selected data without the possibility of recovery. Are you sure you want to proceed?`
    );

    if (!response) return;

    const typeDoc = doc(db, type, typeId);
    await deleteDoc(typeDoc);
    getList(typeColectionRef, typeEditHandler, deletTypeHandler, setTypeList);
  };

  //Function for editing emloyees / tasks
  const typeEditHandler = (e) => {
    //Getting row
    const rowElement = e.target.closest("tr");
    //Getting it's children
    const rowChildren = rowElement.children;

    //Array of properties for the object
    const objProp =
      type === "tasks"
        ? [
            "EditDelete",
            "taskName",
            "startDate",
            "dueDate",
            "taskDescription",
            "userAssigned",
            "id",
          ]
        : [
            "EditDelete",
            "fullName",
            "jobTitle",
            "currentTask",
            "email",
            "password",
            "phoneNumber",
            "birthday",
            "monthlySalaray",
            "completedTasks",
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

    const path = type === "tasks" ? "/update-task" : "/update-user";
    //Navigatin to the update user page
    navigate(path, { state: updateObj });
  };

  //Table columns data based on type of the table
  const columnsData =
    type === "tasks"
      ? [
          {
            accessorKey: "actionButton",
            header: "Action button",
          },
          {
            accessorKey: "taskName",
            header: "Task name",
          },
          {
            accessorKey: "startDate",
            header: "Start date",
          },
          {
            accessorKey: "dueDate",
            header: "Due date",
          },
          {
            accessorKey: "taskDescription",
            header: "Description",
          },
          {
            accessorKey: "userAssigned",
            header: "User assigned",
          },

          {
            accessorKey: "id",
            header: "Task ID",
          },
        ]
      : [
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
            accessorKey: "completedTasks",
            header: "Completed Tasks",
          },
          {
            accessorKey: "id",
            header: "User ID",
          },
        ];

  //Creating columns for a table
  const columns = useMemo(() => columnsData, []);

  useEffect(() => {
    getList(typeColectionRef, typeEditHandler, deletTypeHandler, setTypeList);
  }, []);

  return (
    <>
      <div className="h-[550px] overflow-auto scrollbar-hide rounded-lg w-[240px] sm:w-[500px] md:w-full">
        <MaterialReactTable columns={columns} data={typeList} />
      </div>
    </>
  );
}

export default Table;
