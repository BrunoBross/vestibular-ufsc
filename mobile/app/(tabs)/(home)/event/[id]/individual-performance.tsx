import { Card } from "@/components/ui/card";
import { CardInfoBox } from "@/components/ui/card/card-info-box";
import { CardInfoText } from "@/components/ui/card/card-info-text";
import { LoadingContainer } from "@/components/ui/loading";
import { ScreenContainer } from "@/components/ui/screen-container";
import { axios } from "@/lib/axios";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Text } from "react-native";
import { useQuery } from "react-query";

export interface PerformanceScore {
  name: string;
  score: number;
  cutoffScore: number;
  weight: number;
  finalScore: number;
}

export interface PerformanceReport {
  questions: PerformanceScore[];
  finalScore: number;
}

const fetchPerformanceReportByEventIdQuery = (
  eventId: string
): Promise<PerformanceReport> =>
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
      {performanceReport.questions.map((question, index) => {
        if (!question.score) {
          return;
        }

        return (
          <Card key={index}>
            <CardInfoBox title={question.name}>
              <CardInfoText prefix="Acertos:">{question.score}</CardInfoText>
              <CardInfoText prefix="Corte:">
                {question.cutoffScore}
              </CardInfoText>
              <CardInfoText prefix="Peso:">{question.weight}</CardInfoText>
              <CardInfoText prefix="Pontuação:">
                {question.finalScore}
              </CardInfoText>
            </CardInfoBox>
          </Card>
        );
      })}
      <Text className="text-base font-semibold text-right">
        Pontuação final: {performanceReport.finalScore}
      </Text>
    </ScreenContainer>
  );
}
