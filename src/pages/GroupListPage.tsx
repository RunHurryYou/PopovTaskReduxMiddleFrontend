import { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { GroupContactsCard } from 'src/components/GroupContactsCard';
import { ModalAddGroup } from 'src/components/ModalAddGroup';
import { useAppSelector } from 'src/store/hooks';

export const GroupListPage = () => {
  const [showModal, setShowModal] = useState(false);
  const groupContactsState = useAppSelector((state) => state.groupContacts);
  return (
    <>
      <Row xxl={1}>
        <Col className="mx-auto">
          <Button onClick={() => setShowModal(true)}>Добавить</Button>
        </Col>
      </Row>
      <Row xxl={4}>
        {groupContactsState.ids.map((id) => (
          <Col key={id}>
            <GroupContactsCard groupContacts={groupContactsState.entities[id]} withLink />
          </Col>
        ))}
      </Row>
      <ModalAddGroup
        show={showModal}
        onHide={() => setShowModal(false)}
      />
    </>
  );
};
