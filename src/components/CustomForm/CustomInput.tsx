import { Control, Controller, FieldError, FieldValues, Path } from "react-hook-form";

interface Props<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  type?: string;
  error?: FieldError;
}

const InputForm = <T extends FieldValues>({ name, control, label, type = "text", error }: Props<T>) => {
  return (
    <div className="w-full">
      <label htmlFor={name} className="block text-sm font-medium text-foreground mb-1 capitalize">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            id={name}
            type={type}
            {...field}
            value={field.value ?? ""}
            onChange={(e) => {
              const value = type === "number" ? e.target.valueAsNumber : e.target.value
              field.onChange(value)
            }}
            className={`w-full px-4 py-2 border rounded-xl bg-input text-foreground placeholder:text-muted-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all ${error ? "border-destructive" : "border-border"
              }`}
            placeholder={label}
          />
        )}
      />
      {error && <p className="mt-1 text-sm text-destructive">{error.message}</p>}
    </div>
  );
};

export default InputForm;
