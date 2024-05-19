import { FC } from "react";
import { StyleSheet } from "react-native";
import { Card as CardPaper, CardTitleProps } from "react-native-paper";

type Props = CardTitleProps;

const Card: FC<Props> = ({ title, subtitle, style, ...rest }) => (
  <CardPaper.Title
    title={title}
    subtitle={subtitle}
    style={[styles.card, style]}
    {...rest}
  />
);

export default Card;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
  },
});
