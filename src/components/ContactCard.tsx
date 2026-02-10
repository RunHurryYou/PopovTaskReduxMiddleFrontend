import {ContactDto} from 'src/types/dto/ContactDto';
import {Badge, Card, ListGroup} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { contactsStore } from 'src/store/contactsStore';
import { observer } from 'mobx-react-lite';

interface ContactCardProps {
  contact: ContactDto,
  withLink?: boolean,
  groupId?: string
}

export const ContactCard = observer<ContactCardProps>(({
    contact: {
      photo,
      id,
      name,
      phone,
      birthday,
      address
    }, 
    withLink,
    groupId
  }) => {

    const contacts = contactsStore.contacts;

    const handleDelete = async () => {
      await contactsStore.delete(id);
    }
    return (
      <Card key={id}>
        <Card.Img variant="top" src={photo} />
        <Card.Body>
          <Card.Title>
            {withLink ? <Link to={`/contact/${id}`}>{name}</Link> : name}
          </Card.Title>
          
          <div className="position-absolute top-0 end-0 m-2 d-flex gap-2">
            <Badge
              onClick={() => contactsStore.switchFavorite(id)} 
              pill 
              bg="transparent"
              className="fs-5 border-0 p-0"
              style={{ 
                color: contacts && contacts.find((contact) => contact.id === id && contact.favorite) ? 'red' : 'rgba(255, 255, 255, 0.8)',
                textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                cursor: 'pointer',
                width: '30px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ♥
            </Badge>
            <Badge
              onClick={handleDelete}
              pill 
              bg="transparent"
              className="fs-5 border-0 p-0"
              style={{ 
                color: 'rgba(255, 255, 255, 0.8)',
                textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                cursor: 'pointer',
                width: '30px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              🗑️
            </Badge>
          </div>
          
          <Card.Body>
            <ListGroup>
              <ListGroup.Item><Link to={`tel:${phone}`} target="_blank">{phone}</Link></ListGroup.Item>
              <ListGroup.Item>{birthday}</ListGroup.Item>
              <ListGroup.Item>{address}</ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card.Body>
      </Card>
    );
  }
)