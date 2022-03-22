import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;
// console.log(GITHUB_TOKEN +" "+GITHUB_URL);
export const GithubProvider = ({ children }) => {
  // const [users, setUsers] = useState([]);
  // const [loading, setLoading] = useState(true);
  const initialState = {
    users: [],
    user:{},
    repos:[],
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

 const clearUser = () =>{
   dispatch({type:'CLEAR_USERS'})
 }


  const searchUsers = async (text) => {
    setLoading();
    const params = new URLSearchParams({
      q:text
    })
      const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
        // headers: {
        //   Authorization: `token ${GITHUB_TOKEN}`,
        // },
      });
  
      const { items} = await response.json();
  // console.log(data);
      // setUsers(data);
      // setLoading(false);

      dispatch({
        type:'GET_USERS',
        payload:items
      })
    }; 

//for single user
 const getUser = async (login) => {
    setLoading();
    
      const response = await fetch(`${GITHUB_URL}/users/${login}`, {
        // headers: {
        //   Authorization: `token ${GITHUB_TOKEN}`,
        // },
      });

      if(response.status === 404){
        window.location ='/notfound'
      }
      else{
        const data = await response.json();
        dispatch({
          type:'GET_USER',
          payload:data
        })
      }
  // console.log(data);
      // setUsers(data);
      // setLoading(false);
    }; 

    //get repos
    const getUserRepos = async (login) => {
      setLoading();
      //to sort via created date 
      const params = new URLSearchParams({
        sort:'created',
        per_page:10
      })
     
        const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
          // headers: {
          //   Authorization: `token ${GITHUB_TOKEN}`,
          // },
        });
    
        const data = await response.json();
    // console.log(data);
        // setUsers(data);
        // setLoading(false);
  
        dispatch({
          type:'GET_REPOS',
          payload:data
        })
      }; 
  

//can use later for fetching 
//as of now commenting thanks

  // const fetchUsers = async () => {
  //   setLoading();
  //   const response = await fetch(`${GITHUB_URL}/users`, {
  //     headers: {
  //       Authorization: `token ${GITHUB_TOKEN}`,
  //     },
  //   });

  //   const data = await response.json();
  //   // console.log(data);
  //   // setUsers(data);
  //   // setLoading(false);

  //   dispatch({
  //     type: "GET_USERS",
  //     payload: data,
  //   });
  // };

  //set loading

  const setLoading = () => dispatch({ type: "SET_LOADING" });
  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user:state.user,
        loading: state.loading,
        repos:state.repos, //instead of these 4 lines you can directly add "...state" will save space
        // fetchUsers,
        searchUsers,
        clearUser,
        getUser,
        getUserRepos
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
