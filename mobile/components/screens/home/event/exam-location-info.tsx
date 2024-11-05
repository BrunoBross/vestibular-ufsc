import { ExamLocation } from "@/app/(tabs)/(home)";
import { Card, CardProps } from "@/components/ui/card";
import { CardInfoText } from "@/components/ui/card/card-info-text";
import { ScreenContainerTitle } from "@/components/ui/screen-container/screen-container-text";
import { toTitleCase } from "@/utils/title-case";
import { View } from "react-native";

interface ExamLocationInfoProps extends CardProps {
  examLocation?: ExamLocation;
}

export function ExamLocationInfo(props: ExamLocationInfoProps) {
  const { examLocation, ...rest } = props;

  if (!examLocation) {
    return;
  }

  return (
    <View {...rest}>
      <ScreenContainerTitle>Local de prova</ScreenContainerTitle>
      <Card className="space-y-2" {...rest}>
        <CardInfoText prefix="Local: ">
          {toTitleCase(examLocation?.location)}
        </CardInfoText>
        <CardInfoText prefix="Seção: ">{examLocation?.section}</CardInfoText>
        <CardInfoText prefix="Grupo: ">{examLocation?.group}</CardInfoText>
        <CardInfoText prefix="Ordem: ">{examLocation?.order}</CardInfoText>
      </Card>
    </View>
  );
}
