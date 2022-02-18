import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
} from '@chakra-ui/react';
import { Field, Formik, FormikHelpers, Form as FormikForm } from 'formik';
import type { FieldInputProps, FormikProps } from 'formik';
import React, { useCallback, useRef, useState } from 'react';
import useHooks from './hooks';
import * as Yup from 'yup';
import { SwiperSlide } from 'swiper/react';
import Swiper from 'react-id-swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
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
    async (values: FormValue, helpers: FormikHelpers<FormValue>) => {
      if (!currentLocation) {
        alert(`location must be turned on`);
        return;
      }
      const reqObj = {
        lat: currentLocation?.lat,
        lng: currentLocation?.lng,
        currentLevel: values.floorLevel,
        hasDifficultFamily: values.disabilityOnFamily,
        hasEnoughStock: values.enoughStock,
      };
      const res = await fetch(`http://localhost:8000/analyze`, {
        method: `POST`,
        headers: {
          'Content-Type': `application/json`,
        },
        body: JSON.stringify(reqObj),
      });
      const result = res.json();
    },
    [],
  );
  const [slideIndex, setSlideIndex] = useState(1);

  const ref = useRef(null);
  const updateSlideIndex = () => {
    if (!ref.current) return;
    const index: number = (ref.current as any).swiper.activeIndex ?? 0;
    setSlideIndex(index + 1);
  };

  const handleNextSlide = () => {
    if (!ref.current) return;
    (ref.current as any).swiper.slideNext();
    updateSlideIndex();
  };

  const handlePrevSlide = () => {
    if (!ref.current) return;
    (ref.current as any).swiper.slidePrev();
    updateSlideIndex();
  };

  const totalSlides = () => {
    if (!ref.current) return;
    const slides: any[] = (ref.current as any).swiper.slides;
    return slides.length ?? 0;
  };

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
        {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
          <FormikForm>
            <Swiper
              ref={ref}
              pagination={{
                type: `progressbar`,
                el: `.swiper-pagination`,
                clickable: true,
              }}
              slidesPerView={1}
            >
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
                        checked={field.checked}
                        onChange={field.onChange}
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
                        checked={field.checked}
                        onChange={field.onChange}
                        id="enoughStock"
                      />
                      <FormErrorMessage>{form.errors}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Button type="submit">送信</Button>
              </SwiperSlide>
            </Swiper>
            <Flex justify="center">
              <Icon icon="arrowLeft" m={20} onClick={handlePrevSlide} />
              <Text>{`${slideIndex}/${totalSlides()}`}</Text>
              <Icon icon="arrowRight" m={20} onClick={handleNextSlide} />
            </Flex>
          </FormikForm>
        )}
      </Formik>
    </Box>
  );
};

export default Form;
