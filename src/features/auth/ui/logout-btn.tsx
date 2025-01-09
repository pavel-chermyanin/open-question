import {Button} from "rsuite";
import ExitIcon from '@rsuite/icons/Exit';
import {ACCESS_TOKEN} from "@/app/config/constants";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/app/store.ts";
import {setUser} from "@/entities/user";
import {RouteTypes} from "@/app/types/routes.types.ts";
import {useNavigate} from "react-router-dom";
import {setAuth} from "@/features/auth";
import styles from "./logout-btn.module.scss";



export const LogoutBtn = ({className}: { className?: string }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN)
    navigate(RouteTypes.AUTH,{})
    dispatch(setUser(null))
    dispatch(setAuth(false))

  }

  // const getHoverStyle = () => {
  //   const firstColor = activeClient?.header_colors ? activeClient?.header_colors.colors[0] : '#ff8200';
  //   const darkenedColor = createDarkenColor(firstColor, -40); // Затемняем цвет
  //
  //   return {
  //     background: `rgba(${parseInt(darkenedColor.slice(1, 3), 16)}, ${parseInt(darkenedColor.slice(3, 5), 16)}, ${parseInt(darkenedColor.slice(5, 7), 16)}, 0.5)`, // Прозрачность 0.5
  //     color: '#fff',
  //   };
  // };
  return (
    <Button

      appearance="subtle"
      // onMouseEnter={(e) => Object.assign(e.currentTarget.style, getHoverStyle())}
      // onMouseLeave={(e) => e.currentTarget.removeAttribute('style')}
      onClick={handleLogout}
      className={styles.button}
      endIcon={<ExitIcon/>}
    >
      Выйти из системы
    </Button>
  )
}