import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal";
import { useTaskStore } from "@/hooks/useTaskStore";
import toast from "react-hot-toast";
import axios from "axios";

const DeleteTaskModal = () => {
  const { isOpen, modalType, taskId, onClose } = useModal();
  const { deleteTask } = useTaskStore();

  const handleDelete = async () => {
    if (!taskId) return;
    
    try {
      deleteTask(taskId); 
      onClose();
      toast.success("Task deleted")
    } catch (error) {
      onClose();
      toast.error("Failed to delete task")
      console.error("Failed to delete task", error);
    }
  };

  if (!isOpen || modalType !== "deleteTask") return null;

  return (
    <Modal
      title="Delete Task"
      description="Are you sure you want to delete this task? This action cannot be undone."
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex justify-end space-x-4 mt-4">
        <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-md">
          Cancel
        </button>
        <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded-md">
          Delete
        </button>
      </div>
    </Modal>
  );
};

export default DeleteTaskModal;
