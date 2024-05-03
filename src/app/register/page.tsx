"use client";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { User, registerUser } from "../_lib/userApi";

const queryClient = new QueryClient();

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const {
    mutateAsync: registerMutation,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: (userData: User) => {
      return registerUser(userData);
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["posts"],
        exact: true,
        refetchType: "active",
      });

      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await registerMutation({
      name: data.name,
      password: data.password,
      email: data.email,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name", { required: true })} />
      <input {...register("email", { required: true })} />
      <input {...register("password", { required: true })} />
      <input {...register("confirmPassword", { required: true })} />

      {/* {errors.exampleRequired && <span>This field is required</span>} */}

      <input type="submit" disabled={isPending} />
    </form>
  );
};

export default Register;
