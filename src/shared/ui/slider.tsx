import React from "react";
import {Controller, useFormContext} from "react-hook-form";
import {Slider as SliderRsuite} from "rsuite";

type CustomSliderProps = {
  name: string;
  defaultValue?: number;
  onChangeOutside?: (value: number) => void;
  progress?: boolean;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
};

export const Slider: React.FC<CustomSliderProps> = (
  {
    name,
    defaultValue = 50,
    onChangeOutside,
    progress = true,
    min = 0,
    max = 100,
    step = 1,
    className,
  }
) => {
  const {control} = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({field}) => (
        <SliderRsuite
          graduated
          progress={progress}
          {...field}
          defaultValue={field.value || defaultValue}
          min={min}
          max={max}
          step={step}
          renderMark={(mark) => mark}
          onChange={(value: number) => {
            // Update the form field value
            field.onChange(value);
            // Call external onChange handler, if provided
            onChangeOutside && onChangeOutside(value);
          }}
          className={className}
        />
      )}
    />
  );
};
