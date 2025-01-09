import React from "react";

import {Nav} from "rsuite";
import {RouteTypes} from "@/app/types/routes.types.ts";
import styles from './navbar.module.scss'


export const Navbar: React.FC = () => {


  return (
    <>

      <Nav

        className={styles.nav_item_wrapper} >
        <Nav.Item

          className={styles.nav_item}
          eventKey={RouteTypes.HOME}>
          Кодировка
        </Nav.Item>
        {/*<Nav.Item  eventKey={Routing.REPORTS}>Отчеты</Nav.Item>*/}
      </Nav>
    </>
  );
};
