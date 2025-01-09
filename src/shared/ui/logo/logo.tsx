import logo from "./romir_logo_white_all.svg";

export const Logo = () => {
  return (
    <img className={'object-contain'} src={logo} alt={'Логотип'} width={70} height={30}/>
  )
}