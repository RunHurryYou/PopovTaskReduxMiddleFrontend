import { observer } from 'mobx-react-lite';
import {Col, Row} from 'react-bootstrap';
import {ContactCard} from 'src/components/ContactCard';
import { contactsStore } from 'src/store/contactsStore';

export const FavoritListPage = observer(() => {
  const contacts = contactsStore.contacts;
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
