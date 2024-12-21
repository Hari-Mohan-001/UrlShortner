import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Home, Link2, LogOut } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import { useCallback } from "react";


const Header = () => {
  const navigate = useNavigate();
  
 const {user,isAuthenticated,signOut} = useAuth()

 const handleLogout = useCallback(()=>{
             signOut()
 },[])

  return (
    <nav className=" flex items-center justify-between py-4">
      <Link to={"/"}>
        <img src="/logo.webp" className="h-16 ml-6 rounded-md" alt="img" />
      </Link>
      <span className="text-3xl font-semibold">Url Shortner</span>

      <div className="mr-16">
        
     {/* <span>{user?.name}</span> */}
        {isAuthenticated ? (
          <div className="flex items-center gap-3">
            <span>{user?.name}</span>
          <DropdownMenu>
            <DropdownMenuTrigger className=" w-15 rounded-full overflow-hidden">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link2 />
                <span>My links</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Home />
                <span> Home</span>
              </DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                <LogOut className="mr-2 h-5 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          </div>
        ) : (
          <Button onClick={() => navigate("/auth")}>Login</Button>
        )}
      </div>
    </nav>
  );
};

export default Header;
