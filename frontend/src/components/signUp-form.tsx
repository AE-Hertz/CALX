import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "@/assets/leaf.png";

import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import { useState } from "react";
import toast from "react-hot-toast";

type SignUpInputTypes = {
  email: string;
  password: string;
  confirmPassword: string;
};

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpInputTypes>();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const validateConfirmPassword = (value: string) => {
    return value === watch("password") || "Passwords do not match";
  };

  const submit: SubmitHandler<SignUpInputTypes> = async (data) => {
    setLoading(true);
    const toastId = toast.loading("Creating account...");
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      console.log("User signed up:", userCredential.user);
      toast.success("Signup successful!", { id: toastId });
      navigate("/login");
    } catch (error: unknown) {
      console.error("Signup error:", error);
      if (error instanceof Error) {
        toast.error(error.message, { id: toastId });
      } else {
        toast.error("An unknown error occurred.", { id: toastId });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6 m-2", className)} {...props}>
      <div className="m-auto size-20 flex items-center justify-center p-3 rounded-full">
        <img src={Logo} alt="Logo" width="100" />
        <div className="font-bold text-4xl tracking-wide">CALX</div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>
            Enter your credentials below to create a new account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form noValidate onSubmit={handleSubmit(submit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="calx@mail.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email format",
                    },
                  })}
                  required
                />
                {errors.email && (
                  <div className="text-red-500 text-sm">
                    {errors.email.message}
                  </div>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  required
                />
                {errors.password && (
                  <div className="text-red-500 text-sm">
                    {errors.password.message}
                  </div>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  {...register("confirmPassword", {
                    required: "Password is required",
                    validate: validateConfirmPassword,
                  })}
                  required
                />
                {errors.confirmPassword && (
                  <div className="text-red-500 text-sm">
                    {errors.confirmPassword.message}
                  </div>
                )}
              </div>
              <Button type="submit" className="w-full active:scale-95" disabled={loading}>
                {loading ? "Registering..." : "Register"}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="underline underline-offset-4">
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
