import { CustomTable } from '@/components/table'
import { DEVICE_ID, USER_ID } from '@/constants/auth'
import { useApiCall } from '@/hooks'
import { generateToken, getTotalPage } from '@/lib'
import { getListUser } from '@/services'
import { UserListSuccess, UserResponseSuccess } from '@/types'
import { Button, Pagination, Text } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { HeaderUserTable, ListActions, listFunctionParseValue } from './management.inventory'

export const UserManagement = () => {
  const [cookies] = useCookies([DEVICE_ID, USER_ID])

  const [page, setPage] = useState<number>(1)

  const router = useRouter()

  const result = useApiCall<UserListSuccess, String>({
    callApi: () =>
      getListUser(
        generateToken({
          userId: cookies.userId,
          deviceId: cookies.deviceId,
        }),
        { page: page.toString() }
      ),
  })

  const { data, loading, setLetCall } = result

  useEffect(() => {
    setLetCall(true)
  }, [page])

  const listFunctionParseValues = listFunctionParseValue()

  const headerUserTables = HeaderUserTable()

  const listActions = ListActions()

  return (
    <>
      <Text showIn="sm" h2>
        User Management
      </Text>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text hideIn="sm" h1>
          User Management
        </Text>
        <Button
          onClick={() => {
            router.push('/user/create')
          }}
          size="sm"
        >
          Create User
        </Button>
      </div>
      <CustomTable<UserResponseSuccess>
        header={headerUserTables}
        body={data ? data.result.data : []}
        listActions={listActions}
        selectionMode="single"
        listFunctionParseValue={listFunctionParseValues}
        loading={loading}
      >
        <>{null}</>
      </CustomTable>
      {!loading && (
        <Pagination
          shadow
          color="default"
          total={getTotalPage(data?.result.totalRows || 0, 10)}
          onChange={(number) => setPage(number)}
          page={page}
          css={{ marginTop: 20 }}
        />
      )}
    </>
  )
}
