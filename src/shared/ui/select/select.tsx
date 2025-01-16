import React from "react";
import {useFormContext, Controller} from "react-hook-form";
import {SelectPicker} from "rsuite";
import cl from "classnames";
import styles from "./select.module.scss";
import {useErrorInputFade} from "@/shared/hooks/use-error-input-fade.tsx";
import {useDynamicPlacement} from "@/shared/hooks/use-dynamic-placement.tsx";

interface CustomSelectProps {
  name: string;
  data: { label: string; value: string | number }[];
  placeholder?: string;
  className?: string;
  loading?: boolean;
  onChangeOutside?: (value: string | string[]) => void;
  disabled?: boolean;
  container?: HTMLElement | (() => HTMLElement); // Изменяем тип на всегда возвращаемый HTMLElement
  cleanable?:boolean
  disabledItemValues?:string[]
}

export const Select: React.FC<CustomSelectProps> = (
  {
    name,
    data,
    placeholder,
    className,
    loading = false,
    onChangeOutside,
    disabled = false,
    container,
    cleanable= true,
    disabledItemValues
  }
) => {
  const {control} = useFormContext();
  const {isFadingOut, errorMessage} = useErrorInputFade(name);
  const { placement, inputRef } = useDynamicPlacement(); // Используем наш хук// Используйте хук
  return (
    <div ref={inputRef} className={cl(styles.inputWrapper, className)}>
      <Controller
        name={name}
        control={control}
        render={({field}) => (
          <>
            <SelectPicker
              disabledItemValues={disabledItemValues}
              cleanable={cleanable}
              placement={placement}
              container={typeof container === 'function' ? container() : container || document.body} // Гарантируем возврат HTMLElement
              disabled={disabled}
              loading={loading}
              data={data}
              placeholder={placeholder}
              className={cl(styles.select, {[styles.hasError]: !!errorMessage},['w-full'])}
              value={field.value}
              onChange={(selectedValue) => {
                field.onChange(selectedValue);
                if (onChangeOutside) {
                  onChangeOutside(selectedValue);
                }
              }}
            />
            {errorMessage && (
              <div className={cl(styles.inputError, {
                [styles.hasError]: !!errorMessage,
                [styles.fadeOut]: isFadingOut, // Применение класса fadeOut, если ошибка исчезает
              })}>
                {errorMessage}
              </div>
            )}
          </>
        )}
      />
    </div>
  );
};
