import { Button } from "@/components/ui/button";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ViewProps } from "react-native";
import { ProofModal } from "./proof-modal";

interface EventActionsProps extends ViewProps {}

export function EventActions(props: EventActionsProps) {
  const { ...rest } = props;
  const { id } = useLocalSearchParams();
  const [proofModalVisible, setProofModalVisible] = useState(false);

  const handleOpenProofModal = () => {
    setProofModalVisible(true);
  };

  return (
    <>
      <Button
        title="Pontuação por Questão"
        href={`/event/${id}/score-per-question`}
        {...rest}
      />
      <Button
        title="Boletim de Desempenho Individual"
        href={`/event/${id}/individual-performance`}
        {...rest}
      />
      <Button title="Boletim de Desempenho Individual - Reopção" {...rest} />
      <Button title="Comprovantes" onPress={handleOpenProofModal} {...rest} />

      <ProofModal
        visible={proofModalVisible}
        setIsVisible={setProofModalVisible}
      />
    </>
  );
}
