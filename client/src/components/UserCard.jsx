/* eslint-disable react/prop-types */

import { getHash } from "../helpers/getHash";

function UserCard({ user }) {
 
  return (
    <div className="user-card">
      <div className="user-group-data">
        <img
          src={`https://www.gravatar.com/avatar/${getHash(
            user.email
          )}?d=${user.default_url}`}
          alt="avatar"
          className="user-avatar"
        />
        <div>
          <p className="user-name">{user.name}</p>
          <p className="user-email">{user.email}</p>
        </div>
      </div>
      <div className="user-tasks-completed">
        <p>Tareas completadas </p>

        <span>{user.completed_tasks_count}</span>
      </div>
    </div>
  );
}
export { UserCard };
