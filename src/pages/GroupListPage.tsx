import { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { GroupContactsCard } from 'src/components/GroupContactsCard';
import { ModalAddGroup } from 'src/components/ModalAddGroup';
import { useGetGroupContactsQuery } from 'src/store/groupContacts';

export const GroupListPage = () => {
  const [showModal, setShowModal] = useState(false);
  const groupContacts = useGetGroupContactsQuery().data || [];
  return (
    <>
      <Row xxl={1}>
        <Col className="mx-auto">
          <Button onClick={() => setShowModal(true)}>Добавить</Button>
        </Col>
      </Row>
      <Row xxl={4}>
        {groupContacts.map((groupContact) => (
          <Col key={groupContact.id}>
            <GroupContactsCard groupContacts={groupContact} withLink />
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
