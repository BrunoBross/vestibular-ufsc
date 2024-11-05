import { Event, EventCandidate } from "../../types/event/event-types";
import {
  findRawEventById,
  getRawEventCandidate,
  getRawEventList,
  getRawExamLocation,
  getRawOptions,
  getRawResults,
} from "./event-requests";
import {
  parseBasicEvent,
  parseEvent,
  parseEventCandidate,
} from "./event-utils";

export const getEventList = async (
  token: string
): Promise<EventCandidate[]> => {
  const rawEventList = await getRawEventList();

  const parsedEventList = await Promise.all(
    rawEventList.map(async (rawEvent: RawEvent) => {
      const rawEventCandidate = await getRawEventCandidate(
        rawEvent.codigo_evento,
        token
      );

      return await parseBasicEvent({
        rawEvent,
        rawEventCandidate,
      });
    })
  );

  return parsedEventList.reverse();
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
