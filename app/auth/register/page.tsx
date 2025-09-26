"use client";

import FormInputErrorMessage from "@/components/form/FormInputErrorMessage";
import PasswordTemplateFooter from "@/components/form/PasswordTemplateFooter";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import Link from "next/link";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z
  .object({
    uname: z.string().min(1, "Username is required"),
    email: z.string().min(1, "Email is required").email(),
    password: z.string().min(8, "Password must be 8 or more characters long"),
    confirm: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.confirm === data.password, {
    path: ["confirm"],
    message: "Password does not match",
  });

export default function Register() {
  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      uname: "",
      email: "",
      password: "",
      confirm: "",
    },
  });

  return (
    <>
      <h2 className="text-center">Register</h2>
      <Card>
        <form
          className="flex flex-col gap-2"
          onSubmit={handleSubmit((data) => {
            console.log(data);
            reset();
          })}
        >
          <Controller
            name="uname"
            control={control}
            render={({ field, fieldState }) => (
              <div className="flex flex-col gap-2">
                <label>
                  <span>Username</span>
                  <InputText
                    placeholder="John Doe"
                    className={clsx("mt-2", { "p-invalid": fieldState.error })}
                    {...field}
                  />
                </label>
                <FormInputErrorMessage error={fieldState.error} />
              </div>
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <div className="flex flex-col gap-2">
                <label>
                  <span>Email</span>
                  <InputText
                    className={clsx("mt-2", { "p-invalid": fieldState.error })}
                    placeholder="example@email.com"
                    type="email"
                    {...field}
                  />
                </label>
                <FormInputErrorMessage error={fieldState.error} />
              </div>
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <div className="flex flex-col gap-2">
                <label>
                  <span>Password</span>
                  <Password
                    className={clsx("mt-2", { "p-invalid": fieldState.error })}
                    placeholder="Enter your password"
                    inputRef={field.ref}
                    footer={PasswordTemplateFooter}
                    feedback
                    toggleMask
                    {...field}
                  />
                </label>
                <FormInputErrorMessage error={fieldState.error} />
              </div>
            )}
          />

          <Controller
            name="confirm"
            control={control}
            render={({ field, fieldState }) => (
              <div className="flex flex-col gap-2">
                <label>
                  <span>Confirm password</span>
                  <Password
                    placeholder="Confirm your password"
                    className={clsx("mt-2", { "p-invalid": fieldState.error })}
                    inputRef={field.ref}
                    feedback={false}
                    toggleMask
                    {...field}
                  />
                </label>
                <FormInputErrorMessage error={fieldState.error} />
              </div>
            )}
          />

          <Button className="my-4" type="submit" label="Register" />
        </form>

        <div className="mt-2 flex items-center justify-center gap-2">
          Have an account?
          <Link href="/auth/login">Login</Link>
        </div>
      </Card>
    </>
  );
}
