import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import PasswordInputMolecule from "../molecules/PasswordInputMolecule";

type PasswordFieldOrganismProps = {
  name: string;
  placeholder?: string;
  control?: any;
};

const PasswordFieldOrganism: React.FC<PasswordFieldOrganismProps> = ({
  name,
  placeholder,
  control,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <PasswordInputMolecule
          value={value || ""}
          onChangeText={onChange}
          placeholder={placeholder}
          error={error?.message}
        />
      )}
    />
  );
};

export default PasswordFieldOrganism;
