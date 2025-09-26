"use client";

import FormInputErrorMessage from "@/components/form/FormInputErrorMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z.string().min(1, "Email is required").email(),
});

export default function Login() {
  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  return (
    <>
      <h2 className="text-center">Reset Password</h2>
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
                    placeholder="example@email.com"
                    type="email"
                    {...field}
                  />
                </label>
                <FormInputErrorMessage error={fieldState.error} />
              </div>
            )}
          />

          <Button className="mt-4" type="submit" label="Reset password" />
        </form>
      </Card>
    </>
  );
}
