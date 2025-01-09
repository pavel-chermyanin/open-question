import {FormProvider, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {loginSchema} from "@/features/auth/auth.schema.ts";
import {AuthForm} from "../auth.types";
import {Heading} from "@/shared/ui/heading.tsx";
import img from '../assets/roomir-logo.png'
import {Button, Message} from "rsuite";
import {LoginInputs} from "./login-inputs";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/app/store.ts";
import {login} from "../auth.actions";
import {useNavigate} from "react-router-dom";
import {RouteTypes} from "@/app/types/routes.types.ts";
import {ACCESS_TOKEN} from "@/app/config/constants.ts";


export const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  // const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated); // Отслеживаем isAuthenticated отдельно
  const loading = useSelector((state: RootState) => state.auth.loading); // Получаем данные из состояния
  const error = useSelector((state: RootState) => state.auth.error); // Получаем данные из состояния
  const navigate = useNavigate()


  // Используйте useForm с yupResolver для подключения схемы валидации
  const methods = useForm<AuthForm>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  });


  const message = error ? (
    <div className={'absolute top-10'}>
      <Message showIcon type={'error'} closable>
        <strong>error</strong>
      </Message>
    </div>
  ) : null;

  const onSubmit = async (form_data: AuthForm) => {
    try {
      const resultAction = await dispatch(login(form_data)).unwrap(); // Дождаться завершения экшена и получить ответ


      // Проверяем, есть ли в ответе токен
      if (resultAction?.access_token) {
        localStorage.setItem(ACCESS_TOKEN, resultAction.access_token); // Сохраняем токен в localStorage
        navigate(RouteTypes.HOME)
      }
    } catch (error) {
      console.error("Login failed: ", error); // Обрабатываем ошибку
    }
  };

  return (
    <FormProvider {...methods}>
      {message}
      <div className={''}>
        <div className={'text-center flex flex-col gap-6'}>
          <img className={'w-[200px]'} src={img} alt="logo"/>
          <Heading className={'text-gray-500'}>Войдите в систему</Heading>
          <LoginInputs/>
          <Button
            loading={loading}
            onClick={methods.handleSubmit(onSubmit)}
            className={''}
          >
            Войти
          </Button>
        </div>
      </div>
    </FormProvider>
  );

}