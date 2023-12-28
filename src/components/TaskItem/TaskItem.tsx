import "./TaskItem.scss";
import Edit from "./image/Edit.svg";
import Delete from "./image/Delete.svg";
import Done from "./image/Done.svg";
import Half from "./image/Half.svg";
import Non from "./image/Non.svg";
import React, { useState } from "react";
import { Task } from "../Task";
import { DeleteTask } from "./DeleteTask/DeleteTask";
import { EditTaskModal } from "./EditTask/EditTask";

interface Props {
  task: Task;
  taskList: Task[];
  setTaskList: React.Dispatch<React.SetStateAction<Task[]>>;
}

const handleDisplayProgress = (priority: string) => {
  if (priority === "high") {
    return "Todo";
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

  const openEditModal = (): void => {
    setShowEditModal(true);
  };
  const openDeleteModal = (): void => {
    setShowModal(true);
  };

  return (
    <>
      <div className="TaskItem">
        <div className="Frame20">
          <div className="Frame4">
            <span className="default">Task</span>
            <span className="taskTitle">{task.title}</span>
          </div>

          <div className="Frame18">
            <span className="default">Priority</span>
            <span className="priority" style={{ color: letterColor }}>
              {task.priority}
            </span>
          </div>
          <div className="Frame19">
            <div className="bannerFrame19">
              <span defaultValue={(task.isDone = "Todo")}>
                {handleDisplayProgress(task.priority)}
              </span>
            </div>
            <div className="process">
              <img src={image} alt="" />
            </div>
            <div className="changeTask">
              <div className="editTask" onClick={() => openEditModal()}>
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
              <div className="deleteTask" onClick={() => openDeleteModal()}>
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
