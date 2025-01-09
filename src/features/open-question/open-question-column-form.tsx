import {FormProvider, useForm} from "react-hook-form";
import {Cell, Column, HeaderCell, Table} from "rsuite-table";
import {useDispatch, useSelector} from "react-redux";
import {getPreviewData, getPrice, selectCalculatedPrice, selectFileId, selectPreview} from "@/entities/open-question";
import {useEffect} from "react";
import {AppDispatch} from "@/app/store.ts";
import {Select} from "@/shared/ui/select/select.tsx";
import {Button, Message} from "rsuite";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {resetPrice} from "@/entities/open-question/open-question.slice.ts";

export const loginSchema = yup.object().shape({
  // system_prompt: yup.string().required("Промпт обязателен"),
  sheet: yup.string().required('Поле обязательное'), // Add the password field
  codes_sheet: yup.string().required('Поле обязательное'), // Add the password field
});


export const OpenQuestionColumnForm = () => {
  const file_id = useSelector(selectFileId)
  const dispatch = useDispatch<AppDispatch>()
  const methods = useForm({
    resolver: yupResolver(loginSchema),
  })
  const preview = useSelector(selectPreview)
  const price = useSelector(selectCalculatedPrice)
  const questionIndex = methods.watch('sheet')
  const listIndex = methods.watch('codes_sheet')

  const selectData = preview?.headers.slice(1).map((item, index) => ({label: item, value: index})) ?? []

  useEffect(() => {
    if (file_id) {
      dispatch(getPreviewData(file_id))
    }

  }, [file_id]);

  useEffect(() => {
    dispatch(resetPrice())
  }, [questionIndex, listIndex]);

  const calculatePrice = async (data: { sheet: string }) => {
    dispatch(getPrice({id: file_id, list_name: preview?.sheets?.[+data.sheet]}))
  }

  // const convertedData = !!preview?.codes && Object.entries(Object.values(preview?.codes)[listIndex])
  return (
    <FormProvider {...methods}>
      <div className={'grid grid-cols-2 gap-4 mt-5'}>
        <div>
          <Table
            bordered
            height={200}
            data={(preview?.codes && (listIndex || +listIndex === 0)) ? Object.entries(Object.values(preview?.codes)[+listIndex]).map(([code, answer]) => ({
              'код': code,
              'ответ': answer
            })) : []}
            onRowClick={(rowData) => {
              console.log(rowData);
            }}
          >
            <Column key={'код'} width={100}>
              <HeaderCell>{'код'}</HeaderCell>
              <Cell dataKey={'код'}/>
            </Column>
            <Column key={'ответ'} flexGrow={1}>
              <HeaderCell>{'ответ'}</HeaderCell>
              <Cell dataKey={'ответ'}/>
            </Column>

          </Table>
          <label className={''}>Листы</label>
          <Select
            // onChangeOutside={(value) => setPrice('')}
            name={'codes_sheet'}
            data={preview?.codes ? Object.keys(preview?.codes).map((item, index) => ({
              label: item,
              value: index
            })) : []}/>
        </div>
        <div>

          <Table
            bordered
            height={200}
            data={preview?.preview?.slice(1)?.[+questionIndex]?.map(item => ({'ответ': item})) ?? []}
          >
            <Column key={'ответ'} flexGrow={1}>
              <HeaderCell>{'ответ'}</HeaderCell>
              <Cell dataKey={'ответ'}/>
            </Column>
            {/*// ))}*/}

          </Table>

          <label className={''}>Ответы</label>
          <Select
            // onChangeOutside={(value) => setPrice('')}
            name={'sheet'} data={selectData ?? []}/>
        </div>
      </div>
      <div className={'grid grid-cols-2 gap-4 mt-5'}>
        {/*{(!!questionIndex || questionIndex === 0) && (!!listIndex || listIndex === 0) &&*/}
        <Button
          className={'self-start'}
          onClick={methods.handleSubmit(calculatePrice)}
        >Рассчитать стоимость</Button>
        {/*// }*/}
        {!!price && (
          <div className={'grid gap-2'}>
            <Message className={''}>
              <strong>Цена!</strong> {price ? price : ''}
            </Message>
            {/*<Input name={'system_prompt'} as={'textarea'} placeholder={'Введите промпт'}/>*/}
            <Button
              disabled={true}
              // disabled={openQuestionSessionStatus === OpenQuestionSessionStatus.AUTOCODING}
              // className={'mt-4'}
              // onClick={methods.handleSubmit(submitAutocoding)}
            >Запустить кодировку</Button>
          </div>

        )}
      </div>

    </FormProvider>
  )
}