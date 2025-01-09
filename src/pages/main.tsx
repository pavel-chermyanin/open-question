import {Outlet} from "react-router-dom";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/app/store.ts";
import {useEffect} from "react";
import {getMe} from "@/entities/user/user.actions.ts";
import {Header} from "@/widgets/header/header.tsx";


export const MainPage = () => {
  const dispatch = useDispatch<AppDispatch>();


  useEffect(() => {

  }, []);

  // useEffect(() => {
  //
  //
  // }, [activeClient]);


  return (
    <div>
      <Header/>
      <Outlet/> {/* Здесь будут отображаться дочерние маршруты */}
    </div>
  );
};

