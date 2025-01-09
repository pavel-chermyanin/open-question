import React from "react";
import {Controller, useFormContext} from "react-hook-form";
import {Toggle as ToggleRsuite} from "rsuite";

interface CustomToggleProps {
  name: string;
  disabled?: boolean
  checkedChildren?: React.ReactNode; // Тип для дочерних элементов
  unCheckedChildren?: React.ReactNode; // Тип для дочерних элементов
  className?: string;
  size?: "lg" | "md" | "sm"; // Уточняем доступные размеры
  defaultValue?: boolean;
  onChangeOutside?: (checked: boolean) => void; // Тип для внешнего обработчика
}

export const  Toggle: React.FC<CustomToggleProps> = (
  {
    name,
    disabled = false,
    checkedChildren = "Вкл",
    unCheckedChildren = "Выкл",
    className,
    size = "lg",
    onChangeOutside,
    defaultValue = true
  }
) => {
  const {control} = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({field}) => (
        <ToggleRsuite
          disabled={disabled}
          // defaultValue={defaultValue}
          // defaultChecked={defaultValue}
          {...field}
          size={size}
          checkedChildren={checkedChildren}
          unCheckedChildren={unCheckedChildren}
          checked={field.value ?? defaultValue}
          onChange={() => {
            // Обновляем значение поля формы
            field.onChange(!field.value);
            // Вызываем внешний обработчик onChange, если он предоставлен
            if (onChangeOutside) {
              onChangeOutside(!field.value);
            }
          }}
          className={className}
        />
      )}
    />
  );
};

