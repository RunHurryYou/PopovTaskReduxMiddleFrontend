import {Col, Row} from 'react-bootstrap';
import {ContactCard} from 'src/components/ContactCard';
import { useAppSelector } from 'src/store/hooks';

export const FavoritListPage = (() => {
  const favContacts = useAppSelector((state) => state.favoriteContacts);
  return (
    <Row xxl={4} className="g-4">
      {favContacts.ids.map((id) => (
        <Col key={id}>
          <ContactCard contact={favContacts.entities[id]} withLink />
        </Col>
      ))}
    </Row>
  );
})
