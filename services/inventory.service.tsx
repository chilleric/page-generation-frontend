import { apiRoute } from '@/constants/apiRoutes'
import axiosInstance from '@/lib/axios/request'
import { InventoryRequest } from '@/types'
import { QueryParams } from '@/types/common'

export const getListInventory = (token: string, params?: QueryParams) => {
  return axiosInstance.get(apiRoute.inventory.inventory, {
    params,
    headers: {
      Authorization: token,
    },
  })
}

export const getDetailInventory = ({ id, token }: { id: string; token: string }) => {
  return axiosInstance.get(apiRoute.inventory.detailInventory, {
    headers: {
      Authorization: token,
    },
    params: {
      id,
    },
  })
}

export const addNewInventory = ({
  inventory,
  token,
}: {
  inventory: InventoryRequest
  token: string
}) => {
  return axiosInstance.post(apiRoute.inventory.inventory, inventory, {
    headers: {
      Authorization: token,
    },
  })
}
