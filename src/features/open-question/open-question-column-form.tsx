import {FormProvider, useForm} from "react-hook-form";
import {Cell, Column, HeaderCell, Table} from "rsuite-table";
import {useDispatch, useSelector} from "react-redux";
import {
  createCodes,
  getPreviewData,
  getPrice, postCodingJob,
  selectCalculatedPrice,
  selectFileId,
  selectPreview,
  setSessionStatus
} from "@/entities/open-question";
import {useEffect, useState} from "react";
import {AppDispatch} from "@/app/store.ts";
import {Select} from "@/shared/ui/select/select.tsx";
import {Button, CustomProvider, Message} from "rsuite";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {resetPrice} from "@/entities/open-question/open-question.slice.ts";
import {ruRU} from "rsuite/locales";
import {SessionStatus} from "@/app/types/session.types.ts";
import {CustomCheckPicker} from "@/shared/ui/check-picker/custom-check-picker.tsx";
import {DrawerSelectWrapper} from "@/shared/ui/drawer-select-wrapper.tsx";
import {selectLoadingPreview} from "@/entities/open-question/open-question.selectors.ts";

export const loginSchema = yup.object().shape({
  sheet: yup.string().required('Поле обязательное'), // Add the password field
  codes_sheet: yup.string().required('Поле обязательное'), // Add the password field
  create_codes: yup.array().of(yup.string()), // Теперь это массив строк

});


export const OpenQuestionColumnForm = () => {
  const file_id = useSelector(selectFileId)
  const dispatch = useDispatch<AppDispatch>()
  const [loadingCreateCode, setLoadingCreateCode] = useState(false)
  const preview = useSelector(selectPreview)
  const loadingPreview = useSelector(selectLoadingPreview)
  const [dataCreateCodes, setDataCreateCodes] = useState<{ label: string, value: string }[]>()
  const [previewData, setPreviewData] = useState<{ label: string, value: string }[]>()

  useEffect(() => {
    // console.log(preview)
    setDataCreateCodes(preview?.questions_and_answers ? Object.entries(preview?.questions_and_answers)
      .map(([key, value]) => ({
        label: value,
        value: JSON.stringify({
          question_name: key,
          question_full: value
        }),
      })) : [])

    // console.log(preview)
    setPreviewData(preview?.preview_data ? Object.keys(preview?.preview_data).map(item => ({
      label: item,
      value: item
    })) : [])
  }, [preview]);
  // console.log(dataCreateCodes)
  const methods = useForm({
    resolver: yupResolver(loginSchema),
  })
  const price = useSelector(selectCalculatedPrice)
  const questionIndex = methods.watch('sheet')
  const listIndex = methods.watch('codes_sheet')
  // const create_codes = methods.watch('create_codes')

  // const selectData = preview?.headers.slice(1).map((item, index) => ({label: item, value: index})) ?? []
  // const previewData = preview?.preview_data ? Object.keys(preview?.preview_data).map(item => ({
  //   label: item,
  //   value: item.slice(0, item.indexOf(' ')).replace('.', '')
  // })) : []

  useEffect(() => {
    if (file_id) {
      dispatch(getPreviewData(file_id))
    }

  }, [file_id]);

  useEffect(() => {
    dispatch(resetPrice())
  }, [questionIndex, listIndex]);

  const calculatePrice = async (data: { sheet: string }) => {
    dispatch(getPrice({session_id: file_id!, list_name: data.sheet.slice(0, data.sheet.indexOf(' ')).replace('.', '')}))
  }

  const submitAutocoding = (data: { sheet: string, codes_sheet: string }) => {
    // console.log(data)
    // return
    if (preview?.codes) {
      // const codes_sheet = Object.keys(preview?.codes)[+data.codes_sheet]
      dispatch(postCodingJob({sheet: data.sheet.slice(0, data.sheet.indexOf(' ')).replace('.', ''),codes_sheet: data.codes_sheet, session_id: file_id!}))
      dispatch(setSessionStatus(SessionStatus.AUTOCODING));
    }
  }

  const onCreateCode = () => {
    const create_codes = methods.getValues('create_codes')
    const converted = (create_codes as unknown as string[]).reduce((acc, cur) => {
      const parsedItem = JSON.parse(cur) as { question_name: string, question_full: string }
      acc.question_name.push(parsedItem.question_name)
      acc.question_full.push(parsedItem.question_full)
      // console.log(parsedItem)

      return acc

    }, {question_name: [], question_full: []} as Record<string, string[]>)


    if (converted.question_name.length) {
      setLoadingCreateCode(true)
      dispatch(createCodes({
        session_id: file_id!,
        question_name: converted.question_name,
        question_full: converted.question_full,
      })).then(() => {
        // methods.resetField('create_codes')
        setLoadingCreateCode(false)
        dispatch(getPreviewData(file_id!))
      })
    }
    // console.log(data)
  }

  return (
    <FormProvider {...methods}>
      <div className={'grid grid-cols-2 gap-4 mt-5'}>
        <div>
          <CustomProvider locale={ruRU}>
            <Table
              bordered
              height={200}
              data={(preview?.codes && (listIndex || +listIndex === 0)) ? Object.entries(preview?.codes[listIndex]?.codes).map(([code, answer]) => ({
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
            loading={loadingPreview}
            // onChangeOutside={(value) => setPrice('')}
            name={'codes_sheet'}
            data={preview?.codes ? Object.keys(preview?.codes).map((item) => ({
              label: item + `${preview?.codes?.[item]?.children.length ?  ` - создан на основе(${(preview?.codes[item].children as string[]).join(', ')})`: ''} `,
              value: item
            })) : []}/>
          <div className={''}>
            <label className={''}>Добавить коды</label>
            <DrawerSelectWrapper>
              <CustomCheckPicker
                name={'create_codes'}
                data={dataCreateCodes}/>
            </DrawerSelectWrapper>
            <Button loading={loadingCreateCode} onClick={onCreateCode} className={'mt-2'}>Создать код</Button>

          </div>

        </div>
        <div>

          <Table
            bordered
            height={200}
            data={preview?.preview_data?.[questionIndex]?.map(item => ({'ответ': item})) ?? []}
          >
            <Column key={'ответ'} flexGrow={1}>
              <HeaderCell>{'ответ'}</HeaderCell>
              <Cell dataKey={'ответ'}/>
            </Column>

          </Table>

          <label className={''}>Ответы на вопросы</label>
          <Select
            loading={loadingPreview}
            name={'sheet'}
            data={previewData ?? []}
          />
        </div>
      </div>
      <div className={'grid grid-cols-2 gap-4 mt-5'}>
        <Button
          className={'self-start'}
          onClick={methods.handleSubmit(calculatePrice)}
        >Рассчитать стоимость</Button>
        {!!price && (
          <div className={'grid gap-2'}>
            <Message className={''}>
              <strong>Цена!</strong> {price ? price : ''}
            </Message>
            <Button
              onClick={methods.handleSubmit(submitAutocoding)}
            >Запустить кодировку</Button>
          </div>

        )}
      </div>

    </FormProvider>
  )
}