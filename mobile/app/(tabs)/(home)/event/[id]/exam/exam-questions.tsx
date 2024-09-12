import { Card } from "@/components/ui/card";
import { CardInfoBox } from "@/components/ui/card/card-info-box";
import { CardInfoText } from "@/components/ui/card/card-info-text";
import { ScreenContainer } from "@/components/ui/screen-container";
import { ScreenContainerTitle } from "@/components/ui/screen-container/screen-container-text";
import { View } from "react-native";

const MOCK_EXAM_QUESTIONS = Array.from(
  { length: 10 },
  (_, index) => `Questão ${index + 1}`
);

export default function ExamQuestionsScreen() {
  return (
    <ScreenContainer
      title={
        <View className="flex-row justify-between">
          <ScreenContainerTitle className="text-base font-bold">
            Português
          </ScreenContainerTitle>
          <ScreenContainerTitle>Total 7.39</ScreenContainerTitle>
        </View>
      }
      canGoBack
      className="space-y-4"
    >
      {MOCK_EXAM_QUESTIONS.map((question, index) => (
        <Card key={index}>
          <CardInfoBox title={question}>
            <CardInfoText prefix="N° proposições:">6</CardInfoText>
            <CardInfoText prefix="Gabarito:">35 (01, 02, 32)</CardInfoText>
            <CardInfoText prefix="Resposta:">
              61 (01, 04, 08, 16, 32)
            </CardInfoText>
            <CardInfoText prefix="Pontuação:">0</CardInfoText>
          </CardInfoBox>
        </Card>
      ))}
    </ScreenContainer>
  );
}
