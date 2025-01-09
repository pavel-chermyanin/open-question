import React, {useEffect, useState} from "react";
import {Controller, useFormContext, ControllerRenderProps} from "react-hook-form";
import {TagPicker, TagPickerProps} from "rsuite";
import cl from "classnames";
import styles from "./tag-picker.module.scss";
import {useErrorInputFade} from "@/shared/hooks/use-error-input-fade.tsx";

interface CustomTagPickerProps {
  name: string;
  data: any[];
  value?: any[];
  onChangeOutside?: (selectedValues: any[]) => void;
  placeholder?: string;
  className?: string;
  searchable?: boolean;
  appearance?: "default" | "subtle";
  disabled?: boolean;
  renderMenuItem?: TagPickerProps["renderMenuItem"];
  container?: () => HTMLElement;
  renderValue?: TagPickerProps["renderValue"];
  disabledItemValues?: any[];
}

export const CustomTagPicker: React.FC<CustomTagPickerProps> = (
  {
    name,
    data,
    value,
    onChangeOutside,
    placeholder = "Select tags",
    className,
    searchable = false,
    appearance = "subtle",
    disabled,
    renderMenuItem,
    container,
    renderValue,
    disabledItemValues,
  }
) => {
  const {control} = useFormContext();
  const {isFadingOut, errorMessage} = useErrorInputFade(name);
  const [placement, setPlacement] = useState<TagPickerProps["placement"]>("bottom");

  const handleOpen = () => {
    const rect = container?.().getBoundingClientRect();
    const bottomDistance = window.innerHeight - rect?.bottom!;

    if (bottomDistance < 320) {
      setPlacement("top");
    } else {
      setPlacement("bottom");
    }
  };

  return (
    <div className={cl(styles.inputWrapper, className)}>
      <Controller
        name={name}
        control={control}
        render={({field}: { field: ControllerRenderProps }) => (
          <>
            {/* Скрытый input для управления фокусом */}
            <input {...field} type="text" style={{position: "absolute", opacity: 0, pointerEvents: "none"}}/>

            <TagPicker
              onOpen={handleOpen}
              placement={placement}

              className={cl(styles.select, {[styles.hasError]: !!errorMessage}, ['w-full'])}
              renderValue={renderValue}
              disabledItemValues={disabledItemValues}
              data={data}
              value={value}
              disabled={disabled}
              onChange={(selectedValues) => {
                field.onChange(selectedValues);
                onChangeOutside && onChangeOutside(selectedValues);
              }}
              searchable={searchable}
              appearance={appearance}
              placeholder={placeholder}
              renderMenuItem={renderMenuItem}
              container={container}
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
