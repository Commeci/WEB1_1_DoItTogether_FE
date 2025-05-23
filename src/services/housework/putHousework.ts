import { axiosInstance } from '@/services/axiosInstance';
import { PutHouseworkReq, PutHouseworkRes } from '@/types/apis/houseworkApi';

export const putHousework = async ({
  channelId,
  houseworkId,
  category,
  task,
  startDate,
  startTime,
  userId,
  status,
}: PutHouseworkReq) => {
  const response = await axiosInstance.put<PutHouseworkRes>(
    `api/v1/channels/${channelId}/houseworks/${houseworkId}`,
    { category, task, startDate, startTime, userId, status }
  );
  return response.data;
};
