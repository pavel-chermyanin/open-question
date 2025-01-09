//@ts-nocheck

import React, {useState} from "react";
import {Controller, useFormContext, ControllerRenderProps} from "react-hook-form";
import {CheckPicker, CheckPickerProps} from "rsuite";
import cl from "classnames";
import styles from "./check-picker.module.scss";
import {useErrorInputFade} from "@/shared/hooks/use-error-input-fade.tsx";

interface DataItem {
  label: string; // Изменено на ReactNode для совместимости с CheckPicker
  value: string; // Значение остается строкой
}

interface CustomCheckPickerProps extends Omit<CheckPickerProps<DataItem>, "value"> {
  name: string;
  value: string[]; // Значения должны быть массивом строк
  onChangeOutside?: (selectedValues: string[]) => void;
}

export const CustomCheckPicker: React.FC<CustomCheckPickerProps> = (
  {
    name,
    data,
    value,
    onChangeOutside,
    className,
    container,
    disabledItemValues,
    renderValue,
    renderMenuItem,
    placeholder = "Select tags",
    ...restProps
  }
) => {
  const {control} = useFormContext();
  const {isFadingOut, errorMessage} = useErrorInputFade(name || "");
  const [placement, setPlacement] = useState<CheckPickerProps<DataItem>["placement"]>("bottom");

  const handleOpen = () => {
    const rect =
      typeof container === "function" ? container()?.getBoundingClientRect() : container?.getBoundingClientRect();

    const bottomDistance = window.innerHeight - (rect ? rect.bottom : 0);
    setPlacement(bottomDistance < 320 ? "top" : "bottom");
  };

  // Преобразование `value` из строк в массив объектов
  // const selectedValues = data.filter((item) => value.includes(item.value));

  return (
    <div className={cl(styles.inputWrapper, className)}>
      <Controller
        name={name}
        control={control}
        render={({field}: { field: ControllerRenderProps }) => (
          <>
            {/* Скрытый input для управления фокусом */}
            <input
              {...field}
              type="text"
              style={{position: "absolute", opacity: 0, pointerEvents: "none"}}
            />
            <CheckPicker
              {...restProps}
              onOpen={handleOpen}
              placement={placement}
              className={cl(styles.select, {[styles.hasError]: !!errorMessage}, ["w-full"])}
              renderValue={renderValue}
              disabledItemValues={disabledItemValues}
              data={data}
              value={value} // Передаем преобразованное значение
              onChange={(selectedItems) => {
                // console.log(selectedItems)
                // const newValues = selectedItems?.map((item) => item.value) || [];
                field.onChange(selectedItems); // Преобразуем обратно в массив строк
                onChangeOutside && onChangeOutside(selectedItems);
              }}
              placeholder={placeholder}
              renderMenuItem={renderMenuItem}
              container={container}
            />
            {errorMessage && (
              <div
                className={cl(styles.inputError, {
                  [styles.hasError]: !!errorMessage,
                  [styles.fadeOut]: isFadingOut,
                })}
              >
                {errorMessage}
              </div>
            )}
          </>
        )}
      />
    </div>
  );
};
