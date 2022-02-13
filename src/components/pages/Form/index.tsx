import {
  Box,
  Button,
  Checkbox,
  Flex,
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
                  <Checkbox defaultChecked={field.checked} id="enoughStock" />
                  <FormErrorMessage>{form.errors}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button type="submit">送信</Button>
          </FormikForm>
        )}
      </Formik>
    </Box>
  );
};

export default Form;
