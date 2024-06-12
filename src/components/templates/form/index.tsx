import { useParams } from "react-router-dom";
import { InHeritanceForm } from "./inheritance-form";
import { ForwardingForm } from "./forwarding-form";
import { DestructionForm } from "./destruction-form";
import { WillType } from "@/types";

export const WillForm = () => {

  const { willType } = useParams<{ willType: WillType }>();

  const renderForm = () => {
    switch (willType) {
      case 'inheritance':
        return <InHeritanceForm />
      case 'forwarding':
        return <ForwardingForm />
      case 'destruction':
        return <DestructionForm />
      default: return <></>
    }
  }

  return (
    <>{renderForm()}</>
  )
}