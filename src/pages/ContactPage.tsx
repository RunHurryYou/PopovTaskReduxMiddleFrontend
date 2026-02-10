import { observer } from 'mobx-react-lite';
import {Col, Row} from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import {ContactCard} from 'src/components/ContactCard';
import {Empty} from 'src/components/Empty';
import { contactsStore } from 'src/store/contactsStore';


export const ContactPage = observer(() => {
  const {contactId} = useParams<{ contactId: string }>();
  const contacts = contactsStore.contacts;
  const contact = contacts?.find((contact) => contact.id === contactId);

  if (!contactId || !contact) {
    return <Empty />;
  }

  return (
    <Row xxl={3}>
      <Col className={'mx-auto'}>
        {contact ? <ContactCard contact={contact} /> : <Empty />}
      </Col>
    </Row>
  );
}
);
