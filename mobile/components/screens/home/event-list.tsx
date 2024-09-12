import { Event } from "@/app/(tabs)/(home)";
import { Text, View, ViewProps } from "react-native";
import { EventCard } from "./event-card";

interface EventListProps extends ViewProps {
  eventList?: Event[];
}

export function EventList(props: EventListProps) {
  const { eventList, ...rest } = props;

  if (!eventList || eventList.length <= 0) {
    return (
      <View className="items-center justify-center h-full">
        <Text className="font-semibold text-white ">
          Nenhum processo seletivo encontrado
        </Text>
      </View>
    );
  }

  return (
    <View>
      {eventList.map((event) => (
        <EventCard key={event.id} event={event} {...rest} />
      ))}
    </View>
  );
}
