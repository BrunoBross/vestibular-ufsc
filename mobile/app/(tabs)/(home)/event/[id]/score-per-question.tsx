import { CourseCard } from "@/components/screens/home/event/course-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CardInfoBox } from "@/components/ui/card/card-info-box";
import { CardInfoText } from "@/components/ui/card/card-info-text";
import { ScreenContainer } from "@/components/ui/screen-container";
import { ScreenContainerTitle } from "@/components/ui/screen-container/screen-container-text";
import { router, useLocalSearchParams } from "expo-router";

export default function ScorePerQuestionScreen() {
  const { id: eventId } = useLocalSearchParams();

  const handleNavigateToExamSubjects = () => {
    router.push(`/event/${eventId}/exam/exam-subjects`);
  };

  return (
    <ScreenContainer
      canGoBack
      title="Pontuação por Questão"
      className="space-y-4"
    >
      <Card className="space-y-4">
        <CardInfoBox title="Candidato">
          <CardInfoText>Bruno Barreto</CardInfoText>
        </CardInfoBox>
        <CardInfoBox title="Número de Inscrição">
          <CardInfoText>20202020</CardInfoText>
        </CardInfoBox>
        <CardInfoBox title="Política de Ações Afirmativas">
          <CardInfoText>
            222 - Escola Pública - Renda até 1,5 SM - Outros
          </CardInfoText>
        </CardInfoBox>
      </Card>

      <ScreenContainerTitle>Curso</ScreenContainerTitle>
      <CourseCard
        courseTitle="103 - UFSC - MEDICINA - BEL - INTEGRAL - FLORIANÓPOLIS"
        classified={false}
      />

      <Button title="Prova 1" onPress={handleNavigateToExamSubjects} />
      <Button title="Prova 2" onPress={handleNavigateToExamSubjects} />
    </ScreenContainer>
  );
}
