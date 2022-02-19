import {
  Box,
  HStack,
  RadioGroup,
  useRadio,
  useRadioGroup,
  UseRadioProps,
} from '@chakra-ui/react';
import React from 'react';

export type RadioCardProps = {
  className?: string;
  children?: React.ReactNode;
  radioProps?: UseRadioProps;
};

const RadioCard: React.FC<RadioCardProps> = ({
  className,
  children,
  radioProps,
}) => {
  const { getInputProps, getCheckboxProps } = useRadio(radioProps);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: `teal.600`,
          color: `white`,
          borderColor: `teal.600`,
        }}
        _focus={{
          boxShadow: `outline`,
        }}
        px={5}
        py={3}
      >
        {children}
      </Box>
    </Box>
  );
};

export type Props = {
  className?: string;
  name?: string;
  onChange?: (e: any) => void;
  options: string[];
  defaultValue?: string;
};

const Radio: React.FC<Props> = ({
  className,
  defaultValue,
  name,
  onChange,
  options,
}) => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: name,
    defaultValue: `checked`,
    onChange: onChange,
  });

  const group = getRootProps();

  return (
    <RadioGroup defaultValue={defaultValue}>
      <HStack {...group}>
        {options.map((value) => {
          const radio = getRadioProps({ value });
          return (
            <RadioCard key={value} {...radio}>
              {value}
            </RadioCard>
          );
        })}
      </HStack>
    </RadioGroup>
  );
};

export default Radio;
