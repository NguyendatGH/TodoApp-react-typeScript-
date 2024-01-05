import { useState } from "react";
import { Task } from "../../Task";
import Cancel from "../../image/Cancel.svg";
import styles from "./EditTask.module.scss";

interface Props {
  task: Task;
  taskList: Task[];
  setTaskList: React.Dispatch<React.SetStateAction<Task[]>>;
  setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditTaskModal: React.FC<Props> = ({
  task,
  setTaskList,
  setShowEditModal,
}) => {
  const [editPriority, setEditPriority] = useState<string>(task.priority);
  const [editTask, setEditTask] = useState<string>(task.title);

  const getPriority = (select: string) => {
    setEditPriority(select);
  };

  const handleCancel = (): void => {
    setTimeout(setShowEditModal, 100);
  };

  const handleEditTask = (e: React.FormEvent, id: string) => {
    e.preventDefault();
    // console.log("itemtitle:", editTask);
    // console.log("task:", task.title);
    if (editTask.trim() !== "") {
      setTaskList((taskList) =>
        taskList.map((item) =>
          item.id === id
            ? { ...item, title: editTask, priority: editPriority }
            : item
        )
      );
    }
    setTimeout(handleCancel, 100);
  };

  return (
    <>
      <div className={styles.modal__overlay}>
        <div className={styles.modal}>
          <div className={styles.modal__modal__EditTask}>
            <div className={styles.modal__EditTask__header}>
              <div className={styles.modal__EditTask__header__title}>
                Edit Task
              </div>
              <img
                className={styles.modal__EditTask__closeModal}
                src={Cancel}
                onClick={handleCancel}
              ></img>
            </div>
            <div className={styles.modal__InputArea}>
              <div className={styles.modal__inputArea__title__default}>
                Task
              </div>
              <form
                className={styles.modal__inputForm__textArea}
                action=""
                onSubmit={(e) => handleEditTask(e, task.id)}
              >
                <input
                  className={styles.modal__inputForm__taskTitle}
                  placeholder="Task name"
                  value={editTask}
                  onChange={(e) => setEditTask(e.target.value)}
                  maxLength={20}
                />
              </form>
            </div>
            <div className={styles.modal__taskPriority__EditTask}>
              <div className={styles.modal__taskPriority__title__EditTask}>
                Priority
              </div>
              <div className={styles.modal__groupBtn__EditTask}>
                <div
                  className={styles.modal__Btn__EditTask__high}
                  onClick={() => {
                    getPriority("High");
                  }}
                >
                  High
                </div>
                <div
                  className={styles.modal__Btn__EditTask__medium}
                  onClick={() => {
                    getPriority("Medium");
                  }}
                >
                  Medium
                </div>
                <div
                  className={styles.modal__Btn__EditTask__low}
                  onClick={() => {
                    getPriority("Low");
                  }}
                >
                  Low
                </div>
              </div>
            </div>
            <div className={styles.modal__handleTaskBtn__EditTask}>
              <div
                className={styles.modal__handleTaskBtn__EditTask__edit}
                onClick={(e) => handleEditTask(e, task.id)}
              >
                Edit
              </div>
              <div
                className={styles.modal__handleTaskBtn__EditTask__cancel}
                onClick={() => handleCancel()}
              >
                Cancel
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
