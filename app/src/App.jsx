import 'vite/modulepreload-polyfill'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import {SideBar} from "./Components/SideBar"
import {Title} from "./Components/Title"
import { FriendsTab } from "./Components/FriendsTab/FriendsTab"

//Pages
import { WorkSpace } from './Components/WorkSpace'





function App() {
 const [showFriends,setShowFriend] = useState(false); 

  function handleShowFriends(){
	setShowFriend((prev)=>{
		return !prev;
	})
  } 

  

  return (
    <div className="m-0 items-center">
		 <div className='m-auto mt-4 w-[100%] flex justify-center text-center'>
			<WorkSpace />
		</div>
     <SideBar showFriendsFunc={handleShowFriends}/>
	{showFriends ? null : <FriendsTab />} 
	    
    </div>
  )
}

export default App
