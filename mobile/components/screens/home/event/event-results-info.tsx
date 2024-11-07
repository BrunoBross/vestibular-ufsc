import { Result } from "@/app/(tabs)/(home)";
import { Badge } from "@/components/ui/badge";
import { Card, CardProps } from "@/components/ui/card";
import { CardInfoBox } from "@/components/ui/card/card-info-box";
import { CardInfoText } from "@/components/ui/card/card-info-text";
import { ScreenContainerTitle } from "@/components/ui/screen-container/screen-container-text";
import { toTitleCase } from "@/utils/title-case";
import { View } from "react-native";

interface EventResultsInfoProps extends CardProps {
  result?: Result;
}

export function EventResultsInfo(props: EventResultsInfoProps) {
  const { result, ...rest } = props;

  if (!result) {
    return;
  }

  return (
    <View {...rest}>
      {result.classified && (
        <>
          <ScreenContainerTitle>Resultado</ScreenContainerTitle>
          <Card className="space-y-4" {...rest}>
            <CardInfoBox
              title={`Opção ${result.classified.option.option}`}
              className="items-start space-y-2"
            >
              <CardInfoText prefix="Curso: " className="mt-4">
                {toTitleCase(result.classified.option.name)}
              </CardInfoText>
              <CardInfoText prefix="Campus: ">
                {toTitleCase(result.classified.option.campus)}
              </CardInfoText>
              <CardInfoText prefix="Categoria: ">
                {result.classified.category}
              </CardInfoText>
              <CardInfoText prefix="Posição: ">
                {result.classified.order}
              </CardInfoText>
              <CardInfoText prefix="Periodo: ">
                {result.classified.period}
              </CardInfoText>
              <Badge text="Classificado" badgeType="success" />
            </CardInfoBox>
          </Card>
        </>
      )}

      {result.waitList && result.waitList.length > 0 && (
        <>
          <ScreenContainerTitle>Lista de espera</ScreenContainerTitle>
          {result.waitList.map((wait) => {
            const option = wait.option;

            return (
              <Card
                key={`${option.name}-${option.option}-${wait.order}`}
                className="space-y-4"
                {...rest}
              >
                <CardInfoBox
                  title={`Opção ${option.option}`}
                  className="items-start space-y-2"
                >
                  <CardInfoText prefix="Curso: " className="mt-4">
                    {toTitleCase(option?.name)}
                  </CardInfoText>
                  <CardInfoText prefix="Campus: ">
                    {toTitleCase(option?.campus)}
                  </CardInfoText>
                  <CardInfoText prefix="Categoria: ">
                    {wait.category}
                  </CardInfoText>
                  <CardInfoText prefix="Posição: ">{wait.order}</CardInfoText>
                </CardInfoBox>
              </Card>
            );
          })}
        </>
      )}
    </View>
  );
}
