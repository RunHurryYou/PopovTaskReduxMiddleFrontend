import {memo} from 'react';
import {ContactDto} from 'src/types/dto/ContactDto';
import {Badge, Card, ListGroup} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { deleteContactFromGroupActionCreator } from 'src/store/groupContacts/groupContactsActions';
import { deleteContactActionCreator } from 'src/store/contacts/contactsActions';
import { deleteContactFromFavoriteActionCreator, switchFavoriteContactsActionCreator } from 'src/store/favContacts/favContactsActions';

interface ContactCardProps {
  contact: ContactDto,
  withLink?: boolean
}

export const ContactCard = memo<ContactCardProps>(({
    contact: {
      photo,
      id,
      name,
      phone,
      birthday,
      address
    }, withLink
  }) => {
    const dispatch = useAppDispatch();
    const favContacts = useAppSelector((state)=> state.favoriteContacts);

    const handleDelete = () => {
      dispatch(deleteContactFromGroupActionCreator(id));
      dispatch(deleteContactActionCreator(id));
      dispatch(deleteContactFromFavoriteActionCreator(id));
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
              onClick={() => dispatch(switchFavoriteContactsActionCreator({id, name, phone, birthday, address, photo}))} 
              pill 
              bg="transparent"
              className="fs-5 border-0 p-0"
              style={{ 
                color: favContacts.ids.includes(id) ? 'red' : 'rgba(255, 255, 255, 0.8)',
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