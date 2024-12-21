import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { BeatLoader } from "react-spinners";
import Error from "./Error";
import { useEffect, useState } from "react";
import { signInData } from "@/types";
import * as yup from "yup";
import { api } from "@/Api/api";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

let schema = yup.object().shape({
  email: yup.string().email("Invalid Email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Must have atleast 6 characters")
    .required("password is required"),
});

const Login = () => {
  const [formData, setFormData] = useState<signInData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const{isAuthenticated,saveUser} = useAuth()

  useEffect(()=>{
       if(isAuthenticated){
        navigate('/dashboard')
       }
  },[])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);
    try {
      await schema.validate(formData, { abortEarly: false });
      const userData = { email: formData.email, password: formData.password };
      const response = await api.login(userData);
      if (response.success) {
        console.log("sign", response.data);
        saveUser(response.data)
        navigate("/dashboard");
      } else {
        setErrors({ err: response.message || "failed to login" });
      }
    } catch (e) {
      if (e instanceof yup.ValidationError) {
        // Collect validation errors
        const newErrors: Record<string, string> = {};
        e.inner.forEach((err) => {
          if (err.path) newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      } else {
        console.error("Unexpected error:", e);
        setErrors({ form: "An unexpected error occurred. Please try again." });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter the credentials</CardDescription>
        <Error message={errors.err} />
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-1">
          <CardDescription>Enter the email</CardDescription>
          <Input
            name="email"
            type="email"
            placeholder="Enter the email"
            onChange={handleInputChange}
          />
          {errors.email && <Error message={errors.email} />}
        </div>
        <div className="space-y-1">
          <CardDescription>Enter the password</CardDescription>
          <Input
            name="password"
            type="password"
            placeholder="Enter the password"
            onChange={handleInputChange}
          />
          {errors.password && <Error message={errors.password} />}
        </div>
      </CardContent>

      <CardFooter>
        <div className="flex justify-center">
          <Button onClick={handleSubmit}>
            {" "}
            {loading ? <BeatLoader size={10} color="blue" /> : "Submit"}{" "}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Login;
