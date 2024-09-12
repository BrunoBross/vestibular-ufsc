import { Badge } from "@/components/ui/badge";
import { Card, CardProps } from "@/components/ui/card";
import { CardInfoBox } from "@/components/ui/card/card-info-box";
import { CardInfoText } from "@/components/ui/card/card-info-text";

interface CourseCardProps extends CardProps {
  courseTitle: string;
  classified: boolean;
}

export function CourseCard(props: CourseCardProps) {
  const { courseTitle, classified, ...rest } = props;

  return (
    <Card {...rest}>
      <CardInfoBox title="Opção 1" className="items-start space-y-2">
        <CardInfoText>{courseTitle}</CardInfoText>
        {classified ? (
          <Badge badgeType="success" text="Classificado" />
        ) : (
          <Badge badgeType="danger" text="Não Classificado" />
        )}
      </CardInfoBox>
    </Card>
  );
}
