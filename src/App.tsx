import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import styles from "./App.module.scss";
import { useEffect, useState } from "react";
import face from "./assets/face.png";
import AddTask from "./components/Modal/AddTask";
import { Task } from "./components/Task";
import TaskItem from "./components/TaskItem/TaskItem";
// console.log(styles);
function Home() {
  const [open, setOpen] = useState<boolean>(false);
  const [task, setTask] = useState<string>("");
  const [taskList, setTaskList] = useState<Task[]>(() => {
    const storageTaskList = localStorage.getItem("list");
    return storageTaskList ? JSON.parse(storageTaskList) : [];
  });
  const [show, setShow] = useState<boolean>(true);
  const handleAddTask = () => {
    setOpen(true);
  };

  useEffect(() => {
    const storedTaskList = JSON.stringify(taskList);
    localStorage?.setItem("list", storedTaskList);
  }, [taskList]);

  useEffect(() => {
    if (taskList.length > 0) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [taskList]);

  return (
    <>
      <div className={styles.todoApp}>
        <div className={styles.container}>
          {" "}
          <div className={styles.header}>
            <h2 className={styles.header__title}>Task List </h2>
            <button className={styles.AddTaskBtn} onClick={handleAddTask}>
              <FontAwesomeIcon
                icon={faPlus}
                style={{ color: "#ffffff" }}
                className={styles.AddIcon}
              />
              <div className={styles.contentBtn}>Add Task</div>
            </button>
          </div>
          {open ? (
            <div className={styles.modal__overlay}>
              <AddTask
                setOpen={setOpen}
                task={task}
                setTask={setTask}
                taskList={taskList}
                setTaskList={setTaskList}
              />
            </div>
          ) : show ? (
            <div className={styles.primarilyPage}>
              <p className={styles.NoTask}>You have 0 task today </p>
              <img src={face} alt="" className={styles.faceIcon} />
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
