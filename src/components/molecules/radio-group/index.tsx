import { AppRadio, CustomRadioProps } from "@/components/atoms/radio";
import { Text } from "@/components/atoms/text";
import { Flex } from "antd";
import clsx from "clsx";
import { useState } from "react";

export interface CustomRadioItemProps extends Omit<CustomRadioProps, 'id'> {
  id: string | number;
}

interface RadioGroupProps {
  title?: string;
  titleClassName?: string;
  items: CustomRadioItemProps[];
  onChange?: (value: CustomRadioItemProps['value']) => void;
}

export const RadioGroup = (props: RadioGroupProps) => {
  const { title, titleClassName, items, onChange } = props;
  const [value, setValue] = useState<CustomRadioItemProps['value']>('all');

  return (
    <Flex vertical gap="1rem">
      {
        title && <Text size="text-md" className={clsx("radio-group--title font-semibold", titleClassName)}>{title}</Text>
      }
      <Flex vertical gap="1rem">
        {
          (items ?? [])?.map((radio) => {
            const { id, ...rest } = radio;
            return (
              <AppRadio key={`radio-${id}`} {...rest} checked={value === radio?.value} onChange={(e) => {
                const newValue = e.target.value as CustomRadioItemProps['value'];
                setValue(newValue);
                onChange?.(newValue);
              }} />
            )
          })
        }
      </Flex>
    </Flex>
  )
}