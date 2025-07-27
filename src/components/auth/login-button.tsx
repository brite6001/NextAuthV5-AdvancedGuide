"use client";

import { useRouter } from "next/navigation";

interface Props {
  children: React.ReactNode;
  asChild?: boolean; 
}

export const LoginButton = ({ children, asChild }: Props) => {
  const router = useRouter();
  const onClick = () => {
    router.push("/auth/login");
  };

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
