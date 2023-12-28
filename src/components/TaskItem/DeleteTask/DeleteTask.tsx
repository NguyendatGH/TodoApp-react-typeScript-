import { Task } from "../../Task";
import "./DeleteTask.scss";
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
    <div className="modal-overlay">
      <div className="modal__Delete">
        <div className="modal__modalDelete">
          <div className="modal__modalDeleteContent">
            <div className="modal--finalWarning">
              Are you sure you want to delete this task?
            </div>
            <div className="modal--groupBtn">
              <div className="modalBtn delete" onClick={() => handleConfrim()}>
                Delete
              </div>
              <div className="modalBtn cancel" onClick={() => handleCancel()}>
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
