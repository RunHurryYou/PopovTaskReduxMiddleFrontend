import {Col, Row} from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import {GroupContactsCard} from 'src/components/GroupContactsCard';
import {Empty} from 'src/components/Empty';
import {ContactCard} from 'src/components/ContactCard';
import { useGetContactsQuery } from 'src/store/contacts';
import { useGetGroupContactsQuery } from 'src/store/groupContacts';

export const GroupPage = () => {
  const {groupId} = useParams<{ groupId: string }>();
  const groupContacts = useGetGroupContactsQuery().data || [];
  const groupContact = groupContacts.find((groupContact) => groupContact.id === groupId);
  const contacts = useGetContactsQuery().data || undefined;

  if (!groupId || !groupContacts || !contacts || !groupContact) {
    return <Empty />;
  }

  const filteredContacts = contacts.filter((contact) => groupContact?.contactIds.includes(contact.id));

  return (
    <Row className="g-4">
      {groupContacts ? (
        <>
          <Col xxl={12}>
            <Row xxl={3}>
              <Col className="mx-auto">
                <GroupContactsCard groupContacts={groupContact} />
              </Col>
            </Row>
          </Col>
          <Col>
            <Row xxl={4} className="g-4">
              {filteredContacts.map((contact) => (
                <Col key={contact.id}>
                  <ContactCard contact={contact} withLink groupId={groupId}/>
                </Col>
              ))}
            </Row>
          </Col>
        </>
      ) : <Empty />}
    </Row>
  );
};
