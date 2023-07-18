import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../../hooks/useRefresh";
import useAuth from "../../hooks/useAuth";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, persist } = useAuth();

  useEffect(() => {
	let isMounted = true;
    const verifyRefreshToken = async () => {
		
      try {
        await refresh();
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
		
      }
    };

    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
	return () => isMounted = false;
  }, []);


  return <>{!persist ? <Outlet/> : isLoading ? <p>Loading ....</p> : <Outlet/>}</>;
};

export default PersistLogin