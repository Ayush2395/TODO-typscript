import { useState } from "react";
import useAuth from "../hooks/useAuth";

interface ErrorProp {
  error?: boolean;
  msg?: string;
}

const useLoginAndSignup = (url: string) => {
 
  const [error, setError] = useState<ErrorProp>();
  const { dispatch } = useAuth();

  const handleAuth = async (email:string,password:string) => {
    setError({ msg: "" });

    if (email === "" || password === "") {
      return setError({ error: true, msg: "All fields are required" });
    }

    const user: { email: string; password: string } = { email, password };

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    const json = await response.json();

    if (!response.ok) {
      setError({ error: true, msg: json.error });
    }

    if (response.ok) {
    //   console.table(json);
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "login", payload: json });
    }
  };

  return {handleAuth,error,setError}
};

export default useLoginAndSignup