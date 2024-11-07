import { ClientError } from "@/errors/client-error";
import {
  BasicEvent,
  Event,
  EventCandidate,
  PerformanceReport,
} from "../../types/event/event-types";
import {
  findRawEventById,
  getRawEventCandidate,
  getRawEventList,
  getRawExamLocation,
  getRawOptions,
  getRawPerformanceReport,
  getRawResults,
} from "./event-requests";
import {
  parseBasicEvent,
  parseEvent,
  parseEventCandidate,
  parsePerformanceReport,
} from "./event-utils";

export const getEventList = async (token: string): Promise<BasicEvent[]> => {
  const rawEventList = await getRawEventList();

  const parsedEventList = await Promise.all(
    rawEventList.map(async (rawEvent: RawEvent) => {
      const rawEventCandidate = token
        ? await getRawEventCandidate(rawEvent.codigo_evento, token)
        : null;

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
    return await parseEvent(rawEvent);
  }

  const rawEventCandidate = await getRawEventCandidate(id, token);

  if (!rawEventCandidate) {
    return await parseEvent(rawEvent);
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

export const findPerformanceReportByEventId = async (
  eventId: number,
  token: string
): Promise<PerformanceReport[]> => {
  const performanceReport = await getRawPerformanceReport(eventId, token);

  if (
    !performanceReport ||
    !performanceReport.acertos ||
    !performanceReport.notas
  ) {
    throw new ClientError("Performance not found.");
  }

  const parsedPerformanceReport = await parsePerformanceReport(
    performanceReport
  );

  return parsedPerformanceReport;
};
