interface Error {
  message?: string;
}

interface FormInputErrorMessageProps {
  error: Error | undefined;
}

export default function FormInputErrorMessage({ error }: FormInputErrorMessageProps) {
  return error ? (
    <small className="p-error">{error.message}</small>
  ) : (
    <small className="p-error">&nbsp;</small>
  );
}
