import {Header as HeaderRsuite} from "rsuite";
import {Logo} from "@/shared/ui/logo/logo.tsx";
import {Navbar} from "./navbar";
import {UserInfo} from "./user-info";
import {LogoutBtn} from "@/features/auth";
import styles from './header.module.scss'
import React, {useEffect, useState} from "react";
import * as url from "node:url";

export const Header = () => {
  const [imageUrls, setImageUrls] = useState<string>(''); // Состояние для хранения URL изображений


  return (
    <HeaderRsuite

    >
      <div className={styles.wrapper}>

          <Logo />
          <Navbar />
          <UserInfo className={'ml-auto text-xs'} />
          <LogoutBtn />
      </div>
    </HeaderRsuite>

  )
}