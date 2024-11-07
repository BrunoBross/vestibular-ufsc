import { Button } from "@/components/ui/button";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ViewProps } from "react-native";
import { ProofModal } from "./proof-modal";

interface EventActionsProps extends ViewProps {
  isFinishedTest: boolean;
}

export function EventActions(props: EventActionsProps) {
  const { isFinishedTest, ...rest } = props;
  const { id: eventId } = useLocalSearchParams();
  const [proofModalVisible, setProofModalVisible] = useState(false);

  const handleOpenProofModal = () => {
    setProofModalVisible(true);
  };

  return (
    <>
      {isFinishedTest && (
        <>
          <Button
            title="Pontuação por Questão"
            href={`/event/${eventId}/score-per-question`}
            {...rest}
          />
          <Button
            title="Boletim de Desempenho Individual"
            href={`/event/${eventId}/individual-performance`}
            {...rest}
          />
        </>
      )}
      <Button title="Comprovantes" onPress={handleOpenProofModal} {...rest} />

      <ProofModal
        visible={proofModalVisible}
        setIsVisible={setProofModalVisible}
      />
    </>
  );
}
