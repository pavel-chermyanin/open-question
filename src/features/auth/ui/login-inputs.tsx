import EyeIcon from "@rsuite/icons/legacy/Eye";
import EyeSlashIcon from "@rsuite/icons/legacy/EyeSlash";
import {useState} from "react";
import {InputGroup} from "rsuite";
import {Input} from "@/shared/ui/input/input.tsx";




export const LoginInputs = () => {
  const [visible, setVisible] = useState(false);
  const handleChange = () => {
    setVisible(!visible);
  };
  return (
    <div className={''}>
      <div className={''}>
        <label className={'mb-2 block'}>Логин</label>
        <Input name={"username"} type={"text"}/>
      </div>
      <div className={''}>
        <label className={'mb-2 block'}>Пароль</label>
        <Input
          name={"password"}
          type={visible ? "text" : "password"}
          after={() => (
            <InputGroup.Button onClick={handleChange}>
              {visible ? <EyeIcon/> : <EyeSlashIcon/>}
            </InputGroup.Button>
          )}
        />
      </div>
    </div>
  )
}