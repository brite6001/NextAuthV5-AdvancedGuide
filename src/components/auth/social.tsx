import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export const Social = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xs mx-auto w-full">
      <Button
        type="button"
        size="lg"
        variant="outline"
        className="flex-1 border-gray-300 hover:bg-gray-100 transition"
      >
        <FcGoogle className="h-5 w-5" />
        <span className="ml-2">Google</span>
      </Button>
      <Button
        type="button"
        size="lg"
        variant="outline"
        className="flex-1 border-gray-300 hover:bg-gray-100 transition"
      >
        <FaGithub className="h-5 w-5" />
        <span className="ml-2">GitHub</span>
      </Button>
    </div>
  );
};
