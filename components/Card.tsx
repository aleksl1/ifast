import { FC } from "react";
import { Card as CardPaper, Text } from "react-native-paper";

type Props = {};

const Card: FC<Props> = () => (
  <CardPaper>
    <CardPaper.Content>
      <Text variant="titleLarge">Card title</Text>
      <Text variant="bodyMedium">Card content</Text>
    </CardPaper.Content>
  </CardPaper>
);

export default Card;
