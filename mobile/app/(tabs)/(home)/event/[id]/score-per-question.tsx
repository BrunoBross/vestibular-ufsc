import { EventInfoBox } from "@/components/screens/home/event/event-info-box";
import { EventInfoText } from "@/components/screens/home/event/event-info-text";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScreenContainer } from "@/components/ui/screen-container";
import { Text } from "react-native";

export default function ScorePerQuestionScreen() {
  return (
    <ScreenContainer
      canGoBack
      title="Pontuação por Questão"
      className="space-y-4"
    >
      <Card className="space-y-4">
        <EventInfoBox title="Candidato">
          <EventInfoText>Bruno Barreto</EventInfoText>
        </EventInfoBox>
        <EventInfoBox title="Número de Inscrição">
          <EventInfoText>20202020</EventInfoText>
        </EventInfoBox>
        <EventInfoBox title="Política de Ações Afirmativas">
          <EventInfoText>
            222 - Escola Pública - Renda até 1,5 SM - Outros
          </EventInfoText>
        </EventInfoBox>
        <Text className="font-bold text-center">Curso</Text>
        <EventInfoBox title="Opção 1" className="items-start space-y-2">
          <EventInfoText>
            103 - UFSC - MEDICINA - BEL - INTEGRAL - FLORIANÓPOLIS
          </EventInfoText>
          <Badge text="Não Classificado" badgeType="danger" />
        </EventInfoBox>
      </Card>
      <Button title="Prova 1" />
      <Button title="Prova 2" />
    </ScreenContainer>
  );
}
