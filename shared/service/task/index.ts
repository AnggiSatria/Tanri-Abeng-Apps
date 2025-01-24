import { removeEmptyAttributes } from "shared/utils";
import api from "../api";
import QueryString from "qs";

const postTask = async (payload: any) => {
  return api.post(`/Task`, payload);
};

const getTask = async (activeFilter: any, token: string | null) => {
  const queryString = QueryString.parse(
    removeEmptyAttributes(activeFilter || "")
  );
  return api.get(`/Task`, {
    params: { ...queryString },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getTaskById = async (
  activeFilter: any,
  token: string | null,
  id: string
) => {
  const queryString = QueryString.parse(
    removeEmptyAttributes(activeFilter || "")
  );
  return api.get(`/Task/${id}`, {
    params: { ...queryString },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getTaskBySummary = async (activeFilter: any, token: string | null) => {
  const queryString = QueryString.parse(
    removeEmptyAttributes(activeFilter || "")
  );
  return api.get(`/Task/summary`, {
    params: { ...queryString },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getTaskByCount = async (activeFilter: any, token: string | null) => {
  const queryString = QueryString.parse(
    removeEmptyAttributes(activeFilter || "")
  );
  return api.get(`/Task/count`, {
    params: { ...queryString },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const patchTask = async (payload: any, id: string, token: string) => {
  return api.patch(`/Task/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const deleteTask = async (id: string, token: string) => {
  return api.delete(`/Task/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export {
  postTask,
  getTask,
  getTaskById,
  getTaskBySummary,
  getTaskByCount,
  patchTask,
  deleteTask,
};
