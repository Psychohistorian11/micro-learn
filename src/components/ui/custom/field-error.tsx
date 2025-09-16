type FieldErrorProps = {
    errors: Record<string, any>;
    field: string;
};

export default function FieldError({ errors, field }: FieldErrorProps) {
    if (!errors[field]) return null;

    return (
        <span className="text-red-600 text-xs pl-2">
            {errors[field].message?.toString()}
        </span>
    );
}
