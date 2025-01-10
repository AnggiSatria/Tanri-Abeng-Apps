import React from "react";
import { Controller } from "react-hook-form";
import PhoneInput, { ICountry } from "react-native-international-phone-number";
import { ICountryCca2 } from "react-native-international-phone-number/lib/interfaces/countryCca2";
import { ICountryName } from "react-native-international-phone-number/lib/interfaces/countryName";

// Tipe Props untuk PhoneNumberInputOrganism
type PhoneNumberInputOrganismProps = {
  name: string;
  rules?: object;
  control?: any;
  defaultValue?: string;
  onChangePhoneNumber?: (phoneNumber: string) => void;
  defaultCountry?: ICountryCca2;
  // language?: string;
  // customMask?: string[];
  selectedCountry?: ICountry | null;
  onChangeSelectedCountry?: (country: ICountry) => void;
  // showOnly?: any[];
  // excludedCountries?: any[];
  // popularCountries?: any[];
  // popularCountriesSectionTitle?: string;
  // restOfCountriesSectionTitle?: string;
  // rtl?: boolean;
  // disabled?: boolean;
  // modalDisabled?: boolean;
  // modalHeight?: number | string;
  // theme?: any;
  // phoneInputStyles?: any;
  // modalStyles?: any;
  // modalSearchInputPlaceholder?: string;
  // modalSearchInputPlaceholderTextColor?: string;
  // modalSearchInputSelectionColor?: string;
  // modalNotFoundCountryMessage?: string;
  // customCaret?: any;
  // allowZeroAfterCallingCode?: boolean;
  placeholder?: string;
};

const PhoneNumberInputOrganism: React.FC<PhoneNumberInputOrganismProps> = ({
  name,
  rules,
  defaultValue = "",
  onChangePhoneNumber,
  onChangeSelectedCountry,
  defaultCountry = "ID", // Pastikan ini sesuai dengan tipe ICountryCca2
  control,
  placeholder,
  selectedCountry = null,
  ...restProps
}) => {
  // Menyediakan fallback untuk selectedCountry
  const countryData: ICountry = selectedCountry || {
    cca2: "ID",
    callingCode: "62",
    flag: "🇮🇩",
    name: "Indonesia" as unknown as ICountryName, // Menyelaraskan dengan tipe ICountryName
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <PhoneInput
          keyboardType="numeric"
          defaultCountry={defaultCountry}
          value={value}
          selectedCountry={countryData}
          onChangeText={(phone) => {
            onChange(phone);
            if (onChangePhoneNumber) {
              onChangePhoneNumber(phone);
            }
          }}
          onChangePhoneNumber={(phoneNumber) => {
            if (onChangePhoneNumber) {
              onChangePhoneNumber(phoneNumber);
            }
          }}
          onChangeSelectedCountry={(country) => {
            if (onChangeSelectedCountry) {
              onChangeSelectedCountry(country);
            }
          }}
          {...restProps}
        />
      )}
    />
  );
};

export default PhoneNumberInputOrganism;
