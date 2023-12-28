import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./App.scss";
import { useEffect, useState } from "react";
import face from "./assets/face.png";
import AddTask from "./components/Modal/AddTask";
import { Task } from "./components/Task";
import TaskItem from "./components/TaskItem/TaskItem";

function Home() {
  const [open, setOpen] = useState<boolean>(false);
  const [task, setTask] = useState<string>("");
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [show, setShow] = useState<boolean>(true);
  const handleAddTask = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (taskList.length > 0) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [taskList]);

  return (
    <>
      <div className="todoApp">
        <div className=" container">
          {" "}
          <div className="header">
            <h2 className="header__Title">Task List </h2>
            <button className="AddTaskBtn" onClick={handleAddTask}>
              <FontAwesomeIcon
                icon={faPlus}
                style={{ color: "#ffffff" }}
                className="AddIcon"
              />
              <div className="contentBtn">Add Task</div>
            </button>
          </div>
          {open ? (
            <div className="modal__overlay">
              <AddTask
                setOpen={setOpen}
                task={task}
                setTask={setTask}
                taskList={taskList}
                setTaskList={setTaskList}
              />
            </div>
          ) : show ? (
            <div className="primarilyPage">
              <p className="NoTask">You have 0 task today </p>
              <img src={face} alt="" className="faceIcon" />
            </div>
          ) : (
            taskList.map((task, index) => (
              <TaskItem
                key={index}
                task={task}
                taskList={taskList}
                setTaskList={setTaskList}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
