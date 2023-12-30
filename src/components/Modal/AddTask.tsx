import styles from "./AddTask.module.scss";
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
      <div className={styles.modal}>
        <div className={styles.modal__modal}>
          <div className={styles.modal__header}>
            <div className={styles.modal__header__addTask}>Add Task</div>
            <img
              className={styles.modal__header__closeIcon}
              src={Cancel}
              onClick={handleClose}
            ></img>
          </div>
          <div className={styles.modal__taskTitle}>
            <div className={styles.modal__taskTitle__name__default}>Task</div>
            <input
              className={styles.modal__taskTitle__textArea}
              placeholder="Task name"
              onChange={(e) => setTask(e.target.value)}
            ></input>
          </div>
          <div className={styles.modal__taskPriority}>
            <div className={styles.modal__taskPriority__name__default}>
              Priority
            </div>
            <div className={styles.modal__groupBtn}>
              <button
                className={styles.modal__Btn__high}
                onClick={() => getPriority("high")}
              >
                High
              </button>
              <button
                className={styles.modal__Btn__medium}
                onClick={() => getPriority("medium")}
              >
                Medium
              </button>
              <button
                className={styles.modal__Btn__low}
                onClick={() => getPriority("low")}
              >
                Low
              </button>
            </div>
          </div>
          <div className={styles.modal__handleTaskBtn}>
            <div
              className={styles.modal__handleTaskBtn__add}
              onClick={(e) => handleSubmit(e)}
            >
              Add
            </div>

            <div
              className={styles.modal__handleTaskBtn__cancel}
              onClick={handleClose}
            >
              Cancel
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddTask;
