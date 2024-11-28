import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { deleteUser } from "../Services/Users";
import { toast } from "react-toastify";

const DeleteUser = (props) => {
  //Handlers
  const deleteUserHandler = async () => {
    props.onClose();
    const result = await deleteUser(props.id);
    if (result.status === 204) {
      toast.success("User deleted successfully. 🎉");
      props.deletedSuccessfully(true);
    } else {
      toast.error("Could not delete at the moment. Try again later. 🙏");
      props.deletedSuccessfully(false);
    }
  };

  return (
    <Dialog open={props.open} onClose={props.onClose} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4 max-sm:p-2">
        <DialogPanel className="max-w-lg space-y-4 rounded-2xl bg-white p-10 max-sm:w-[calc(100vw_-_40px)]">
          <DialogTitle className="text-xl font-semibold max-sm:text-base">
            Delete User
          </DialogTitle>

          <p className="text-[15px] tracking-[0.8px] max-sm:text-sm">
            Are you sure you want to delete this user?
          </p>
          <div className="flex items-center justify-end gap-[10px]">
            <button
              className="rounded-full border-[1.5px] border-transparent bg-[#f48c06] px-5 py-2 text-white transition-all duration-150 ease-in-out hover:scale-110 max-sm:py-1 max-sm:text-sm"
              onClick={deleteUserHandler}
            >
              Delete
            </button>
            <button
              className="rounded-full border-[1.5px] border-[#979dac] bg-transparent px-5 py-2 text-[#979dac] transition-all duration-150 ease-in-out hover:scale-110 max-sm:py-1 max-sm:text-sm"
              onClick={props.onClose}
            >
              Cancel
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default DeleteUser;
