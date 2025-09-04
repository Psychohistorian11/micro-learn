import { Controller } from "react-hook-form";
import { Button } from "../ui/button";
import { InputOTPCode } from "./input-otp";
import FieldError from "../ui/custom/field-error";

export default function ResetPasswordOtpForm({
  onSubmitOTP,
  control,
  handleSubmit,
  errors,
}: any) {
  return (
    <form
      onSubmit={handleSubmit(onSubmitOTP)}
      className="w-full items-center flex flex-col justify-center "
    >
      <div className="flex flex-col items-center gap-4">
        <Controller
          name="otp"
          control={control}
          rules={{
            required: "Debes ingresar el código OTP",
            minLength: {
              value: 6,
              message: "El código OTP debe tener 6 dígitos",
            },
            maxLength: {
              value: 6,
              message: "El código OTP debe tener exactamente 6 dígitos",
            },
          }}
          render={({ field }) => (
            <InputOTPCode
              value={field.value}
              onChange={(val: string) => {
                field.onChange(val);
                if (val.length === 6) {
                  // Disparar automáticamente submit
                  handleSubmit(onSubmitOTP)();
                }
              }}
            />
          )}
        />
        <FieldError errors={errors} field="otp" />
      </div>

      {/*<div className="w-full mt-3">
        <Button
          type="submit"
          className="w-full bg-persian-green cursor-pointer"
          size="sm"
        >
          Verificar código
        </Button>
      </div>*/}
    </form>
  );
}
