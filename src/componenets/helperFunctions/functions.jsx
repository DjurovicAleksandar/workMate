import { getDocs } from "firebase/firestore";

export const getList = async (
  collection,
  editHandler,
  deleteHandler,
  setList
) => {
  try {
    const data = await getDocs(collection);

    const taskData = data.docs
      .map((doc) => ({ ...doc.data(), id: doc.id }))
      .map((obj) => ({
        //Adding buttons insde each row
        ...obj,
        actionButton: (
          <div className="flex flex-col items-start gap-2">
            <button onClick={editHandler}>Edit</button>
            <button onClick={deleteHandler}>Delete</button>
          </div>
        ),
      }));
    //Setting employee list
    setList(taskData);
  } catch (err) {
    console.error(err);
  }
};
