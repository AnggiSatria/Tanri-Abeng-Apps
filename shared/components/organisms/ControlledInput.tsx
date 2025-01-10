import React from "react";
import { Control, Controller } from "react-hook-form";
import MoleculeInputField from "../molecules/MoleculeInputField";

interface OrganismControlledInputProps {
  control: Control<any>;
  name: string;
  rules?: object;
  placeholder?: string;
  customStyles?: {
    containerStyle?: object;
    inputStyle?: object;
    errorStyle?: object;
  };
  disabled?: boolean;
  values?: string | any;
}

const OrganismControlledInput: React.FC<OrganismControlledInputProps> = ({
  control,
  name,
  rules,
  placeholder,
  customStyles,
  disabled = false,
  values = null,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <MoleculeInputField
          placeholder={placeholder}
          value={values || value}
          onBlur={onBlur}
          onChangeText={onChange}
          error={error?.message}
          containerStyle={customStyles?.containerStyle}
          inputStyle={customStyles?.inputStyle}
          errorStyle={customStyles?.errorStyle}
          disabled={disabled}
        />
      )}
    />
  );
};

export default OrganismControlledInput;
