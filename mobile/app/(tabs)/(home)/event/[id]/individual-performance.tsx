import { Card } from "@/components/ui/card";
import { CardInfoBox } from "@/components/ui/card/card-info-box";
import { CardInfoText } from "@/components/ui/card/card-info-text";
import { ScreenContainer } from "@/components/ui/screen-container";
import { MOCK_EXAM_SUBJECTS } from "./exam/exam-subjects";

export default function IndividualPerformanceScreen() {
  return (
    <ScreenContainer
      title="Boletim de Desempenho Individual"
      canGoBack
      className="space-y-4"
    >
      {MOCK_EXAM_SUBJECTS.map((question, index) => (
        <Card key={index}>
          <CardInfoBox title={question}>
            <CardInfoText prefix="Acertos:">7.39</CardInfoText>
            <CardInfoText prefix="Corte:">3.00</CardInfoText>
            <CardInfoText prefix="Peso:">1.00</CardInfoText>
            <CardInfoText prefix="Pontuação:">7.39</CardInfoText>
          </CardInfoBox>
        </Card>
      ))}
    </ScreenContainer>
  );
}
