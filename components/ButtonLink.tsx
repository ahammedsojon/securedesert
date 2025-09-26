"use client";

import { useRouter } from "next/navigation";
import { Button, ButtonProps } from "primereact/button";

interface IButtonLinkProps extends ButtonProps {
  href: string;
}

export default function ButtonLink({ href, ...buttonProps }: IButtonLinkProps) {
  const router = useRouter();
  return <Button onClick={() => router.push(href)} {...buttonProps} />;
}
