import React from "react";
import {Header} from "@/widgets/header/header.tsx";
import {Outlet} from "react-router-dom";
import {SidebarAutoCoding} from "@/widgets/sidebar-autocoding.tsx";


export const HomePage: React.FC = () => {


  return (
    <div className={'flex gap-4'}>
      <div className={'shrink-0'}>
        <SidebarAutoCoding/>
      </div>
      <Outlet/> {/* Здесь будут отображаться дочерние маршруты */}
    </div>
  );
};
