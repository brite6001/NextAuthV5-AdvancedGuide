import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@root/routes";

export const Social = () => {
  function handleSignIn(provider: string) {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xs mx-auto w-full">
      <Button
        type="button"
        size="lg"
        variant="outline"
        className="flex-1 border-gray-300 hover:bg-gray-100 transition"
        onClick={() => handleSignIn("google")}
      >
        <FcGoogle className="h-5 w-5" />
        <span className="ml-2">Google</span>
      </Button>
      <Button
        type="button"
        size="lg"
        variant="outline"
        className="flex-1 border-gray-300 hover:bg-gray-100 transition"
        onClick={() => handleSignIn("github")}
      >
        <FaGithub className="h-5 w-5" />
        <span className="ml-2">GitHub</span>
      </Button>
    </div>
  );
};
