import "./styles.scss";
import { AppRadio, CustomRadioProps } from "@/components/atoms/radio";
import { Text } from "@/components/atoms/text";
import { Flex } from "antd";
import clsx from "clsx";
import { useState } from "react";

export interface CustomRadioItemProps extends Omit<CustomRadioProps, "id"> {
  id: string | number;
  itemChildren?: React.ReactNode;
}

interface RadioGroupProps {
  title?: string;
  titleClassName?: string;
  items: CustomRadioItemProps[];
  value?: CustomRadioItemProps["value"];
  onChange?: (value: CustomRadioItemProps["value"]) => void;
  defaultValue?: CustomRadioItemProps["value"];
}

export const RadioGroup = (props: RadioGroupProps) => {
  const {
    title,
    titleClassName,
    items,
    value: valueRadio,
    defaultValue,
    onChange
  } = props;
  const [value, setValue] = useState<CustomRadioItemProps["value"]>(valueRadio || defaultValue || "");

  return (
    <Flex vertical gap={12}>
      {title && (
        <Text
          size="text-md"
          className={clsx("radio-group--title font-semibold", titleClassName)}
        >
          {title}
        </Text>
      )}
      <Flex vertical gap="1rem">
        {(items ?? [])?.map((radio) => {
          const { id, ...rest } = radio;
          return (
            <Flex vertical key={`radio-${id}`} gap={10}>
              <AppRadio
                {...rest}
                checked={value === radio?.value}
                onChange={(e) => {
                  const newValue = e.target
                    .value as CustomRadioItemProps["value"];
                  setValue(newValue);
                  onChange?.(newValue);
                }}
              />
              {!!radio?.itemChildren && value === radio?.value ? (
                <Flex vertical className="radio-item-children">
                  {radio?.itemChildren}
                </Flex>
              ) : null}
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
};
