import { Event, EventCandidate } from "../../types/event/event-types";
import {
  findRawEventById,
  getRawCandidateEventList,
  getRawEventCandidate,
  getRawEventList,
  getRawExamLocation,
  getRawOptions,
  getRawResults,
} from "./event-requests";
import { parseEvent, parseEventCandidate } from "./event-utils";

export const getEventList = async () => {
  const rawEventList = await getRawEventList();

  const parsedEventList = await Promise.all(
    rawEventList.map((rawEvent: RawEvent) => parseEvent({ rawEvent }))
  );

  return parsedEventList.reverse();
};

export const getEventCandidateList = async (
  token: string
): Promise<EventCandidate[]> => {
  const rawEventCandidateList = await getRawCandidateEventList(token);

  const parsedCandidateEventList = await Promise.all(
    rawEventCandidateList.map(async (rawEventCandidate: RawEventCandidate) => {
      const eventId = rawEventCandidate.codigo_evento;

      const [rawEvent, rawExamLocation, rawOptions, rawResult] =
        await Promise.all([
          findRawEventById(eventId),
          getRawExamLocation(eventId, token),
          getRawOptions(eventId, token),
          getRawResults(eventId, token),
        ]);

      return await parseEventCandidate({
        rawEventCandidate,
        rawEvent,
        rawExamLocation,
        rawOptions,
        rawResult,
      });
    })
  );

  return parsedCandidateEventList.reverse();
};

export const findEventById = async (
  id: number,
  token?: string
): Promise<Event | EventCandidate> => {
  const rawEvent = await findRawEventById(id);

  if (!token) {
    return await parseEvent({
      rawEvent,
    });
  }

  const rawEventCandidate = await getRawEventCandidate(id, token);

  if (!rawEventCandidate) {
    return await parseEvent({
      rawEvent,
    });
  }

  const [rawExamLocation, rawOptions, rawResult] = await Promise.all([
    getRawExamLocation(id, token),
    getRawOptions(id, token),
    getRawResults(id, token),
  ]);

  const eventCandidate = await parseEventCandidate({
    rawEvent,
    rawEventCandidate,
    rawExamLocation,
    rawOptions,
    rawResult,
  });

  return eventCandidate;
};
