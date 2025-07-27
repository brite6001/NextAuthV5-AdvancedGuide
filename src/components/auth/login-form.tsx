import { CardWrapper } from "./card-wrapper";

export const LoginForm = () => {
  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      <div className="space-y-4">
        {/* Esto se reemplazará con el formulario real */}
        <div className="text-sm text-gray-600 text-center font-medium">
          LoginForm
        </div>
      </div>
    </CardWrapper>
  );
};
