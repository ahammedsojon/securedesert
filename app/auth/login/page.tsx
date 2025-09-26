"use client";

import FormInputErrorMessage from "@/components/form/FormInputErrorMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import Link from "next/link";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z.string().min(1, "Email is required").email(),
  password: z.string().min(8, "Password must be 8 or more characters long"),
  remember: z.boolean(),
});

export default function Login() {
  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  return (
    <>
      <h2 className="text-center">Login</h2>
      <Card>
        <form
          className="flex flex-col gap-2"
          onSubmit={handleSubmit((data) => {
            console.log(data);
            reset();
          })}
        >
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <div className="flex flex-col gap-2">
                <label>
                  <span>Email</span>
                  <InputText
                    className={clsx("mt-2", { "p-invalid": fieldState.error })}
                    placeholder="John Doe"
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
                    placeholder="Your password"
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

          <Controller
            name="remember"
            control={control}
            render={({ field }) => (
              <div className="mt-2 flex justify-center">
                <label className="flex items-center justify-center">
                  <Checkbox checked={field.value} inputRef={field.ref} {...field} />
                  <span className="ml-2">Remember me for 30 days</span>
                </label>
              </div>
            )}
          />

          <Button className="my-4" type="submit" label="Login" />
        </form>

        <div className="mt-4 flex flex-col items-center justify-center gap-2 sm:flex-row">
          Forgot your password?
          <Link href="/auth/reset-password">Reset password</Link>
        </div>
        <div className="mt-2 flex flex-col items-center justify-center gap-2 sm:flex-row">
          Need an account?
          <Link href="/auth/register">Register</Link>
        </div>
      </Card>
    </>
  );
}
