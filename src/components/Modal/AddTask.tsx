import "./AddTask.scss";
import Cancel from "../image/Cancel.svg";
import { useState } from "react";
import { Task } from "../Task";

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  task: string;
  setTask: React.Dispatch<React.SetStateAction<string>>;
  taskList: Task[];
  setTaskList: React.Dispatch<React.SetStateAction<Task[]>>;
}
const AddTask: React.FC<Props> = ({
  setOpen,
  task,
  setTask,
  taskList,
  setTaskList,
}) => {
  const [priority, setPriority] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (task.trim() !== "" && priority.trim() !== "") {
      setTaskList([
        ...taskList,
        {
          id: crypto.randomUUID(), //stackOverFlow
          title: task,
          priority: priority,
          isDone: "",
        },
      ]);
      setTask("");
    }
    setTimeout(handleClose, 200);
  };
  console.log(taskList);
  const getPriority = (select: string) => {
    setPriority(select);
  };
  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <>
      <div className="modal">
        <div className="modal__modal">
          <div className="modal__header">
            <div className="modal__header--addTask">Add Task</div>
            <img
              className="modal__header--closeIcon"
              src={Cancel}
              onClick={handleClose}
            ></img>
          </div>
          <div className="modal__taskTitle">
            <div className="modal__taskTitle--name default">Task</div>
            <input
              className="modal__taskTitle--textArea "
              placeholder="Task name"
              onChange={(e) => setTask(e.target.value)}
            ></input>
          </div>
          <div className="modal__taskPriority">
            <div className="modal__taskPriority--name default">Priority</div>
            <div className="modal__groupBtn">
              <button
                className="modal__Btn high"
                onClick={() => getPriority("high")}
              >
                High
              </button>
              <button
                className="modal__Btn medium"
                onClick={() => getPriority("medium")}
              >
                Medium
              </button>
              <button
                className="modal__Btn low"
                onClick={() => getPriority("low")}
              >
                Low
              </button>
            </div>
          </div>
          <div className="modal__handleTaskBtn">
            <div
              className="modal__handleTaskBtn--add"
              onClick={(e) => handleSubmit(e)}
            >
              Add
            </div>

            <div className="modal__handleTaskBtn--cancel" onClick={handleClose}>
              Cancel
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddTask;
