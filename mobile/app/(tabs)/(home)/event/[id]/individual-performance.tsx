import { Card } from "@/components/ui/card";
import { CardInfoBox } from "@/components/ui/card/card-info-box";
import { CardInfoText } from "@/components/ui/card/card-info-text";
import { LoadingContainer } from "@/components/ui/loading";
import { ScreenContainer } from "@/components/ui/screen-container";
import { axios } from "@/lib/axios";
import { toTitleCase } from "@/utils/title-case";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Text, View } from "react-native";
import { useQuery } from "react-query";

export interface PerformanceScore {
  name: string;
  score: number;
  cutoffScore: number;
  weight: number;
  finalScore: number;
}

export interface PerformanceReport {
  name: string;
  campus: string;
  questions: PerformanceScore[];
  finalScore: number;
}

const fetchPerformanceReportByEventIdQuery = (
  eventId: string
): Promise<PerformanceReport[]> =>
  axios
    .get(`/event/${eventId}/performance`)
    .then(({ data }) => data.performanceReport);

export default function IndividualPerformanceScreen() {
  const { id: eventId } = useLocalSearchParams();
  const { goBack } = useNavigation();

  const { data: performanceReport, isLoading } = useQuery(
    ["performanceReport", eventId],
    ({ queryKey }) =>
      fetchPerformanceReportByEventIdQuery(queryKey[1] as string).catch(() => {
        alert("Boletim de desempenho não disponível");
        goBack();
      })
  );

  if (isLoading || !performanceReport) {
    return (
      <ScreenContainer title="Boletim de Desempenho Individual" canGoBack>
        <LoadingContainer />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer
      title="Boletim de Desempenho Individual"
      canGoBack
      className="space-y-4"
    >
      {performanceReport.map((performance) => {
        return (
          <View key={performance.name} className="space-y-4">
            <CardInfoBox title="Curso">
              <CardInfoText>{toTitleCase(performance.name)}</CardInfoText>
            </CardInfoBox>
            <CardInfoBox title="Campus">
              <CardInfoText>{toTitleCase(performance.campus)}</CardInfoText>
            </CardInfoBox>
            {performance.questions.map((question, index) => (
              <Card key={index}>
                <CardInfoBox title={toTitleCase(question.name) || ""}>
                  <CardInfoText prefix="Acertos:">
                    {question.score}
                  </CardInfoText>
                  <CardInfoText prefix="Corte:">
                    {question.cutoffScore}
                  </CardInfoText>
                  <CardInfoText prefix="Peso:">{question.weight}</CardInfoText>
                  <CardInfoText prefix="Pontuação:">
                    {question.finalScore}
                  </CardInfoText>
                </CardInfoBox>
              </Card>
            ))}
            <Text className="text-base font-semibold text-right">
              Pontuação final: {performance.finalScore}
            </Text>
          </View>
        );
      })}
    </ScreenContainer>
  );
}
