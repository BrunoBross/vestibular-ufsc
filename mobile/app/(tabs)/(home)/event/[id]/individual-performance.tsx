import { CourseCard } from "@/components/screens/home/event/course-card";
import { Card } from "@/components/ui/card";
import { CardInfoBox } from "@/components/ui/card/card-info-box";
import { CardInfoText } from "@/components/ui/card/card-info-text";
import { ScreenContainer } from "@/components/ui/screen-container";
import { ScreenContainerTitle } from "@/components/ui/screen-container/screen-container-text";
import { MOCK_EXAM_SUBJECTS } from "./exam/exam-subjects";

export default function IndividualPerformanceScreen() {
  return (
    <ScreenContainer
      title="Boletim de Desempenho Individual"
      canGoBack
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

      <ScreenContainerTitle>Em Lista de Espera</ScreenContainerTitle>
      <Card>
        <CardInfoBox title="Opção 1">
          <CardInfoText prefix="Curso:">
            103 - UFSC - MEDICINA - BEL - INTEGRAL
          </CardInfoText>
          <CardInfoText prefix="Classificação:">3323</CardInfoText>
          <CardInfoText prefix="Vagas Curso/Categoria:">35</CardInfoText>
          <CardInfoText prefix="Categoria:">
            Classificação Geral (Não Optantes)
          </CardInfoText>
        </CardInfoBox>
      </Card>

      <ScreenContainerTitle>Desempenho do Candidato</ScreenContainerTitle>
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
