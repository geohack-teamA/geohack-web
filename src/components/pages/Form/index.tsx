import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
} from '@chakra-ui/react';
import { Field, Formik, Form as FormikForm } from 'formik';
import type { FieldInputProps, FormikProps } from 'formik';
import React from 'react';
import useHooks, { FormValue } from './hooks';
import { SwiperSlide } from 'swiper/react';
import Swiper from 'react-id-swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Icon from '@geohack/components/ui/Icon';
import Radio from './Items/radio';

export type Props = {
  className?: string;
};

const Form: React.FC<Props> = ({ className }) => {
  const {
    handleGeoLocationGet,
    handleNextSlide,
    handlePrevSlide,
    handleSubmit,
    slideIndex,
    slideRef,
    totalSlides,
    validationSchema,
  } = useHooks();

  return (
    <Box>
      <Formik<FormValue>
        initialValues={{
          floorLevel: 0,
          disabilityOnFamily: false,
          hasSafeRelative: false,
          enoughStock: false,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
          <FormikForm>
            <Box>
              <Swiper
                ref={slideRef}
                pagination={{
                  type: `progressbar`,
                  el: `.swiper-pagination`,
                  clickable: true,
                }}
                slidesPerView={1}
              >
                <SwiperSlide>
                  <Box m={20}>
                    <Flex flexDirection="column" alignItems="center">
                      <Box m={5}>
                        <Text align="center">
                          以下の「現在地を取得」をクリックして、あなたの家が安全かどうか確認しましょう。
                        </Text>
                      </Box>
                      <Button
                        leftIcon={<Icon icon="location" />}
                        type="button"
                        onClick={handleGeoLocationGet}
                      >
                        現在地を取得
                      </Button>
                    </Flex>
                  </Box>
                </SwiperSlide>
                <SwiperSlide>
                  <Box m={20}>
                    <Field name="floorLevel">
                      {({
                        field,
                        form,
                      }: {
                        field: FieldInputProps<FormValue['floorLevel']>;
                        form: FormikProps<FormValue['floorLevel']>;
                      }) => (
                        <FormControl>
                          <FormLabel htmlFor="floorLevel">
                            <Text>階数</Text>
                          </FormLabel>
                          <Input
                            id="floorLevel"
                            placeholder="1"
                            min={-5}
                            onChange={field.onChange}
                            value={field.value}
                            type="number"
                            max={100}
                          />
                          {/* <NumberInput
                            id="floorLevel"
                            placeholder="1"
                            min={-5}
                            onChange={field.onChange}
                            value={field.value}
                            max={100}
                          >
                            <NumberInputField {...field} />
                            <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                              </NumberInputStepper>
                            </NumberInput> */}
                          <FormErrorMessage>{form.errors}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Box>
                </SwiperSlide>

                <SwiperSlide>
                  <Box m={20}>
                    <Flex
                      flexDirection="column"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Box m={5}>
                        <Text align="center">
                          次に、あなたの家族の状況を確認しましょう。
                          家族で避難に時間がかかる人はいますか？
                        </Text>
                      </Box>
                      <Field name="disabilityOnFamily">
                        {({
                          field,
                          form,
                        }: {
                          field: FieldInputProps<
                            FormValue['disabilityOnFamily']
                          >;
                          form: FormikProps<FormValue['disabilityOnFamily']>;
                        }) => (
                          <FormControl>
                            <Flex alignItems="center" justifyContent="center">
                              {/* <FormLabel htmlFor="disabilityOnFamily"> */}
                              <Box m={2}>
                                <Text align="center">はい</Text>
                              </Box>
                              {/* </FormLabel> */}
                              <Checkbox
                                defaultChecked={field.checked}
                                checked={field.checked}
                                onChange={field.onChange}
                                id="disabilityOnFamily"
                              />
                            </Flex>
                            {/* <Radio
                              name="disabilityOnFamily"
                              options={[`checked`, `unchecked`]}
                              onChange={(e) => console.log(e)}
                            /> */}
                            <FormErrorMessage>{form.errors}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Flex>
                    <Flex
                      flexDirection="column"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Box m={5}>
                        <Text align="center">
                          安全な場所に住んでいて、身を寄せられる親戚・知人はしますか？
                        </Text>
                      </Box>
                      <Field name="hasSafeRelative">
                        {({
                          field,
                          form,
                        }: {
                          field: FieldInputProps<FormValue['hasSafeRelative']>;
                          form: FormikProps<FormValue['hasSafeRelative']>;
                        }) => (
                          <FormControl>
                            <Flex alignItems="center" justifyContent="center">
                              {/* <FormLabel htmlFor="hasSafeRelative"> */}
                              <Box m={2}>
                                <Text align="center">はい</Text>
                              </Box>
                              {/* </FormLabel> */}
                              <Checkbox
                                defaultChecked={field.checked}
                                checked={field.checked}
                                onChange={field.onChange}
                                id="hasSafeRelative"
                              />
                            </Flex>
                            {/* <Radio
                              name="hasSafeRelative"
                              options={[`checked`, `unchecked`]}
                              onChange={(e) => console.log(e)}
                            /> */}
                            <FormErrorMessage>{form.errors}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Flex>
                  </Box>
                </SwiperSlide>
                <SwiperSlide>
                  <Box m={20}>
                    <Flex
                      flexDirection="column"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Box m={5}>
                        <Text align="center">
                          最後に、備蓄の確認をしましょう。浸水しても水が引くまで待てるほど、水・食料の蓄えがありますか？
                        </Text>
                      </Box>
                      <Field name="enoughStock">
                        {({
                          field,
                          form,
                        }: {
                          field: FieldInputProps<FormValue['enoughStock']>;
                          form: FormikProps<FormValue['enoughStock']>;
                        }) => (
                          <FormControl>
                            {/* <FormLabel htmlFor="enoughStock"></FormLabel> */}
                            <Flex alignItems="center" justifyContent="center">
                              <Box m={2}>
                                <Text align="center">はい</Text>
                              </Box>
                              <Checkbox
                                defaultChecked={field.checked}
                                checked={field.checked}
                                onChange={field.onChange}
                                id="enoughStock"
                              />
                            </Flex>
                            <FormErrorMessage>{form.errors}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Box m={4}>
                        <Button type="submit">送信</Button>
                      </Box>
                    </Flex>
                  </Box>
                </SwiperSlide>
              </Swiper>
            </Box>
            <Flex justify="center" alignItems={`center`}>
              <Box m={10}>
                <Button
                  type="button"
                  onClick={handlePrevSlide}
                  leftIcon={<Icon icon="arrowLeft" />}
                >
                  前へ
                </Button>
              </Box>
              <Text>{`${slideIndex}/${totalSlides() ?? `-`}`}</Text>
              <Box m={10}>
                <Button
                  type="button"
                  onClick={handleNextSlide}
                  rightIcon={<Icon icon="arrowRight" />}
                >
                  次へ
                </Button>
              </Box>
            </Flex>
          </FormikForm>
        )}
      </Formik>
    </Box>
  );
};

export default Form;
