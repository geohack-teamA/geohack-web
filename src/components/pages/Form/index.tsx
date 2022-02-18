import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { Field, Formik, FormikHelpers, Form as FormikForm } from 'formik';
import type { FieldInputProps, FormikProps } from 'formik';
import React, { useCallback } from 'react';
import useHooks from './hooks';
import * as Yup from 'yup';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation, Pagination } from 'swiper';
import Icon from '@geohack/components/ui/Icon';

export type Props = {
  className?: string;
};

type FormValue = {
  floorLevel: number;
  disabilityOnFamily: boolean;
  enoughStock: boolean;
};

const Form: React.FC<Props> = ({ className }) => {
  const { getGeoLocation, currentLocation } = useHooks();
  const validationSchema = Yup.object({
    floorLevel: Yup.number().required(`Required`),
    disabilityOnFamily: Yup.bool().required(`requireed`),
    enoughStock: Yup.bool().required(`required`),
  });
  const handleSubmit = useCallback(
    (values: FormValue, helpers: FormikHelpers<FormValue>) => {
      setTimeout(() => {
        console.log(`submit----`, values);
      }, 1000);
    },
    [],
  );
  return (
    <Box>
      <Formik<FormValue>
        initialValues={{
          floorLevel: 0,
          disabilityOnFamily: false,
          enoughStock: false,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <FormikForm>
            <Swiper
              pagination={{ type: `progressbar` }}
              slidesPerView={1}
              onSlideChange={() => console.log(`slide change`)}
              onSwiper={(swiper) => console.log(swiper)}
              modules={[Pagination, Navigation]}
            >
              <Icon icon="arrowLeft" m={10} />
              <SwiperSlide>
                <Field name="floorLevel">
                  {({
                    field,
                    form,
                  }: {
                    field: FieldInputProps<FormValue['floorLevel']>;
                    form: FormikProps<FormValue['floorLevel']>;
                  }) => (
                    <FormControl>
                      <FormLabel htmlFor="floorLevel">階数</FormLabel>
                      <Input {...field} id="floorLevel" placeholder="1" />
                      <FormErrorMessage>{form.errors}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </SwiperSlide>
              <SwiperSlide>
                <Field name="disabilityOnFamily">
                  {({
                    field,
                    form,
                  }: {
                    field: FieldInputProps<FormValue['disabilityOnFamily']>;
                    form: FormikProps<FormValue['disabilityOnFamily']>;
                  }) => (
                    <FormControl>
                      <FormLabel htmlFor="disabilityOnFamily">
                        家族で避難に時間がかかる人はいますか？
                      </FormLabel>
                      <Checkbox
                        defaultChecked={field.checked}
                        id="disabilityOnFamily"
                      />
                      <FormErrorMessage>{form.errors}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </SwiperSlide>
              <SwiperSlide>
                <Field name="enoughStock">
                  {({
                    field,
                    form,
                  }: {
                    field: FieldInputProps<FormValue['enoughStock']>;
                    form: FormikProps<FormValue['enoughStock']>;
                  }) => (
                    <FormControl>
                      <FormLabel htmlFor="enoughStock">
                        十分な備蓄がありますか？
                      </FormLabel>
                      <Checkbox
                        defaultChecked={field.checked}
                        id="enoughStock"
                      />
                      <FormErrorMessage>{form.errors}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Button type="submit">送信</Button>
              </SwiperSlide>
              <Icon icon="arrowRight" m={10} />
            </Swiper>
          </FormikForm>
        )}
      </Formik>
    </Box>
  );
};

export default Form;
