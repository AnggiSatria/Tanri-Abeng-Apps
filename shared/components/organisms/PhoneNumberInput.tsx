import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import PasswordInputMolecule from "../molecules/PasswordInputMolecule";
import PhoneInput from "react-native-phone-number-input";

type PhoneNumberInputOrganismProps = {
  name: string;
  placeholder?: string;
  control?: any;
  rules?: object;
  defaultCodes?: string;
  onChangeCountry?: (country: any) => void;
  onChangeText?: (text: string) => void;
  onChangeFormattedText?: (text: string) => void;
  disabled?: boolean;
  disableArrowIcon?: boolean;
  value?: string;
  withDarkTheme?: boolean;
  withShadow?: boolean;
  containerStyle?: any;
  autoFocus?: boolean;
};

const PhoneNumberInputFieldOrganism: React.FC<
  PhoneNumberInputOrganismProps
> = ({
  name,
  placeholder,
  control,
  rules,
  onChangeCountry,
  onChangeText,
  onChangeFormattedText,
  disabled = false,
  disableArrowIcon = false,
  value = "",
  withDarkTheme = false,
  withShadow = false,
  autoFocus = false,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <PhoneInput
          defaultCode={"ID"}
          value={value}
          onChangeText={onChangeText}
          onChangeCountry={onChangeCountry}
          onChangeFormattedText={onChangeFormattedText}
        />
      )}
    />
  );
};

export default PhoneNumberInputFieldOrganism;
