import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { GroupContactsCard } from 'src/components/GroupContactsCard';
import { ModalAddGroup } from 'src/components/ModalAddGroup';
import { groupContactsStore } from 'src/store/groupContactsStore';

export const GroupListPage = observer(() => {
  const [showModal, setShowModal] = useState(false);
  const groupContacts = groupContactsStore.groupContacts;
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
            <GroupContactsCard id={groupContact.id} withLink />
          </Col>
        ))}
      </Row>
      <ModalAddGroup
        show={showModal}
        onHide={() => setShowModal(false)}
      />
    </>
  );
});
