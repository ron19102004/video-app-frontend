import React, { useContext } from "react";
import { ILoginProps } from "../../../hooks/useAuth.hook";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/auth.context";

const LoginFormPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginProps>();
  const onSubmit: SubmitHandler<ILoginProps> = (data) => {
    login(data, navigate);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <div>
          <input
            className="outline-none ring-1 focus:ring-2 rounded-lg h-10 w-96"
            type="text"
            {...register("username", { required: true })}
            required
          />
          {errors?.username?.message}
        </div>
        <div>
          <input
            className="outline-none ring-1 focus:ring-2 rounded-lg h-10 w-96"
            type="password"
            {...register("password", { required: true })}
            required
          />
          {errors?.password?.message}
        </div>
        <input type="submit" />
      </form>
    </div>
  );
};

export default LoginFormPage;
