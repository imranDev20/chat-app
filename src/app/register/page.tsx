"use client";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { RegisterUserPayload, registerUser } from "../_lib/userApi";
import { setAuthToken } from "../_utils/utils";
import { useRouter } from "next/navigation";

const queryClient = new QueryClient();

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const router = useRouter();

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
    mutationFn: (userData: RegisterUserPayload) => {
      return registerUser(userData);
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
