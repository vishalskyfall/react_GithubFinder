import { createContext,useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_URL =process.env.REACT_APP_GITHUB_URL;
const  GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;
// console.log(GITHUB_TOKEN +" "+GITHUB_URL);
export const GithubProvider = ({children})=>{
    // const [users, setUsers] = useState([]);
    // const [loading, setLoading] = useState(true);
const initialState = {
  users:[],
  loading:true
}

const [state,dispatch] = useReducer(githubReducer,initialState)

    const fetchUsers = async () => {
        const response = await fetch(`${GITHUB_URL}/users`, {
          headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
          },
        });
    
        const data = await response.json();
    // console.log(data);
        // setUsers(data);
        // setLoading(false);

        dispatch({
          type:'GET_USERS',
          payload:data
        })
      }; 

      return <GithubContext.Provider value={{
          users:state.users,
          loading:state.loading,
          fetchUsers
      }}>
          {children}
      </GithubContext.Provider>
}

export default GithubContext;