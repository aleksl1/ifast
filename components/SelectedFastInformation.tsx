import { FastDetails } from "@/types/fastTypes";
import { FC, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import { Button, DefaultTheme, Modal, Portal, Text } from "react-native-paper";

type SelectedFastInformationProps = {
  selectedFast: FastDetails;
};

const SelectedFastInformation: FC<SelectedFastInformationProps> = ({
  selectedFast,
}) => {
  const [visible, setVisible] = useState(false);
  const { height } = useWindowDimensions();
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={{
            backgroundColor: "white",
            position: "absolute",
            top: 80,
            bottom: 0,
            left: 0,
            right: 0,
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            overflow: "hidden",
          }}
        >
          <ScrollView>
            <View style={styles.container}>
              <Text style={styles.header} variant="titleLarge">
                Różnorodność Postów Prerywanych: Kluczem do Lepszego Zdrowia
              </Text>
              <Text variant="bodyMedium" style={styles.paragraph}>
                Posty przerywane, znane również jako okresowe ograniczenia
                spożywania pokarmów, zdobywają coraz większą popularność w
                dziedzinie zdrowego stylu życia. Polegają one na cyklicznym
                ograniczeniu spożycia pokarmów przez określony czas, zazwyczaj
                połączonym z okresem normalnego żywienia. Istnieje kilka
                popularnych rodzajów postów przerywanych, z których każdy
                oferuje unikalne korzyści dla zdrowia.
              </Text>

              <Text variant="titleMedium" style={styles.subheader}>
                Post 16 Godzinny:
              </Text>
              <Text variant="bodyMedium" style={styles.paragraph}>
                Post 16-godzinny polega na ograniczeniu spożycia pokarmów przez
                16 godzin na dobę, pozwalając na 8-godzinne okno spożycia
                pokarmów. Ta forma postu jest stosunkowo łagodna i łatwa do
                wdrożenia. Korzyści obejmują poprawę metabolizmu, regulację
                poziomu cukru we krwi i redukcję ryzyka wystąpienia otyłości.
              </Text>

              <Text variant="titleMedium" style={styles.subheader}>
                Post 18 Godzinny:
              </Text>
              <Text variant="bodyMedium" style={styles.paragraph}>
                Post 18-godzinny obejmuje 18-godzinny okres bez spożywania
                pokarmów, pozwalając na 6-godzinne okno jedzenia. Ten rodzaj
                postu może być skuteczną metodą redukcji masy ciała, poprawy
                kontroli apetytu oraz zwiększenia wydolności metabolicznej
                organizmu.
              </Text>

              <Text variant="titleMedium" style={styles.subheader}>
                Post 20 Godzinny:
              </Text>
              <Text variant="bodyMedium" style={styles.paragraph}>
                Post 20-godzinny, znany również jako post warriorów, to bardziej
                zaawansowana forma postu, w której okno jedzenia trwa jedynie 4
                godziny dziennie. Pomimo wyzwania, post ten oferuje liczne
                korzyści, takie jak poprawa funkcji metabolicznych, zwiększenie
                produkcji hormonów wzrostu oraz poprawa wydolności umysłowej.
              </Text>

              <Text variant="titleMedium" style={styles.subheader}>
                Post 36 Godzinny:
              </Text>
              <Text variant="bodyMedium" style={styles.paragraph}>
                Post 36-godzinny to bardziej zaawansowana forma postu, w której
                spożycie pokarmów jest ograniczone przez całą dobę, a następnie
                następuje 12-godzinne okno jedzenia. Ten rodzaj postu może
                przynosić korzyści w zakresie poprawy funkcji kognitywnych,
                regulacji poziomu insuliny oraz redukcji stanów zapalnych w
                organizmie.
              </Text>

              <Text variant="titleMedium" style={styles.subheader}>
                Post 48 Godzinny:
              </Text>
              <Text variant="bodyMedium" style={styles.paragraph}>
                Post 48-godzinny to jedna z najbardziej intensywnych form postu
                przerywanego, polegająca na całkowitym wstrzymaniu spożycia
                pokarmów przez 48 godzin, a następnie spożywanie posiłków przez
                6-8 godzin. Mimo że wymaga to większej samodyscypliny, post
                48-godzinny może przynieść liczne korzyści, takie jak poprawa
                zdolności regeneracyjnych organizmu, redukcja stanów zapalnych
                oraz wsparcie dla zdrowia serca.
              </Text>
              <Button
                mode="contained"
                style={{ marginTop: 16 }}
                onPress={hideModal}
              >
                Zamknij
              </Button>
            </View>
          </ScrollView>
        </Modal>
      </Portal>

      <Button mode="text" icon="information" onPress={showModal}>
        Wybrany {selectedFast.label}. Dowiedz się więcej
      </Button>
    </>
  );
};

export default SelectedFastInformation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingBottom: 16,
    paddingTop: 24,
    backgroundColor: DefaultTheme.colors.primaryContainer,
  },
  header: {
    marginBottom: 10,
    fontWeight: "bold",
  },
  subheader: {
    marginTop: 20,
    marginBottom: 10,
    fontWeight: "bold",
  },
  paragraph: {
    marginBottom: 10,
  },
});
