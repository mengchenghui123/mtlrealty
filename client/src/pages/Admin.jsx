// import React, { useContext, useEffect } from "react";
// import userDetailContext from "../context/userDetailContext";
// import { getAllUsers } from "../utils/Api";
// import { toast } from "react-toastify";

// const Admin = () => {
//   const { userDetails, setUserDetail } = useContext(userDetailContext);
//   const { token } = userDetails; // 从 context 中获取 token
//   const users = userDetails.users || []; // 假设 userDetails 中有 users 数据

//   useEffect(() => {
//     const fetchUsers = async () => {
//       if (!users.length) {
//         try {
//           const userData = await getAllUsers(token);
//           setUserDetail((prevDetails) => ({
//             ...prevDetails,
//             users: userData, // 将获取的用户数据保存到 context 中
//           }));
//         } catch (error) {
//           toast.error("Failed to fetch users");
//         }
//       }
//     };

//     fetchUsers();
//   }, [token, users.length, setUserDetail]);

//   if (!users.length) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>All Users</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Email</th>
//             <th>Name</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user.id}>
//               <td>{user.id}</td>
//               <td>{user.email}</td>
//               <td>{user.name}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Admin;
import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getAllUsers } from "../utils/Api";
import { toast } from "react-toastify";

const Admin = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: "https://api.realEstate.com", // 您的 API 标识符
          scope: "openid profile email",
        });
        setToken(accessToken); // 存储 accessToken 以备后续使用
        console.log("Access Token:", accessToken); // 打印 Access Token 进行调试
      } catch (error) {
        console.error("Failed to get access token", error);
        toast.error("Failed to get access token");
      }
    };

    if (isAuthenticated) {
      fetchAccessToken();
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (token) {
        try {
          const userData = await getAllUsers(token);
          setUsers(userData);
          console.log("Fetched Users:", userData); // 打印获取到的用户数据进行调试
        } catch (error) {
          console.error("Failed to fetch users", error);
          toast.error("Failed to fetch users");
        }
      }
    };

    fetchUsers();
  }, [token]);

  if (!token) {
    return <div>Loading token...</div>;
  }

  if (!users.length) {
    return <div>Loading users...</div>;
  }

  return (
    <div>
      <h1>All Users (Test)</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.id}: {user.email} - {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
