import {Col, Row} from 'react-bootstrap';
import {ContactCard} from 'src/components/ContactCard';
import { useGetContactsQuery } from 'src/store/contacts';

export const FavoritListPage = (() => {
  const contacts = useGetContactsQuery().data || undefined;
  const favContacts = contacts ? contacts.filter((contact) => contact.favorite) : undefined;
  return (
    <Row xxl={4} className="g-4">
      {favContacts && favContacts.map((contact) => (
        <Col key={contact.id}>
          <ContactCard contact={contact} withLink />
        </Col>
      ))}
    </Row>
  );
})
