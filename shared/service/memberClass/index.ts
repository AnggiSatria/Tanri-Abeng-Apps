import { removeEmptyAttributes } from "shared/utils";
import api from "../api";
import QueryString from "qs";

const postMemberClass = async (payload: any, token: string | any) => {
  return api.post(`/MemberClass`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getMemberClass = async (activeFilter: any, token: string | null) => {
  const queryString = QueryString.parse(
    removeEmptyAttributes(activeFilter || "")
  );
  return api.get(`/MemberClass`, {
    params: { ...queryString },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getMemberClassById = async (
  activeFilter: any,
  token: string | null,
  id: string
) => {
  const queryString = QueryString.parse(
    removeEmptyAttributes(activeFilter || "")
  );
  return api.get(`/MemberClass/${id}`, {
    params: { ...queryString },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getMemberClassBySummary = async (
  activeFilter: any,
  token: string | null
) => {
  const queryString = QueryString.parse(
    removeEmptyAttributes(activeFilter || "")
  );
  return api.get(`/MemberClass/summary`, {
    params: { ...queryString },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getMemberClassByCount = async (
  activeFilter: any,
  token: string | null
) => {
  const queryString = QueryString.parse(
    removeEmptyAttributes(activeFilter || "")
  );
  return api.get(`/MemberClass/count`, {
    params: { ...queryString },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const patchMemberClass = async (payload: any, id: string, token: string) => {
  return api.patch(`/MemberClass/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const deleteMemberClass = async (id: string, token: string) => {
  return api.delete(`/MemberClass/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export {
  postMemberClass,
  getMemberClass,
  getMemberClassById,
  getMemberClassBySummary,
  getMemberClassByCount,
  patchMemberClass,
  deleteMemberClass,
};
