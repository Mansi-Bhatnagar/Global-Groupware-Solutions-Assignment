import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useEffect, useState } from "react";
import { editUser } from "../Services/Users";
import { toast } from "react-toastify";

const EditUser = ({
  open,
  setShowEditUserModal,
  user,
  editedSuccessfully,
  newDetails,
}) => {
  //Email Regex
  const emailRegex =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  //States
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [email, setEmail] = useState(user.email);
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [saveDisable, setSaveDisable] = useState(true);

  //Handlers
  const closeModalHandler = () => {
    setShowEditUserModal(false);
  };

  const firstNameHandler = (e) => {
    setFirstName(e.target.value);
    if (e.target.value.trim() === "") {
      setFirstNameError("First name cannot be empty");
    } else {
      setFirstNameError("");
    }
  };

  const lastNameHandler = (e) => {
    setLastName(e.target.value);
    if (e.target.value.trim() === "") {
      setLastNameError("Last name cannot be empty");
    } else {
      setLastNameError("");
    }
  };

  const emailHandler = (e) => {
    const currEmail = e.target.value;
    setEmail(currEmail);

    if (currEmail.trim() === "") {
      setEmailError("Email cannot be empty");
    } else {
      const result = emailRegex.test(email);
      if (!result) {
        setEmailError("Invalid email");
      } else {
        setEmailError("");
      }
    }
  };

  const saveChangesHandler = async (e) => {
    //API call
    e.preventDefault();
    setShowEditUserModal(false);
    const result = await editUser(user.id, firstName, lastName, email);
    if (result?.status === 200) {
      toast.success("User details edited successfully. 🎉");
      editedSuccessfully(true);
      newDetails(result?.data);
    } else {
      toast.error(
        "Could not edit user details at the moment. Try again later. 🙏"
      );
      editedSuccessfully(false);
    }
  };

  //Effects
  useEffect(() => {
    if (emailError || firstNameError || lastNameError) {
      setSaveDisable(true);
    } else {
      setSaveDisable(false);
    }
  }, [emailError, firstNameError, lastNameError]);

  return (
    <Dialog open={open} onClose={() => {}} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4 max-sm:p-2">
        <DialogPanel className="max-w-[506px] rounded-2xl bg-white p-7 max-sm:w-[calc(100vw_-_40px)]">
          <DialogTitle className="mb-4 text-xl font-semibold text-[#f48c06] max-sm:text-base">
            Edit User Details
          </DialogTitle>

          <form onSubmit={saveChangesHandler}>
            <div className="my-5 flex flex-col items-start justify-evenly max-sm:text-sm [&_label]:mb-1 [&_label]:text-[15px] [&_label]:font-medium [&_label]:text-[#979dac]">
              <label htmlFor="first-name">First Name</label>
              <input
                type="text"
                id="first-name"
                placeholder="Enter user's first name"
                value={firstName}
                onChange={firstNameHandler}
                className="w-[450px] rounded-lg border border-[#979dac] p-[10px] placeholder:text-[15px] focus:outline focus:outline-1 focus:outline-black max-sm:w-full max-sm:text-xs max-sm:placeholder:text-xs"
              />
              {firstNameError ? (
                <p className="mb-2 text-sm text-red-600">
                  {"* " + firstNameError}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="my-5 flex flex-col items-start justify-evenly max-sm:text-sm [&_label]:mb-1 [&_label]:text-[15px] [&_label]:font-medium [&_label]:text-[#979dac]">
              <label htmlFor="last-name">Last Name</label>
              <input
                type="text"
                id="last-name"
                placeholder="Enter user's last name"
                value={lastName}
                onChange={lastNameHandler}
                className="w-[450px] rounded-lg border border-[#979dac] p-[10px] placeholder:text-[15px] focus:outline focus:outline-1 focus:outline-black max-sm:w-full max-sm:text-xs max-sm:placeholder:text-xs"
              />
              {lastNameError ? (
                <p className="mb-2 text-sm text-red-600">
                  {"* " + lastNameError}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="my-5 flex flex-col items-start justify-evenly max-sm:text-sm [&_label]:mb-1 [&_label]:text-[15px] [&_label]:font-medium [&_label]:text-[#979dac]">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter user's email"
                value={email}
                onChange={emailHandler}
                className="w-[450px] rounded-lg border border-[#979dac] p-[10px] placeholder:text-[15px] focus:outline focus:outline-1 focus:outline-black max-sm:w-full max-sm:text-xs max-sm:placeholder:text-xs"
              />
              {emailError ? (
                <p className="mb-2 text-sm text-red-600">{"* " + emailError}</p>
              ) : (
                ""
              )}
            </div>
            <div className="flex items-center justify-end gap-3">
              <button
                disabled={saveDisable}
                type="submit"
                className="rounded-full border-[1.5px] border-transparent bg-[#f48c06] px-5 py-2 text-white transition-all duration-150 ease-in-out hover:scale-110 disabled:cursor-not-allowed disabled:opacity-50 max-sm:py-1 max-sm:text-sm"
                onClick={saveChangesHandler}
              >
                Save
              </button>
              <button
                className="rounded-full border-[1.5px] border-[#979dac] bg-transparent px-5 py-2 text-[#979dac] transition-all duration-150 ease-in-out hover:scale-110 max-sm:py-1 max-sm:text-sm"
                onClick={closeModalHandler}
              >
                Cancel
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default EditUser;
