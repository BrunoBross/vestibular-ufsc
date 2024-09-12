import { Button } from "@/components/ui/button";
import { ScreenContainer } from "@/components/ui/screen-container";
import { router, useLocalSearchParams } from "expo-router";

export const MOCK_EXAM_SUBJECTS = [
  "Português",
  "Segunda Língua",
  "Matemática",
  "Biologia",
  "Discursiva 1",
  "Discursiva 2",
];

export default function ExamListScreen() {
  const { id: eventId } = useLocalSearchParams();

  const handleNavigateToExamQuestions = () => {
    router.push(`/event/${eventId}/exam/exam-questions`);
  };

  return (
    <ScreenContainer title="Prova 1" canGoBack className="space-y-4">
      {MOCK_EXAM_SUBJECTS.map((exam, index) => (
        <Button
          key={index}
          title={exam}
          onPress={handleNavigateToExamQuestions}
        />
      ))}
    </ScreenContainer>
  );
}
