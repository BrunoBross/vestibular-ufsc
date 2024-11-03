import { ClientError } from "@/errors/client-error";
import { axios } from "@/lib/axios";
import { buildBearerToken } from "@/utils/build-bearer-token";
import { parseEvent } from "./event-utils";

export const getEventList = async () => {
  const eventList = await axios
    .get("/api/v1/eventos")
    .then(({ data }) => {
      return data.eventos;
    })
    .catch((error) => {
      console.log(error);
    });

  const parsedEventList: Event[] = eventList.map((rawEvent: RawEvent) =>
    parseEvent({ rawEvent })
  );

  return parsedEventList.reverse();
};

export const findEventById = async (id: number, token?: string) => {
  const rawEvent = await axios
    .get(`/api/v1/evento/${id}`)
    .then(({ data }) => data.evento)
    .catch((error) => {
      console.log(error);
      throw new ClientError("Event not found");
    });

  if (!token) {
    return parseEvent({
      rawEvent,
    });
  }

  const rawOptions = token
    ? await axios
        .get(`/api/private/v1/evento/${id}/candidato/opcoes`, {
          ...buildBearerToken(token),
        })
        .then(({ data }) => data)
        .catch((error) => {
          console.log(error);
        })
    : null;

  const rawResult = token
    ? await axios
        .get(`/api/private/v1/evento/${id}/candidato/resultado`, {
          ...buildBearerToken(token),
        })
        .then(({ data }) => data)
        .catch((error) => {
          console.log(error);
        })
    : null;

  const rawEventCandidate = token
    ? await axios
        .get(`/api/private/v1/evento/${id}/candidato`, {
          ...buildBearerToken(token),
        })
        .then(({ data }) => data.candidato)
        .catch((error) => {
          console.log(error);
        })
    : null;

  return parseEvent({
    rawEvent,
    rawEventCandidate,
    rawOptions,
    rawResult,
  });
};

export const getCandidateEventList = async (token: string) => {
  const candidateEventList = await axios
    .get("/api/private/v1/candidatos", { ...buildBearerToken(token) })
    .then(({ data }) => {
      return data?.candidatos;
    })
    .catch((error) => {
      console.log(error);
    });

  return candidateEventList;
};
