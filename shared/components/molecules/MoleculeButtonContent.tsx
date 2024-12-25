import React from "react";
import AtomButtonText from "../atoms/AtomButtonText";
import AtomActivityIndicator from "../atoms/AtomActivityIndicator";
import { TextStyle } from "react-native";

interface MoleculeButtonContentProps {
  title: string;
  loading?: boolean;
  textStyle?: TextStyle;
}

const MoleculeButtonContent: React.FC<MoleculeButtonContentProps> = ({
  title,
  loading = false,
  textStyle,
}) => {
  return loading ? (
    <AtomActivityIndicator color="#FFF" />
  ) : (
    <AtomButtonText text={title} style={textStyle} />
  );
};

export default MoleculeButtonContent;
