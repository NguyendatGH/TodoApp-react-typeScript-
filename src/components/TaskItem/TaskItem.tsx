import styles from "./TaskItem.module.scss";
import Edit from "./image/Edit.svg";
import Delete from "./image/Delete.svg";
import Done from "./image/Done.svg";
import Half from "./image/Half.svg";
import Non from "./image/Non.svg";
import React, { useEffect, useState } from "react";
import { Task } from "../Task";
import { DeleteTask } from "./DeleteTask/DeleteTask";
import { EditTaskModal } from "./EditTask/EditTask";
import ConfettiExplosion from "react-confetti-explosion";

interface Props {
  task: Task;
  taskList: Task[];
  setTaskList: React.Dispatch<React.SetStateAction<Task[]>>;
}

const handleProgressImage = (priority: string) => {
  if (priority === "To do") {
    return Non;
  } else if (priority === "In Process") {
    return Half;
  } else {
    return Done;
  }
};
const getColor = (priority: string) => {
  if (priority === "High") {
    return "#f73446";
  } else if (priority === "Medium") {
    return "#ffbd21";
  } else {
    return "#0ac947";
  }
};

export const TaskItem: React.FC<Props> = ({ task, taskList, setTaskList }) => {
  const letterColor = getColor(task.priority);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const processOptions: string[] = ["To do", "In Process", "Done"];
  const [count, setCount] = useState(0);

  const openEditModal = (): void => {
    setShowEditModal(true);
  };
  const openDeleteModal = (): void => {
    setShowModal(true);
  };

  //handle toggle btn
  const handleUpgrade = () => {
    setCount((click) => (click + 1) % processOptions.length);
    setIsExploding(true);
  };
  const process: string = processOptions[count];
  console.log(process);
  const image = handleProgressImage(process);
  const [isExploding, setIsExploding] = React.useState(false);

  useEffect(() => {
    if (isExploding) {
      setTimeout(() => {
        setIsExploding(false);
      }, 800);
    }
  }, [isExploding]);
  return (
    <>
      <div className={styles.TaskItem}>
        <div className={styles.TaskItem__item}>
          <div className={styles.taskName}>
            <span className={styles.taskName__default}>Task</span>
            <span className={styles.taskName__title}>{task.title}</span>
          </div>

          <div className={styles.taskPriority}>
            <span className={styles.taskPriority__default}>Priority</span>
            <span
              className={styles.taskPriority__priority}
              style={{ color: letterColor }}
            >
              {task.priority}
            </span>
          </div>
          <div className={styles.Task__groupHandeBtn}>
            <button
              className={styles.Task__taskUpgrade}
              id="toggleBtn"
              onClick={handleUpgrade}
            >
              {process}
              {isExploding && <ConfettiExplosion />}
            </button>

            <div
              className={styles.Task__process}
              style={{ width: "24px", height: "24px" }}
            >
              <img src={image} alt="" />
            </div>
            <div className={styles.Task__handleTask}>
              <div
                className={styles.Task__editTask}
                onClick={() => openEditModal()}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={Edit}
                  alt=""
                  style={{ width: "22px", height: "22px" }}
                />
                {showEditModal ? (
                  <EditTaskModal
                    task={task}
                    taskList={taskList}
                    setTaskList={setTaskList}
                    setShowEditModal={setShowEditModal}
                  />
                ) : (
                  <></>
                )}
              </div>
              <div
                className={styles.Task__deleteTask}
                onClick={() => openDeleteModal()}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={Delete}
                  alt=""
                  style={{ width: "20px", height: "22px" }}
                />
                {showModal ? (
                  <DeleteTask
                    task={task}
                    taskList={taskList}
                    setTaskList={setTaskList}
                    setShowModal={setShowModal}
                  />
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskItem;
