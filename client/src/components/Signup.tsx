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
import { useState } from "react";
import { signUpData } from "@/types";
import * as yup from "yup";
import { api } from "@/Api/api";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react";


let schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid Email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Must have atleast 6 characters")
    .required("password is required"),
  confirmPassword: yup
    .string()
    .min(6, "Must have atleast 6 characters")
    .required("password is required"),
});

const Signup = () => {
  const [formData, setFormData] = useState<signUpData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const[signupSucees, setSignupSuccess] =useState<boolean>(false)
  const navigate = useNavigate();

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
      if (formData.password !== formData.confirmPassword) {
        setErrors({ matchError: "Passwords does not match" });
        return;
      }
      const userData = { name:formData.name,email: formData.email, password: formData.password };
      const response = await api.signUp(userData);
      if (response.success) {
        console.log("sign", response.data);
       setSignupSuccess(true)
       // navigate("/login");
      } else {
        setErrors({ loginError: response.message || "failed to login" });
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
        <CardTitle>Signup</CardTitle>
        <CardDescription>Enter the credentials</CardDescription>
        <Error message={errors.loginError} />
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-1">
          <CardDescription>Enter the name</CardDescription>
          <Input name="name" type="text" onChange={handleInputChange} />
          {errors.name && <Error message={errors.name} />}
        </div>
        <div className="space-y-1">
          <CardDescription>Enter the email</CardDescription>
          <Input name="email" type="email" onChange={handleInputChange} />
          {errors.email && <Error message={errors.email} />}
        </div>
        <div className="space-y-1">
          <CardDescription>Enter the password</CardDescription>
          <Input name="password" type="password" onChange={handleInputChange} />
          {errors.password && <Error message={errors.password} />}
        </div>
        <div className="space-y-1">
          <CardDescription>Enter the password again</CardDescription>
          <Input
            name="confirmPassword"
            type="password"
            onChange={handleInputChange}
          />
          {errors.confirmPassword && <Error message={errors.confirmPassword} />}
          {errors.matchError && <Error message={errors.matchError} />}
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
      {signupSucees && <Alert>
  <Terminal className="h-4 w-4" />
  <AlertTitle>Success</AlertTitle>
  <AlertDescription>
    You have successfully registered and now you can login to continue
  </AlertDescription>
</Alert>
}
    </Card>
  );
};

export default Signup;
