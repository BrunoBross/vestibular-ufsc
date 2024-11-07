import { Option } from "@/app/(tabs)/(home)";
import { Badge } from "@/components/ui/badge";
import { Card, CardProps } from "@/components/ui/card";
import { CardInfoBox } from "@/components/ui/card/card-info-box";
import { CardInfoText } from "@/components/ui/card/card-info-text";
import { ScreenContainerTitle } from "@/components/ui/screen-container/screen-container-text";
import { toTitleCase } from "@/utils/title-case";
import { View } from "react-native";

interface EventOptionsInfoProps extends CardProps {
  optionList?: Option[];
  isFinishedTest: boolean;
}

export function EventOptionsInfo(props: EventOptionsInfoProps) {
  const { optionList, isFinishedTest, ...rest } = props;

  if (!optionList) {
    return;
  }

  return (
    <View {...rest}>
      <ScreenContainerTitle>Opções</ScreenContainerTitle>
      {optionList.map((option) => {
        return (
          <Card
            key={`${option.name}-${option.option}`}
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
              <View>
                {option.classified === true ? (
                  <Badge text="Classificado" badgeType="success" />
                ) : option.classified === false ? (
                  <Badge text="Não classificado" badgeType="danger" />
                ) : (
                  isFinishedTest && (
                    <Badge text="Aguardando resultado" badgeType="warning" />
                  )
                )}
              </View>
            </CardInfoBox>
          </Card>
        );
      })}
    </View>
  );
}
