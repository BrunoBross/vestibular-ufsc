import { axios } from "@/lib/axios";
import { buildBearerToken } from "@/utils/build-bearer-token";

export const getRawEventList = async (): Promise<RawEvent[]> => {
  return await axios
    .get<RawEventListResponse>("/api/v1/eventos")
    .then(({ data }) => {
      return data.eventos;
    })
    .catch((error) => {
      //console.error(error);
      return null;
    });
};

export const getRawCandidateEventList = async (
  token: string
): Promise<RawEventCandidate[]> => {
  return await axios
    .get<RawEventCandidateListResponse>("/api/private/v1/candidatos", {
      ...buildBearerToken(token),
    })
    .then(({ data }) => {
      return data?.candidatos;
    })
    .catch((error) => {
      //console.error(error);
      return null;
    });
};

export const findRawEventById = async (id: number): Promise<RawEvent> => {
  return await axios
    .get<RawEventResponse>(`/api/v1/evento/${id}`)
    .then(({ data }) => data.evento)
    .catch((error) => {
      //console.error(error);
      return null;
    });
};

export const getRawOptions = async (
  id: number,
  token: string
): Promise<RawOptionResponse[]> => {
  return await axios
    .get<RawOptionResponse[]>(`/api/private/v1/evento/${id}/candidato/opcoes`, {
      ...buildBearerToken(token),
    })
    .then(({ data }) => data)
    .catch((error) => {
      //console.error(error);
      return null;
    });
};

export const getRawResults = async (
  id: number,
  token: string
): Promise<RawResultResponse> => {
  return await axios
    .get<RawResultResponse>(
      `/api/private/v1/evento/${id}/candidato/resultado`,
      {
        ...buildBearerToken(token),
      }
    )
    .then(({ data }) => data)
    .catch((error) => {
      //console.error(error);
      return null;
    });
};

export const getRawEventCandidate = async (
  id: number,
  token: string
): Promise<RawEventCandidate> => {
  return await axios
    .get<RawEventCandidateResponse>(`/api/private/v1/evento/${id}/candidato`, {
      ...buildBearerToken(token),
    })
    .then(({ data }) => data.candidato)
    .catch((error) => {
      // console.error(error);
      return null;
    });
};

export const getRawExamLocation = async (
  id: number,
  token: string
): Promise<RawExamLocation> => {
  return await axios
    .get<RawExamLocationResponse>(
      `/api/private/v1/evento/${id}/candidato/local-prova`,
      {
        ...buildBearerToken(token),
      }
    )
    .then(({ data }) => data.local_prova)
    .catch((error) => {
      //console.error(error);
      return null;
    });
};

export const getRawPerformanceReport = async (
  id: number,
  token: string
): Promise<RawPerformanceReport> => {
  return await axios
    .get<RawPerformanceReport>(
      `/api/private/v1/evento/${id}/candidato/boletim-desempenho`,
      {
        ...buildBearerToken(token),
      }
    )
    .then(({ data }) => data)
    .catch((error) => {
      // console.error(error);
      return null;
    });
};
