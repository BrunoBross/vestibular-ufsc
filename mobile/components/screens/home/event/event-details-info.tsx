import { Event } from "@/app/(tabs)/(home)";
import { Card, CardProps } from "@/components/ui/card";
import { CardInfoBox } from "@/components/ui/card/card-info-box";
import { CardInfoText } from "@/components/ui/card/card-info-text";
import { formatFullDate } from "@/utils/format-date";

interface EventDetailsInfoProps extends CardProps {
  event: Event;
}

export function EventDetailsInfo(props: EventDetailsInfoProps) {
  const { event, ...rest } = props;

  return (
    <Card className="space-y-4" {...rest}>
      <CardInfoBox title="Inscrições">
        <CardInfoText prefix="Início:">
          {formatFullDate(event.registrationStartDate)}
        </CardInfoText>
        <CardInfoText prefix="Fim:">
          {formatFullDate(event.registrationEndDate)}
        </CardInfoText>
      </CardInfoBox>

      <CardInfoBox title="Provas">
        {event.examList?.map((exam, index) => (
          <CardInfoText prefix={`${exam.description} -`} key={index}>
            {formatFullDate(exam.examStartDate)}
          </CardInfoText>
        ))}
      </CardInfoBox>

      <CardInfoBox title="Valor da inscrição">
        {event.registrationCost > 0 ? (
          <CardInfoText prefix="R$:">{event.registrationCost}</CardInfoText>
        ) : (
          <CardInfoText>Grátis</CardInfoText>
        )}
      </CardInfoBox>

      <CardInfoBox title="Modalidades">
        <CardInfoText>{event.modalities}</CardInfoText>
      </CardInfoBox>

      <CardInfoBox title="Cursos">
        <CardInfoText>{event.coursesAmount} cursos</CardInfoText>
      </CardInfoBox>
    </Card>
  );
}
