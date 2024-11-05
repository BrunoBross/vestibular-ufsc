import { Button } from "@/components/ui/button";
import { ScreenContainer } from "@/components/ui/screen-container";
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
      <Button title="Prova 1" onPress={handleNavigateToExamSubjects} />
      <Button title="Prova 2" onPress={handleNavigateToExamSubjects} />
    </ScreenContainer>
  );
}
