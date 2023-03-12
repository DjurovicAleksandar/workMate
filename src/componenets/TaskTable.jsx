import { useMemo, useState, useEffect } from "react";
import MaterialReactTable from "material-react-table";
import { getDocs, doc, collection, deleteDoc } from "firebase/firestore";
import { db } from "../componenets/config/firebase";
import { useNavigate } from "react-router-dom";

import { getList } from "./helperFunctions/functions";

function TaskTable() {
  //navigate
  const navigate = useNavigate();

  //List of tasks fetched from Firebase
  const [taskList, setTaskList] = useState([]);

  //Collection of the tasks from the firebase
  const taskCollectionRef = collection(db, "tasks");

  //Function for deleting tasks
  const deleteTaskHandler = async (e) => {
    const rowElement = e.target.closest("tr");
    const taskName =
      rowElement.children[rowElement.children.length - 1].textContent;

    //Warning message before deleteing data
    const response = confirm(
      `Warning! You are about to delete [${taskName}] permanently. Pressing OK will delete the selected data without the possibility of recovery. Are you sure you want to proceed?`
    );

    if (!response) return;

    const taskDoc = doc(db, "tasks", taskName);
    await deleteDoc(taskDoc);
    getList(taskCollectionRef, taskEditHandler, deleteTaskHandler, setTaskList);
  };

  //Function for editing tasks
  const taskEditHandler = (e) => {
    //Getting row
    const rowElement = e.target.closest("tr");
    //Getting it's children
    const rowChildren = rowElement.children;

    //Array of properties for the object
    const objProp = [
      "EditDelete",
      "taskName",
      "startDate",
      "dueDate",
      "taskDescription",
      "userAssigned",
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

    //Navigatin to the update task page and state object transfer
    navigate("/update-task", { state: updateObj });
  };

  const columns = useMemo(
    () => [
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
    ],
    []
  );

  useEffect(() => {
    getList(taskCollectionRef, taskEditHandler, deleteTaskHandler, setTaskList);
  }, []);

  return (
    <>
      <MaterialReactTable columns={columns} data={taskList} />
    </>
  );
}

export default TaskTable;
