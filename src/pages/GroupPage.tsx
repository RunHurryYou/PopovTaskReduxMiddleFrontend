import {Col, Row} from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import {GroupContactsCard} from 'src/components/GroupContactsCard';
import {Empty} from 'src/components/Empty';
import {ContactCard} from 'src/components/ContactCard';
import { useAppSelector } from 'src/store/hooks';

export const GroupPage = () => {
  const {groupId} = useParams<{ groupId: string }>();
  const contacts = useAppSelector((state) => state.contacts);
  const groupContacts = useAppSelector((state) => groupId ? state.groupContacts.entities[groupId]: undefined);

  if (!groupId || !groupContacts) {
    return <Empty />;
  }

  return (
    <Row className="g-4">
      {groupContacts ? (
        <>
          <Col xxl={12}>
            <Row xxl={3}>
              <Col className="mx-auto">
                <GroupContactsCard groupContacts={groupContacts} />
              </Col>
            </Row>
          </Col>
          <Col>
            <Row xxl={4} className="g-4">
              {groupContacts.contactIds.map((id) => (
                <Col key={id}>
                  <ContactCard contact={contacts.entities[id]} withLink />
                </Col>
              ))}
            </Row>
          </Col>
        </>
      ) : <Empty />}
    </Row>
  );
};
