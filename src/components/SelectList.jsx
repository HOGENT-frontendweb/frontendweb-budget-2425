import { useFormContext } from 'react-hook-form';
import Form from 'react-bootstrap/Form';

export default function SelectList({
  label, name, placeholder, items, validationRules, ...rest
}) {
  const {
    register,
    formState: {
      errors,
      isSubmitting,
    },
  } = useFormContext();

  const hasError = name in errors;

  return (
    <Form.Group className="mb-3" controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Select
        {...register(name, validationRules)}
        disabled={isSubmitting}
        isInvalid={hasError}
        {...rest}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {items.map(({ id, name }) => (
          <option key={id} value={id}>{name}</option>
        ))}
      </Form.Select>
      {hasError && (
        <Form.Text className="text-danger">
          {errors[name].message}
        </Form.Text>
      )}
    </Form.Group>
  );
}