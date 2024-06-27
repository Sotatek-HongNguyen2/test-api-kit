import { useParams } from "react-router-dom";
import { InHeritanceForm } from "./inheritance-form";
import { ForwardingForm } from "./forwarding-form";
import { DestructionForm } from "./destruction-form";
import { WillType } from "@/types";

export interface EditFormProps {
  isEdit?: boolean;
  type?: WillType;
  scWillId?: string;
}

export const WillForm = (props: EditFormProps) => {
  const { type } = props;

  const { willType: willTypeParams } = useParams<{ willType: WillType }>();
  const willType = willTypeParams || type;

  const renderForm = () => {
    switch (willType) {
      case 'inheritance':
        return <InHeritanceForm {...props} />
      case 'forwarding':
        return <ForwardingForm {...props} />
      case 'destruction':
        return <DestructionForm />
      default: return <></>
    }
  }

  return (
    <>{renderForm()}</>
  )
}