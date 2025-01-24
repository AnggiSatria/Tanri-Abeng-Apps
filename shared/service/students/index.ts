import { removeEmptyAttributes } from "shared/utils";
import api from "../api";
import QueryString from "qs";

const postStudents = async (payload: any, token: string | any) => {
  return api.post(`/Students`, payload, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
};

const getStudents = async (activeFilter: any, token: string | null) => {
  const queryString = QueryString.parse(
    removeEmptyAttributes(activeFilter || "")
  );
  return api.get(`/Students`, {
    params: { ...queryString },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getStudentsById = async (
  activeFilter: any,
  token: string | null,
  id: string
) => {
  const queryString = QueryString.parse(
    removeEmptyAttributes(activeFilter || "")
  );
  return api.get(`/Students/${id}`, {
    params: { ...queryString },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getStudentsBySummary = async (
  activeFilter: any,
  token: string | null
) => {
  const queryString = QueryString.parse(
    removeEmptyAttributes(activeFilter || "")
  );
  return api.get(`/Students/summary`, {
    params: { ...queryString },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getStudentsByCount = async (activeFilter: any, token: string | null) => {
  const queryString = QueryString.parse(
    removeEmptyAttributes(activeFilter || "")
  );
  return api.get(`/Students/count`, {
    params: { ...queryString },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const patchStudents = async (payload: any, id: string, token: string) => {
  return api.patch(`/Students/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const deleteStudents = async (id: string, token: string) => {
  return api.delete(`/Students/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export {
  postStudents,
  getStudents,
  getStudentsById,
  getStudentsBySummary,
  getStudentsByCount,
  patchStudents,
  deleteStudents,
};
