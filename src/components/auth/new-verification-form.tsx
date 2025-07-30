"use client";

import { newVerification } from "@/actions";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { CardWrapper } from "./card-wrapper";
import { FormSucess } from "./form-sucess";
import { FormError } from "./form-error";

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  // useCallback devuelve una versión memorizada (cacheada) de una función, que solo cambia si cambian las dependencias que le pasás
  // ✅ Previene que onSubmit se redefina en cada render
  // ✅ Evita que useEffect se dispare innecesariamente
  // ✅ Mejora el rendimiento y estabilidad del componente
  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("Missing token!");
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="flex items-center justify-center w-full">
        {!success && !error && <BeatLoader />}
        <FormSucess message={success} />
        {!success && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
};
