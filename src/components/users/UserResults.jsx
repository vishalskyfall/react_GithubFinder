import React, { useEffect, useContext } from "react";
import GithubContext from "../../context/GithubContext";
import Spinner from "../layout/Spinner";
import USerItem from "./USerItem";

//need to use them when load so useeffect
function UserResults() {
  const { users, loading, fetchUsers } = useContext(GithubContext);
  useEffect(() => {
    fetchUsers();
  }, []);
  //now loaded users we want them in this file so state

  if (!loading) {
    return (
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
        {users.map((user) => (
          //<h3>{user.login}</h3>
          <USerItem key={user.id} user={user} />
        ))}
      </div>
      // inside {} map ma { curley na vaparava in arraow fun
    );
  } else {
    return <Spinner />;
  }
}

export default UserResults;
