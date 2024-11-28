import { useCallback, useEffect, useRef } from "react";
import { getUsers } from "../Services/Users";
import { useState } from "react";
import DeleteUser from "../Components/DeleteUserModal";
import EditUser from "../Components/EditUserModal";

const Users = () => {
  const observer = useRef();

  //States
  const [userData, setUserData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [moreData, setMoreData] = useState(true);
  const [userId, setUserId] = useState();
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
  const [deletedSuccessfully, setDeletedSuccessfully] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [editedSuccessfully, setEditedSuccessfully] = useState(false);
  const [newDetails, setNewDetails] = useState({});

  //Handlers
  const loadMoreUsers = async () => {
    setLoading(true);
    const newUsers = await getUsers(page);
    if (newUsers?.data?.data?.length > 0) {
      setUserData((prevUsers) => [...prevUsers, ...newUsers.data.data]);
    } else {
      setMoreData(false);
    }
    setLoading(false);
  };

  const deleteUserHandler = (id) => {
    setUserId(id);
    setShowDeleteUserModal(true);
  };

  const editUserModal = (id, user) => {
    setUserId(id);
    setCurrentUser(user);
    setShowEditUserModal(true);
  };

  //Effects

  useEffect(() => {
    if (!loading && moreData) {
      loadMoreUsers();
    }
  }, [page]);

  useEffect(() => {
    if (deletedSuccessfully) {
      setUserData((prev) => prev.filter((user) => user.id !== userId));
      setDeletedSuccessfully(false);
    }
  }, [deletedSuccessfully]);

  useEffect(() => {
    if (editedSuccessfully) {
      setUserData((prev) => {
        const temp = prev;
        for (let i = 0; i < temp.length; i++) {
          if (temp[i].id === currentUser.id) {
            temp[i].first_name = newDetails.first_name;
            temp[i].last_name = newDetails.last_name;
            temp[i].email = newDetails.email;
            break;
          }
        }

        return temp;
      });
      setEditedSuccessfully(false);
    }
  }, [editedSuccessfully]);

  const lastUserElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading]
  );

  return (
    <div className="flex min-h-screen flex-wrap items-center justify-center gap-16 bg-[#f8f9fa] py-10">
      {userData?.map((user, index) => (
        <div
          className="flex h-[200px] w-[400px] items-center justify-start gap-6 rounded-md p-5 shadow-[0_4px_6px_rgba(0,0,0,0.1)] hover:cursor-pointer"
          key={index}
          ref={userData.length === index + 1 ? lastUserElementRef : null}
        >
          <img
            className="h-[128px] w-[128px] rounded-full border-2 border-[#f48c06] object-cover"
            src={user.avatar}
            alt={user.first_name}
          />
          <div className="w-full [&_div]:flex [&_div]:items-center [&_div]:gap-2 [&_h5]:text-lg [&_h5]:font-medium [&_h5]:text-[#f48c06] [&_span]:font-medium [&_span]:text-[#979dac]">
            <div>
              <h5>First name: </h5>
              <span>{user.first_name}</span>
            </div>
            <div>
              <h5>Last name: </h5>
              <span>{user.last_name}</span>
            </div>
            <div className="mt-8 flex items-center !justify-end !gap-3">
              <button
                onClick={() => editUserModal(user.id, user)}
                className="w-20 rounded-full bg-[#f48c06] py-2 text-sm text-white transition-all duration-150 ease-in-out hover:scale-110"
              >
                Edit
              </button>
              <button
                onClick={() => deleteUserHandler(user.id)}
                className="w-20 rounded-full bg-[#979dac] py-2 text-sm text-white transition-all duration-150 ease-in-out hover:scale-110"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
      {loading ? (
        <div
          className="text-primary inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-[#f48c06] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      ) : (
        ""
      )}
      {showEditUserModal && (
        <EditUser
          open={showEditUserModal}
          setShowEditUserModal={setShowEditUserModal}
          user={currentUser}
          editedSuccessfully={setEditedSuccessfully}
          newDetails={setNewDetails}
        />
      )}
      <DeleteUser
        open={showDeleteUserModal}
        onClose={() => setShowDeleteUserModal(false)}
        id={userId}
        deletedSuccessfully={setDeletedSuccessfully}
      />
    </div>
  );
};

export default Users;
