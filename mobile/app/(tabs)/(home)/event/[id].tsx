import { Event } from "@/app/(tabs)/(home)/index";
import { EventDetailsCards } from "@/components/screens/home/event/event-details-cards";
import { LoadingContainer } from "@/components/ui/loading";
import { ScreenContainer } from "@/components/ui/screen-container";
import { axios } from "@/lib/axios";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [event, setEvent] = useState<Event>();

  const fetchEvent = async () => {
    await axios
      .get(`/event/${id}`)
      .then(({ data }) => {
        setEvent(data.event);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchEvent();
  }, [id]);

  return (
    <ScreenContainer title="Voltar" canGoBack>
      {event ? <EventDetailsCards event={event} /> : <LoadingContainer />}
    </ScreenContainer>
  );
}
