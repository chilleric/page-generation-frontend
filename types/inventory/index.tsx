import { CSSProperties } from 'react'

export interface InventoryRequest {
  name: string
  data: Inventory
}

export type Inventory = {
  targetId: string
  type: InventoryTypeEnum
  css: { [key: string]: CSSProperties }
  typeList: Inventory
  children: Inventory[]
}

export enum InventoryTypeEnum {
  COMPONENTS = 'COMPONENTS',
  IMAGE = 'IMAGE',
  TITLE = 'TITLE',
  SLIDER = 'SLIDER',
  LIST = 'LIST',
}
