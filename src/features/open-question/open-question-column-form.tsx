import {FormProvider, useForm} from "react-hook-form";
import {Cell, Column, HeaderCell, Table} from "rsuite-table";
import {useDispatch, useSelector} from "react-redux";
import {
  getPreviewData,
  getPrice, postCodingJob,
  selectCalculatedPrice,
  selectFileId,
  selectPreview,
  setSessionStatus
} from "@/entities/open-question";
import {useEffect} from "react";
import {AppDispatch} from "@/app/store.ts";
import {Select} from "@/shared/ui/select/select.tsx";
import {Button, CustomProvider, Message} from "rsuite";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {resetPrice} from "@/entities/open-question/open-question.slice.ts";
import {ruRU} from "rsuite/locales";
import {SessionStatus} from "@/app/types/session.types.ts";

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

  // const selectData = preview?.headers.slice(1).map((item, index) => ({label: item, value: index})) ?? []
  const previewData = preview?.preview_data ? Object.keys(preview?.preview_data).map(item => ({
    label: item,
    value: item
  })) : []

  useEffect(() => {
    if (file_id) {
      dispatch(getPreviewData(file_id))
    }

  }, [file_id]);

  useEffect(() => {
    dispatch(resetPrice())
  }, [questionIndex, listIndex]);

  const calculatePrice = async (data: { sheet: string }) => {
    dispatch(getPrice({session_id: file_id!, list_name: data.sheet.slice(0, data.sheet.indexOf(' '))}))
  }

  const submitAutocoding = (data: { sheet: string, codes_sheet: string }) => {
    if (preview?.codes) {
      const codes_sheet = Object.keys(preview?.codes)[+data.codes_sheet]
      dispatch(postCodingJob({sheet: data.sheet, codes_sheet, session_id: file_id!}))
      dispatch(setSessionStatus(SessionStatus.AUTOCODING));
    }
  }

  return (
    <FormProvider {...methods}>
      <div className={'grid grid-cols-2 gap-4 mt-5'}>
        <div>
          <CustomProvider locale={ruRU}>
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
              <Column key={'код'} flexGrow={1}>
                <HeaderCell>{'код'}</HeaderCell>
                <Cell dataKey={'код'}/>
              </Column>
              <Column key={'ответ'} flexGrow={5}>
                <HeaderCell>{'ответ'}</HeaderCell>
                <Cell dataKey={'ответ'}/>
              </Column>

            </Table>

          </CustomProvider>
          <label className={''}>Коды</label>
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
            // data={preview?.preview?.slice(1)?.[+questionIndex]?.map(item => ({'ответ': item})) ?? []}
            data={preview?.preview_data?.[questionIndex]?.map(item => ({'ответ': item})) ?? []}
          >
            <Column key={'ответ'} flexGrow={1}>
              <HeaderCell>{'ответ'}</HeaderCell>
              <Cell dataKey={'ответ'}/>
            </Column>
            {/*// ))}*/}

          </Table>

          <label className={''}>Ответы на вопросы</label>
          <Select
            // onChangeOutside={(value) => setPrice('')}
            name={'sheet'}
            // data={selectData ?? []}
            data={previewData ?? []}
          />
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
              // disabled={true}
              // disabled={openQuestionSessionStatus === OpenQuestionSessionStatus.AUTOCODING}
              // className={'mt-4'}
              onClick={methods.handleSubmit(submitAutocoding)}
            >Запустить кодировку</Button>
          </div>

        )}
      </div>

    </FormProvider>
  )
}