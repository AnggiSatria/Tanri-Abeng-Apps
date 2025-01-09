import React from "react";
import { Controller } from "react-hook-form";
import PhoneInput from "react-native-international-phone-number";

type PhoneNumberInputOrganismProps = {
  name: string;
  rules?: object;
  control?: any;
  defaultValue?: string;
  onChangePhoneNumber?: (phoneNumber: string) => void;
  defaultCountry?: string | any;
  language?: string;
  customMask?: string[];
  selectedCountry?: any;
  onChangeSelectedCountry?: (country: any) => void;
  showOnly?: any[];
  excludedCountries?: any[];
  popularCountries?: any[];
  popularCountriesSectionTitle?: string;
  restOfCountriesSectionTitle?: string;
  rtl?: boolean;
  disabled?: boolean;
  modalDisabled?: boolean;
  modalHeight?: number | string;
  theme?: any;
  phoneInputStyles?: any;
  modalStyles?: any;
  modalSearchInputPlaceholder?: string;
  modalSearchInputPlaceholderTextColor?: string;
  modalSearchInputSelectionColor?: string;
  modalNotFoundCountryMessage?: string;
  customCaret?: any;
  allowZeroAfterCallingCode?: boolean;
  placeholder?: string;
};

const PhoneNumberInputOrganism: React.FC<PhoneNumberInputOrganismProps> = ({
  name,
  rules,
  defaultValue = "",
  onChangePhoneNumber,
  onChangeSelectedCountry,
  defaultCountry = "ID",
  control,
  placeholder,
  ...restProps
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <PhoneInput
          defaultCountry={defaultCountry}
          value={value}
          onChangeText={(phone) => {
            onChange(phone);
            if (onChangePhoneNumber) {
              onChangePhoneNumber(phone);
            }
          }}
          {...restProps}
        />
      )}
    />
  );
};

export default PhoneNumberInputOrganism;
