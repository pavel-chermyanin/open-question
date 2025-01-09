import cl from "classnames";
import React from "react";
import {useFormContext, Controller} from "react-hook-form";
import {Input as InputRsuite, InputGroup} from "rsuite";
import styles from "./input.module.scss";
import {useErrorInputFade} from "@/shared/hooks/use-error-input-fade.tsx";

type CustomInputProps = {
  name: string;
  type?: string;
  placeholder?: string;
  className?: string;
  after?: () => React.ReactNode;
  as?: React.ElementType;
  min?: number
  max?: number
  size?: 'lg' | 'md' | 'sm' | 'xs'
  disabled?:boolean
};

export const Input: React.FC<CustomInputProps> = (
  {

    as = 'input',
    name,
    type = "text",
    placeholder,
    className,
    after,
    min = 0,
    max = 10,
    size,
    disabled = false
  }
) => {
  const {control} = useFormContext();

  const {isFadingOut, errorMessage} = useErrorInputFade(name); // Используйте хук

  // console.log(errorMessage)
  return (
    <div className={cl(styles.inputWrapper, className)}>
      <Controller
        name={name}
        control={control}
        render={({field}) => (
          <InputGroup className={cl(styles.inputGroup)}>
            <InputRsuite
              disabled={disabled}
              size={size}
              min={min}
              max={max}
              as={as}
              {...field}
              type={type}
              placeholder={placeholder}
              className={cl(styles.input)}
              onChange={(value) => field.onChange(value)}
            />
            {after && after()}
          </InputGroup>
        )}
      />
      <div className={cl(styles.inputError, {
        [styles.hasError]: !!errorMessage,
        [styles.fadeOut]: isFadingOut,
      })}>
        {errorMessage}
      </div>
    </div>
  );
};
