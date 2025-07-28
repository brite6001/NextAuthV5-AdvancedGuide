"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";

import { Header } from "./header";
import { Social } from "./social";
import { BackButton } from "./back-button";

interface Props {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: Props) => {
  return (
    <Card className="w-full max-w-md bg-white shadow-lg rounded-xl border border-gray-200">
      <CardHeader className="text-center space-y-2 pb-0">
        <Header label={headerLabel} />
      </CardHeader>

      <CardContent className="pt-4 space-y-4">
        {children}
      </CardContent>

      <CardFooter className="flex flex-col items-center justify-center gap-4 pt-0">
        {showSocial && <Social />}
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );

};
