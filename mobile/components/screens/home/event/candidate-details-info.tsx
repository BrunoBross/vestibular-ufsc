import { Candidate } from "@/app/(tabs)/(home)";
import { Card, CardProps } from "@/components/ui/card";
import { CardInfoBox } from "@/components/ui/card/card-info-box";
import { CardInfoText } from "@/components/ui/card/card-info-text";
import { ScreenContainerTitle } from "@/components/ui/screen-container/screen-container-text";
import { toTitleCase } from "@/utils/title-case";
import { View } from "react-native";

interface CandidateDetailsInfo extends CardProps {
  candidate: Candidate;
}

export function CandidateDetailsInfo(props: CandidateDetailsInfo) {
  const { candidate, ...rest } = props;

  return (
    <View className="space-y-4" {...rest}>
      <ScreenContainerTitle>Informações do candidato</ScreenContainerTitle>
      <Card className="space-y-4" {...rest}>
        <CardInfoBox title="Candidato">
          <CardInfoText>{toTitleCase(candidate?.name)}</CardInfoText>
        </CardInfoBox>
        <CardInfoBox title="Número de Inscrição">
          <CardInfoText>{candidate?.registrationCode}</CardInfoText>
        </CardInfoBox>
        <CardInfoBox title="Política de Ações Afirmativas">
          <CardInfoText>{candidate?.paa}</CardInfoText>
        </CardInfoBox>
      </Card>
    </View>
  );
}
