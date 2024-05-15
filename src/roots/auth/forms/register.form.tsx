import React, { Fragment, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/auth.context";
import { IRegisterProps } from "../../../hooks/useAuth.hook";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Heading,
  Image,
  TextFiled,
  TextHighLight,
} from "../../../components/ui";
import { VideoLogo } from "../../../assets";
import { Size } from "../../../libs/utils/type.d";

interface IRegisterFormTabFirstProps {
  fullName: string;
  username: string;
  email: string;
}
interface IRegisterFormTabEndProps {
  phone: string;
  password: string;
  password_confirmed: string;
}
const RegisterFormPage: React.FC = () => {
  const [dataTabFirst, setDataTabFirst] =
    useState<IRegisterFormTabFirstProps>();
  const [isTabEnd, setIsTabEnd] = useState<boolean>(false);
  const navigate = useNavigate();
  const { register: registerToServer } = useContext(AuthContext);
  const {
    register: registerFirst,
    handleSubmit: handleSubmitFirst,
    formState: { errors: errorsFirst },
  } = useForm<IRegisterFormTabFirstProps>();
  const {
    register: registerEnd,
    handleSubmit: handleSubmitEnd,
    formState: { errors: errorsEnd },
  } = useForm<IRegisterFormTabEndProps>();
  const onSubmitTabFirst: SubmitHandler<IRegisterFormTabFirstProps> = (
    data
  ) => {
    setDataTabFirst(data);
    setIsTabEnd(true);
  };
  const onSubmitTabEnd: SubmitHandler<IRegisterFormTabEndProps> = (data) => {
    if (data.password !== data.password_confirmed) {
      alert("Re-password not confirmed");
      return;
    }
    const dataSubmit: IRegisterProps = {
      fullName: dataTabFirst?.fullName,
      username: dataTabFirst?.username,
      email: dataTabFirst?.email,
      phone: data?.phone,
      password: data?.password,
    };
    registerToServer(dataSubmit, navigate);
  };
  return (
    <Fragment>
      <div className="basis-1/2">
        <div className="">
          <Image
            src={VideoLogo}
            className="w-20 h-20 rounded-full"
            onClick={() => {
              navigate("/");
            }}
          />
          <Heading
            value="Create a Video Account"
            size={Size.XXL}
            className="pt-4"
          />
          <p className="pt-4">
            Fill in all personal information in the registration form
          </p>
        </div>
      </div>
      {!isTabEnd && (
        <form
          onSubmit={handleSubmitFirst(onSubmitTabFirst)}
          className="flex-1 space-y-2"
        >
          <TextFiled
            placeholder="Tran Dinh A"
            label="Full name"
            type="text"
            error={errorsFirst?.fullName?.message !== undefined}
            somethings={{
              ...registerFirst("fullName", {
                minLength: {
                  message: "Full name must be at least 5 characters",
                  value: 5,
                },
                required: {
                  value: true,
                  message: "Please enter your full name",
                },
              }),
            }}
          />
          {errorsFirst?.fullName?.message && (
            <TextHighLight
              value={errorsFirst?.fullName?.message}
              type="error"
            />
          )}
          <TextFiled
            placeholder="user1234"
            label="Username"
            type="text"
            error={errorsFirst?.username?.message !== undefined}
            somethings={{
              ...registerFirst("username", {
                minLength: {
                  message: "Username must be at least 5 characters",
                  value: 5,
                },
                required: {
                  value: true,
                  message: "Please enter your username",
                },
              }),
            }}
          />
          {errorsFirst?.username?.message && (
            <TextHighLight
              value={errorsFirst?.username?.message}
              type="error"
            />
          )}
          <TextFiled
            placeholder="example@gmail.com"
            label="Email"
            type="email"
            error={errorsFirst?.email?.message !== undefined}
            somethings={{
              ...registerFirst("email", {
                minLength: {
                  message: "Email must be at least 5 characters",
                  value: 5,
                },
                required: { value: true, message: "Please enter your email" },
              }),
            }}
          />
          {errorsFirst?.email?.message && (
            <TextHighLight value={errorsFirst?.email?.message} type="error" />
          )}
          <TextFiled
            value="Next"
            className="pt-2"
            type="submit"
            inputClassName="bg-primary-content-color cursor-pointer ring-0"
          />
          <div>
            <p>
              <span className="text-slate-400">
                You already have an account ?{" "}
              </span>
              <a
                href="/auth/login"
                className="hover:text-primary-content-color"
              >
                Sign in here{" "}
              </a>
            </p>
          </div>
        </form>
      )}
      {isTabEnd && (
        <form
          onSubmit={handleSubmitEnd(onSubmitTabEnd)}
          className="flex-1 space-y-2"
        >
          <TextFiled
            placeholder="0932477***"
            label="Phone"
            type="tel"
            error={errorsEnd?.phone?.message !== undefined}
            somethings={{
              ...registerEnd("phone", {
                minLength: {
                  message: "Phone must be at least 10 characters",
                  value: 10,
                },
                required: { value: true, message: "Please enter your phone" },
              }),
            }}
          />
          {errorsEnd?.phone?.message && (
            <TextHighLight value={errorsEnd?.phone?.message} type="error" />
          )}
          <TextFiled
            label="Password"
            placeholder="********"
            type="password"
            error={errorsEnd?.password?.message !== undefined}
            somethings={{
              ...registerEnd("password", {
                minLength: {
                  message: "Password must be at least 8 characters",
                  value: 8,
                },
                required: {
                  value: true,
                  message: "Please enter your password",
                },
              }),
            }}
          />
          {errorsEnd?.password?.message && (
            <TextHighLight value={errorsEnd?.password?.message} type="error" />
          )}
          <TextFiled
            label="Re-password"
            placeholder="********"
            type="password"
            error={errorsEnd?.password_confirmed?.message !== undefined}
            somethings={{
              ...registerEnd("password_confirmed", {
                minLength: {
                  message: "Re-password must be at least 8 characters",
                  value: 8,
                },
                required: {
                  value: true,
                  message: "Please enter your re-password",
                },
              }),
            }}
          />
          {errorsEnd?.password_confirmed?.message && (
            <TextHighLight
              value={errorsEnd?.password_confirmed?.message}
              type="error"
            />
          )}
          <div className="flex flex-row gap-3">
            <TextFiled
              value="Back"
              className="pt-2 basis-1/2"
              type="button"
              inputClassName="cursor-pointer ring-primary-content-color"
              somethings={{
                onClick: () => {
                  setIsTabEnd(false);
                },
              }}
            />
            <TextFiled
              value="Sign up"
              className="pt-2 flex-1"
              type="submit"
              inputClassName="bg-primary-content-color cursor-pointer ring-0"
            />
          </div>
        </form>
      )}
    </Fragment>
  );
};

export default RegisterFormPage;
