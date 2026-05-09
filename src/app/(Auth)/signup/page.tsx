// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useForm } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import logo from "../../../../public/images/logo.png";
// import { useCreateStudentMutation } from "@/redux/features/userApi";
// import { toast } from "sonner";

// type StudentFormValues = {
//   name: string;
//   email: string;
//   password: string;
// };

// export default function Signup() {
//   const router = useRouter();
//   const [showPassword, setShowPassword] = useState(false);
//   const [createStudent, { isLoading }] = useCreateStudentMutation();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<StudentFormValues>({
//     defaultValues: {
//       name: "",
//       email: "",
//       password: "",
//     },
//   });

//   const onSubmit = async (data: StudentFormValues) => {
//     try {
//       const res = await createStudent(data).unwrap();
//       toast.success(res?.message || "You have registered successfully!");
//       router.push("/login");
//     } catch (err: any) {
//       toast.error(err?.data?.message || "Something went wrong!");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-linear-to-br from-primary/20 to-primary/30 flex items-center justify-center p-5">
//       <div className="w-full max-w-md">
//         {/* Logo */}
//         <div className="flex justify-center mb-5">
//           <Image
//             src={logo}
//             alt="Lenguable Logo"
//             height={60}
//             width={200}
//             className="object-contain"
//           />
//         </div>

//         <Card className="shadow-xl border-0">
//           <CardHeader className="space-y-1 pb-4">
//             <CardTitle className="text-2xl font-bold text-center">
//               Get Started Now
//             </CardTitle>
//             <CardDescription className="text-center">
//               Create a new student account
//             </CardDescription>
//           </CardHeader>

//           <CardContent>
//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//               {/* Name */}
//               <div className="space-y-2">
//                 <Label htmlFor="name">Name</Label>
//                 <div className="relative">
//                   <Input
//                     id="name"
//                     placeholder="Your name"
//                     className="pl-10"
//                     {...register("name", {
//                       required: "Name is required",
//                       minLength: {
//                         value: 2,
//                         message: "Name must be at least 2 characters",
//                       },
//                       maxLength: {
//                         value: 30,
//                         message: "Name cannot exceed 30 characters",
//                       },
//                     })}
//                   />
//                   <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
//                 </div>
//                 {errors.name && (
//                   <p className="text-red-500 text-sm">{errors.name.message}</p>
//                 )}
//               </div>

//               {/* Email */}
//               <div className="space-y-2">
//                 <Label htmlFor="email">Email</Label>
//                 <div className="relative">
//                   <Input
//                     id="email"
//                     type="email"
//                     placeholder="Your email"
//                     className="pl-10"
//                     {...register("email", {
//                       required: "Email is required",
//                       pattern: {
//                         value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//                         message: "Invalid email address",
//                       },
//                     })}
//                   />
//                   <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
//                 </div>
//                 {errors.email && (
//                   <p className="text-red-500 text-sm">{errors.email.message}</p>
//                 )}
//               </div>

//               {/* Password */}
//               <div className="space-y-2">
//                 <Label htmlFor="password">Password</Label>
//                 <div className="relative">
//                   <Input
//                     id="password"
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Your password"
//                     className="pl-10 pr-10"
//                     {...register("password", {
//                       required: "Password is required",
//                       minLength: {
//                         value: 6,
//                         message: "Password must be at least 6 characters",
//                       },
//                       validate: {
//                         hasUppercase: (v) =>
//                           /[A-Z]/.test(v) ||
//                           "Must contain at least one uppercase letter",
//                         hasLowercase: (v) =>
//                           /[a-z]/.test(v) ||
//                           "Must contain at least one lowercase letter",
//                         hasNumber: (v) =>
//                           /\d/.test(v) || "Must contain at least one number",
//                         hasSpecial: (v) =>
//                           /[@$!%*?&#]/.test(v) ||
//                           "Must contain at least one special character (@$!%*?&#)",
//                       },
//                     })}
//                   />
//                   <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                   >
//                     {showPassword ? (
//                       <EyeOff className="h-4 w-4" />
//                     ) : (
//                       <Eye className="h-4 w-4" />
//                     )}
//                   </button>
//                 </div>
//                 {errors.password && (
//                   <p className="text-red-500 text-sm">
//                     {errors.password.message}
//                   </p>
//                 )}

//                 {/* Password requirements hint */}
//                 {/* <ul className="text-xs text-muted-foreground space-y-0.5 mt-1">
//                   <li>• At least 8 characters</li>
//                   <li>• One uppercase letter (A-Z)</li>
//                   <li>• One lowercase letter (a-z)</li>
//                   <li>• One number (0-9)</li>
//                   <li>• One special character (@$!%*?&#)</li>
//                 </ul> */}
//               </div>

//               {/* Submit */}
//               <Button
//                 type="submit"
//                 size="lg"
//                 className="w-full"
//                 disabled={isLoading}
//               >
//                 {isLoading ? "Creating..." : "Sign Up"}
//               </Button>

//               {/* Login Link */}
//               <div className="text-center text-sm text-gray-600">
//                 Already have an account?{" "}
//                 <Link
//                   href="/login"
//                   className="text-primary font-medium hover:underline"
//                 >
//                   Sign in
//                 </Link>
//               </div>
//             </form>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../../public/images/logo.png";
import { useCreateStudentMutation } from "@/redux/features/userApi";
import { useLoginMutation } from "@/redux/features/authApi"; // 👈 add this
import { toast } from "sonner";

type StudentFormValues = {
  name: string;
  email: string;
  password: string;
};

export default function Signup() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [createStudent, { isLoading }] = useCreateStudentMutation();
  const [login] = useLoginMutation(); // 👈 add this

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StudentFormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: StudentFormValues) => {
    try {
      // Step 1 — create account
      await createStudent(data).unwrap();

      // Step 2 — auto login
      const loginRes = await login({
        email: data.email,
        password: data.password,
      }).unwrap();

      toast.success("Account created successfully!");

      // Step 3 — redirect to dashboard
      const role = loginRes?.data?.user?.role;
      if (role === "STUDENT") {
        router.push("/dashboard/student/lessons");
      } else if (role === "TEACHER") {
        router.push("/dashboard/teacher/my-schedules");
      } else {
        router.push("/");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-primary/20 to-primary/30 flex items-center justify-center p-5">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-5">
          <Image
            src={logo}
            alt="Lenguable Logo"
            height={60}
            width={200}
            className="object-contain"
          />
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl font-bold text-center">
              Get Started Now
            </CardTitle>
            <CardDescription className="text-center">
              Create a new student account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <div className="relative">
                  <Input
                    id="name"
                    placeholder="Your name"
                    className="pl-10"
                    {...register("name", {
                      required: "Name is required",
                      minLength: {
                        value: 2,
                        message: "Name must be at least 2 characters",
                      },
                      maxLength: {
                        value: 30,
                        message: "Name cannot exceed 30 characters",
                      },
                    })}
                  />
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="Your email"
                    className="pl-10"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Your password"
                    className="pl-10 pr-10"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                      validate: {
                        hasUppercase: (v) =>
                          /[A-Z]/.test(v) ||
                          "Must contain at least one uppercase letter",
                        hasLowercase: (v) =>
                          /[a-z]/.test(v) ||
                          "Must contain at least one lowercase letter",
                        hasNumber: (v) =>
                          /\d/.test(v) || "Must contain at least one number",
                        hasSpecial: (v) =>
                          /[@$!%*?&#]/.test(v) ||
                          "Must contain at least one special character (@$!%*?&#)",
                      },
                    })}
                  />
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Creating..." : "Sign Up"}
              </Button>

              {/* Login Link */}
              <div className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-primary font-medium hover:underline"
                >
                  Sign in
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
