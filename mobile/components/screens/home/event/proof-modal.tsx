import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Feather } from "@expo/vector-icons";
import {
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewProps,
} from "react-native";
import colors from "tailwindcss/colors";

interface ProofModalProps {
  visible: boolean;
  setIsVisible: (visible: boolean) => void;
}

interface DownloadButtonProps extends ViewProps {
  proofName: string;
}

function DownloadButton(props: DownloadButtonProps) {
  const { proofName, ...rest } = props;

  return (
    <Button
      title={proofName}
      icon={<Feather name="download" color={colors.white} size={18} />}
      {...rest}
    />
  );
}

export function ProofModal(props: ProofModalProps) {
  const { visible, setIsVisible } = props;

  const handleCloseModal = () => {
    setIsVisible(false);
  };

  return (
    <Modal transparent statusBarTranslucent visible={visible}>
      <TouchableWithoutFeedback onPress={handleCloseModal}>
        <View className="justify-center flex-1 p-4 bg-zinc-950/80">
          <Card className="space-y-4">
            <View className="flex-row items-center justify-between">
              <Text className="text-base font-bold">Comprovantes</Text>
              <TouchableOpacity onPress={handleCloseModal}>
                <Feather name="x" size={22} />
              </TouchableOpacity>
            </View>

            <DownloadButton proofName="Comprovante 1" />
            <DownloadButton proofName="Comprovante 2" />
            <DownloadButton proofName="Comprovante 3" />
          </Card>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
