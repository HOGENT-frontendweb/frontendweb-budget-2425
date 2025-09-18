import { useFormContext } from 'react-hook-form';
import Form from 'react-bootstrap/Form';

export default function LabelInput({
  label,
  name,
  type,
  validationRules,
  ...rest
}) {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext();

  const hasError = name in errors;

  return (
    <Form.Group className="mb-3" controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        {...register(name, validationRules)}
        type={type}
        disabled={isSubmitting}
        isInvalid={hasError}
        {...rest}
      />
      {hasError && (
        <Form.Text className="text-danger" data-cy="label_input_error">
          {errors[name].message}
        </Form.Text>
      )}
    </Form.Group>
  );
}
