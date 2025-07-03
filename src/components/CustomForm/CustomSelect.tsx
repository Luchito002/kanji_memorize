import { Control, Controller, FieldError, FieldValues, Path } from "react-hook-form";

interface Option {
  value: string | number;
  label: string;
  onClick?: () => void;
}

interface Props<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  options: Option[];
  error?: FieldError;
}

export function CustomSelect<T extends FieldValues>({
  name,
  control,
  label,
  options,
  error,
}: Props<T>) {
  return (
    <div className="w-full">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-foreground mb-1 capitalize"
      >
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <select
            id={name}
            {...field}
            onChange={(e) => {
              const selectedValue = e.target.value;
              field.onChange(selectedValue);
              const selected = options.find((opt) => opt.value.toString() === selectedValue);
              if (selected?.onClick) selected.onClick();
            }}
            className={`appearance-none w-full px-4 py-2 pr-10 border rounded-xl bg-popover text-popover-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-all ${error ? "border-destructive" : "border-border"
              }`}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        )}
      />
      {error && <p className="mt-1 text-sm text-destructive">{error.message}</p>}
    </div>
  );
}
