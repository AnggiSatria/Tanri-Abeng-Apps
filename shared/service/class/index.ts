import { removeEmptyAttributes } from "shared/utils";
import api from "../api";
import QueryString from "qs";

const postClass = async (payload: any) => {
  return api.post(`/Class`, payload);
};

const getClass = async (activeFilter: any, token: string | null) => {
  const queryString = QueryString.parse(
    removeEmptyAttributes(activeFilter || "")
  );
  return api.get(`/Class`, {
    params: { ...queryString },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getClassById = async (
  activeFilter: any,
  token: string | null,
  id: string
) => {
  const queryString = QueryString.parse(
    removeEmptyAttributes(activeFilter || "")
  );
  return api.get(`/Class/${id}`, {
    params: { ...queryString },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getClassBySummary = async (activeFilter: any, token: string | null) => {
  const queryString = QueryString.parse(
    removeEmptyAttributes(activeFilter || "")
  );
  return api.get(`/Class/summary`, {
    params: { ...queryString },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getClassByCount = async (activeFilter: any, token: string | null) => {
  const queryString = QueryString.parse(
    removeEmptyAttributes(activeFilter || "")
  );
  return api.get(`/Class/count`, {
    params: { ...queryString },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const patchClass = async (payload: any, id: string, token: string) => {
  return api.patch(`/Class/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const deleteClass = async (id: string, token: string) => {
  return api.delete(`/Class/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export {
  postClass,
  getClass,
  getClassById,
  getClassBySummary,
  getClassByCount,
  patchClass,
  deleteClass,
};
