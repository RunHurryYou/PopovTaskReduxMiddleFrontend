import {memo} from 'react';
import {Badge, Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { deleteGroupContactsActionCreator } from 'src/store/groupContacts/groupContactsActions';
import { useAppDispatch } from 'src/store/hooks';
import {GroupContactsDto} from 'src/types/dto/GroupContactsDto';

interface GroupContactsCardProps {
  groupContacts: GroupContactsDto,
  withLink?: boolean
}

export const GroupContactsCard = memo<GroupContactsCardProps>(({
    groupContacts: {
      id,
      name,
      description,
      photo,
      contactIds
    }, withLink
  }) => {
    const dispatch = useAppDispatch();

    const handleDelete = () => {
      dispatch(deleteGroupContactsActionCreator(id));
    }
    return (
      <Card key={id}>
        <Card.Header>
          {withLink ? <Link to={`/groups/${id}`}>{name}</Link> : name}
        </Card.Header>
        <Card.Body>{description}<Badge
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
            </Badge></Card.Body>
        <Card.Img variant="top" src={photo} />
        <Card.Footer>Contacts: {contactIds.length}</Card.Footer>
      </Card>
    );
  }
)
