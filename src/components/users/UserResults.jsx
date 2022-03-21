import React, { useEffect, useState } from "react";
import Spinner from "../layout/Spinner";
import USerItem from "./USerItem";



//need to use them when load so useeffect
function UserResults() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchUsers();
  }, []);
  //now loaded users we want them in this file so state

  const fetchUsers = async () => {
    const response = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`, {
      headers: {
        Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
      },
    });

    const data = await response.json();
console.log(data);
    setUsers(data);
    setLoading(false);
  };

  if(!loading){
  return (
    <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
      {users.map((user) => (
        //<h3>{user.login}</h3>
        <USerItem key={user.id} user={user} /> 
      ))}
    </div>  
    // inside {} map ma { curley na vaparava in arraow fun
  ); }
  else{
      return <Spinner />
  }
}

export default UserResults;
