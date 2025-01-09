import {useState} from "react";
import {COLORS} from "@/app/config/constants.ts";


export const useClientColors = () => {
  const [colors, setColors] = useState(COLORS)


  return colors
}