import { useState } from "react";
import { Task } from "../../Task";
import Cancel from "../../image/Cancel.svg";
import "./EditTask.scss";
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
      <div className="modal-overlay">
        <div className="modal">
          <div className="modal__modal__EditTask">
            <div className="modal__EditTask__header">
              <div className="modal__header--EditTask">Edit Task</div>
              <img
                className="modal__header__closeIconEditModal"
                src={Cancel}
                onClick={handleCancel}
              ></img>
            </div>
            <div className="modal__taskTitle__EditTask">
              <div className="modal__taskTitle--name__EditTask default">
                Task
              </div>
              <form
                className="modal__taskTitleForm--textArea"
                action=""
                onSubmit={(e) => handleEditTask(e, task.id)}
              >
                <input
                  className="modal__taskTitle--textArea "
                  placeholder="Task name"
                  value={editTask}
                  onChange={(e) => setEditTask(e.target.value)}
                />
              </form>
            </div>
            <div className="modal__taskPriority__EditTask">
              <div className="modal__taskPriority--name__EditTask default">
                Priority
              </div>
              <div className="modal__groupBtn__EditTask">
                <div
                  className="modal__Btn__EditTask high"
                  onClick={() => getPriority("high")}
                >
                  High
                </div>
                <div
                  className="modal__Btn__EditTask medium"
                  onClick={() => getPriority("medium")}
                >
                  Medium
                </div>
                <div
                  className="modal__Btn__EditTask low"
                  onClick={() => getPriority("low")}
                >
                  Low
                </div>
              </div>
            </div>
            <div className="modal__handleTaskBtn__EditTask">
              <div
                className="modal__handleTaskBtn__EditTask__edit"
                onClick={(e) => handleEditTask(e, task.id)}
              >
                Edit
              </div>
              <div
                className="modal__handleTaskBtn__EditTask__cancel"
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
