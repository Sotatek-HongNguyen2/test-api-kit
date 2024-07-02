import { AppCheckbox } from "@/components/atoms/checkbox";
import "./styles.scss";
import { Text } from "@/components/atoms/text";
import { Flex } from "antd";
import clsx from "clsx";
import { useState } from "react";
import { CustomRadioProps } from "@/components/atoms/radio";

export interface CustomCheckboxItemProps extends Omit<CustomRadioProps, 'id'> {
  id: string | number;
  itemChildren?: React.ReactNode;
}

interface CheckboxGroupProps {
  title?: string;
  titleClassName?: string;
  items: CustomCheckboxItemProps[];
  onChange?: (value: CustomCheckboxItemProps['value'][]) => void;
  checked?: CustomCheckboxItemProps['value'][];
}

export const CheckboxGroup = (props: CheckboxGroupProps) => {
  const { title, titleClassName, items, onChange, checked } = props;
  const [value, setValue] = useState<CustomCheckboxItemProps['value'][]>(checked || []);

  return (
    <Flex vertical gap="1rem">
      {
        title && <Text size="text-md" className={clsx("checkbox-group--title font-semibold", titleClassName)}>{title}</Text>
      }
      <Flex vertical gap="1rem">
        {
          (items ?? [])?.map((checkbox) => {
            const { id, ...rest } = checkbox;
            return (
              <>
                <AppCheckbox
                  key={`checkbox-${id}`}
                  {...rest}
                  checked={value?.includes(checkbox?.value)}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    const newArr = [...value];
                    if (!checked) {
                      const index = value?.indexOf(checkbox?.value);
                      newArr?.splice(index, 1);
                    } else {
                      newArr?.push(checkbox?.value);
                    }
                    setValue(newArr);
                    onChange?.(newArr);
                  }}>
                  {checkbox?.title}
                </AppCheckbox>
                {
                  (!!checkbox?.itemChildren && value?.includes(checkbox?.value)) ? (
                    <Flex vertical className="checkbox-item-children">
                      {checkbox?.itemChildren}
                    </Flex>
                  ) : null
                }
              </>
            )
          })
        }
      </Flex>
    </Flex>
  )
}