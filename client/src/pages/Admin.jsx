import React, { useEffect, useState } from "react";
import { deleteResidency, deleteUser, getAllUsers } from "../utils/Api";
import { useAuth0 } from "@auth0/auth0-react";

const Admin = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [users, setUsers] = useState([]);
  const [residencies, setResidencies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getAccessTokenSilently();
        console.log("Token:", token);
        const usersData = await getAllUsers(token);
        const residenciesData = await getAllResidencies(token);
        setUsers(usersData);
        setResidencies(residenciesData);
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };
    fetchData();
  }, [user?.email]);

  const handleDeleteUser = async (email) => {
    try {
      const token = await getAccessTokenSilently();
      await deleteUser(email, token);
      setUsers(users.filter((user) => user.email !== email));
    } catch (err) {
      console.error("Error deleting user", err);
    }
  };

  const handleDeleteResidency = async (id) => {
    try {
      const token = await getAccessTokenSilently();
      await deleteResidency(id, token);
      setResidencies(residencies.filter((residency) => residency.id !== id));
    } catch (err) {
      console.error("Error deleting residency", err);
    }
  };
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <section>
        <h3>Users</h3>
        <ul>
          {users.map((user) => (
            <li key={user.email}>
              {user.email}{" "}
              <button onClick={() => handleDeleteUser(user.email)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Residencies</h3>
        <ul>
          {residencies.map((residency) => (
            <li key={residency.id}>
              {residency.title}{" "}
              <button onClick={() => handleDeleteResidency(residency.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Admin;
