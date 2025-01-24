import { removeEmptyAttributes } from "shared/utils";
import api from "../api";
import QueryString from "qs";

const postTeachers = async (payload: any, token: string | any) => {
  return api.post(`/Teachers`, payload, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
};

const getTeachers = async (activeFilter: any, token: string | null) => {
  const queryString = QueryString.parse(
    removeEmptyAttributes(activeFilter || "")
  );
  return api.get(`/Teachers`, {
    params: { ...queryString },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getTeachersById = async (
  activeFilter: any,
  token: string | null,
  id: string
) => {
  const queryString = QueryString.parse(
    removeEmptyAttributes(activeFilter || "")
  );
  return api.get(`/Teachers/${id}`, {
    params: { ...queryString },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getTeachersBySummary = async (
  activeFilter: any,
  token: string | null
) => {
  const queryString = QueryString.parse(
    removeEmptyAttributes(activeFilter || "")
  );
  return api.get(`/Teachers/summary`, {
    params: { ...queryString },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getTeachersByCount = async (activeFilter: any, token: string | null) => {
  const queryString = QueryString.parse(
    removeEmptyAttributes(activeFilter || "")
  );
  return api.get(`/Teachers/count`, {
    params: { ...queryString },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const patchTeachers = async (payload: any, id: string, token: string) => {
  return api.patch(`/Teachers/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const deleteTeachers = async (id: string, token: string) => {
  return api.delete(`/Teachers/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export {
  postTeachers,
  getTeachers,
  getTeachersById,
  getTeachersBySummary,
  getTeachersByCount,
  patchTeachers,
  deleteTeachers,
};
