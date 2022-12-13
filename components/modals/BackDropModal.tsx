import { Loading, Modal, Text } from '@nextui-org/react'

export const BackDropModal = () => {
  return (
    <Modal preventClose blur>
      <Modal.Header>
        <Text h2 id="modal-title">
          Loading
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Loading size="md" />
      </Modal.Body>
    </Modal>
  )
}
