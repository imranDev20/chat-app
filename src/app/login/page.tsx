"use client";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginUserPayload, loginUser } from "../_lib/userApi";
import { getAuthToken, setAuthToken } from "../_utils/utils";
import { useEffect } from "react";

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const queryClient = new QueryClient();

export default function Login() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const {
    mutateAsync: loginMutation,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: (userData: LoginUserPayload) => {
      return loginUser(userData);
    },
    onSuccess: async ({ data: { token } }) => {
      await queryClient.invalidateQueries({
        queryKey: ["posts"],
        exact: true,
        refetchType: "active",
      });

      setAuthToken(token);
      router.push("/chats");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await loginMutation({
      password: data.password,
      email: data.email,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email", { required: true })} />
      <input {...register("password", { required: true })} />

      {/* {errors.exampleRequired && <span>This field is required</span>} */}

      <input type="submit" disabled={isPending} />
    </form>
  );
}
