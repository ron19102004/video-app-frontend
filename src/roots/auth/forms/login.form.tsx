import React, { Fragment, useContext } from "react";
import { ILoginProps } from "../../../hooks/useAuth.hook";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/auth.context";
import { Image, TextFiled, TextHighLight } from "../../../components/ui";
import Heading from "../../../components/ui/Heading";
import { Size } from "../../../libs/utils/type.d";
import { VideoLogo } from "../../../assets";

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
    <Fragment>
      <div className="basis-1/2">
        <div className="">
          <Image src={VideoLogo} className="w-20 h-20 rounded-full" />
          <Heading value="Sign In to Video" size={Size.XXL} className="pt-4" />
          <p className="pt-4">Use your Video Account</p>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex-1 space-y-2">
        <TextFiled
          placeholder="example@gmail.com"
          label="Username or email"
          type="text"
          error={errors?.username?.message !== undefined}
          somethings={{
            ...register("username", {
              minLength: {
                message: "Username must be at least 5 characters",
                value: 5,
              },
              required: { value: true, message: "Please enter your username" },
            }),
          }}
        />
        {errors?.username?.message && (
          <TextHighLight value={errors?.username?.message} type="error" />
        )}
        <TextFiled
          label="Password"
          placeholder="********"
          type="password"
          error={errors?.password?.message !== undefined}
          somethings={{
            ...register("password", {
              minLength: {
                message: "Password must be at least 8 characters",
                value: 8,
              },
              required: { value: true, message: "Please enter your password" },
            }),
          }}
        />
        {errors?.password?.message && (
          <TextHighLight value={errors?.password?.message} type="error" />
        )}
        <TextFiled
          className="pt-2"
          type="submit"
          inputClassName="bg-primary-content-color cursor-pointer ring-0"
        />
        <div>
          <p>
            <span className="text-slate-400">You don't have an account ? </span>
            <a href="/auth/register" className="hover:text-primary-content-color">Register here </a>
          </p>
        </div>
      </form>
    </Fragment>
  );
};

export default LoginFormPage;
