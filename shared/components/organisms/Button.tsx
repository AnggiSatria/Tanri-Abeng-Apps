import React from "react";
import { ViewStyle, TextStyle } from "react-native";
import AtomButtonContainer from "../atoms/AtomButtonContainer";
import MoleculeButtonContent from "../molecules/MoleculeButtonContent";

interface OrganismButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: {
    containerStyle?: ViewStyle;
    textStyle?: TextStyle;
  };
}

const OrganismButton: React.FC<OrganismButtonProps> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  style,
}) => {
  return (
    <AtomButtonContainer
      disabled={disabled || loading}
      onPress={onPress}
      style={style?.containerStyle}
    >
      <MoleculeButtonContent
        title={title}
        loading={loading}
        textStyle={style?.textStyle}
      />
    </AtomButtonContainer>
  );
};

export default OrganismButton;
