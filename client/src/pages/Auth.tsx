
import Login from "@/components/Login";
import Signup from "@/components/Signup";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const {isAuthenticated} = useAuth()
  const navigate = useNavigate()
  useEffect(()=>{
          if(isAuthenticated){
            navigate("/dashboard")
          }
  },[isAuthenticated])
  return (
    <div className="mt-6 flex flex-col items-center gap-8">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Signup</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
         <Login/>
        </TabsContent>
        <TabsContent value="signup">
            <Signup/>
            </TabsContent>
      </Tabs>
    </div>
  );
};

export default Auth;
