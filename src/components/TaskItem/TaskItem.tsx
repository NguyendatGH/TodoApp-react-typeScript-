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

const handleDisplayProgress = (priority: string) => {
  if (priority === "high") {
    return "To do";
  } else if (priority === "medium") {
    return "In Progress";
  } else {
    return "Done";
  }
};

const handleProgressImage = (priority: string) => {
  if (priority === "high") {
    return Non;
  } else if (priority === "medium") {
    return Half;
  } else {
    return Done;
  }
};
const getColor = (priority: string) => {
  if (priority === "high") {
    return "#f73446";
  } else if (priority === "medium") {
    return "#ffbd21";
  } else {
    return "#0ac947";
  }
};

export const TaskItem: React.FC<Props> = ({ task, taskList, setTaskList }) => {
  const image = handleProgressImage(task.priority);
  const letterColor = getColor(task.priority);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [process, SetProcess] = useState(handleDisplayProgress(task.priority));
  const openEditModal = (): void => {
    setShowEditModal(true);
  };
  const openDeleteModal = (): void => {
    setShowModal(true);
  };

  //handle toggle btn
  const handleUpgrade = () => {
    let updatedTaskList = [...taskList];
    const updatedTask = { ...task };

    if (task.priority === "high") {
      updatedTask.priority = "medium";
      SetProcess("In process");
    } else if (task.priority === "medium") {
      updatedTask.priority = "low";
      SetProcess("Done");
    } else {
      updatedTask.priority = "high";
      SetProcess("To do");
    }
    updatedTaskList = updatedTaskList.map((item) =>
      item.id === updatedTask.id ? updatedTask : item
    );
    setTaskList(updatedTaskList);
    setIsExploding(true);
  };
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

            <div className={styles.Task__process}>
              <img src={image} alt="" />
            </div>
            <div className={styles.Task__handleTask}>
              <div
                className={styles.Task__editTask}
                onClick={() => openEditModal()}
              >
                <img src={Edit} alt="" />
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
              >
                <img src={Delete} alt="" />
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
