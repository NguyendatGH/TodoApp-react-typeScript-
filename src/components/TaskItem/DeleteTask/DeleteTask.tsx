import { Task } from "../../Task";
import styles from "./DeleteTask.module.scss";
interface Props {
  task: Task;
  taskList: Task[];
  setTaskList: React.Dispatch<React.SetStateAction<Task[]>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}
export const DeleteTask: React.FC<Props> = ({
  task,
  taskList,
  setTaskList,
  setShowModal,
}) => {
  const handleConfrim = (): void => {
    console.log("confirm success");
    handleDelete(task.id);
  };
  const handleCancel = (): void => {
    console.log("click");
    setTimeout(setShowModal, 100);
  };
  const handleDelete = (id: string) => {
    setTaskList(taskList.filter((task) => task.id !== id));
    setTimeout(handleCloseError, 100);
  };
  const handleCloseError = (): void => {
    setShowModal(false);
  };
  console.log("taskListUpdate__afterDelete", taskList);
  return (
    <div className={styles.modal__overlay}>
      <div className={styles.modal__DeleteTask}>
        <div className={styles.modal__modalDelete}>
          <div className={styles.modal__modalContent}>
            <div className={styles.modal__titleWarning}>
              Are you sure you want to delete this task?
            </div>
            <div className={styles.modal__handleBtn}>
              <div className={styles.deleteBtn} onClick={() => handleConfrim()}>
                Delete
              </div>
              <div className={styles.cancelBtn} onClick={() => handleCancel()}>
                Cancel
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
//
