import React, { useEffect, useState } from "react";
import axios from "axios";

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/admin/users", {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => setUsers(res.data.users))
      .catch(err => console.error(err));
  }, []);

  const changeRole = (id, role) => {
    axios.patch(`http://localhost:5000/admin/users/${id}/role`, { role }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(() => {
      setUsers(prev => prev.map(u => u._id === id ? { ...u, role } : u));
    });
  };

  return (
    <div>
      <h2>All Users</h2>
      <table>
        <thead>
          <tr><th>Name</th><th>Email</th><th>Role</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <button onClick={() => changeRole(u._id, 'librarian')}>Make Librarian</button>
                <button onClick={() => changeRole(u._id, 'admin')}>Make Admin</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
