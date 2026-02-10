import {Col, Row} from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import {ContactCard} from 'src/components/ContactCard';
import {Empty} from 'src/components/Empty';
import { useGetContactsQuery } from 'src/store/contacts';


export const ContactPage = () => {
  const {contactId} = useParams<{ contactId: string }>();
  const contacts = useGetContactsQuery().data || undefined;
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
};
