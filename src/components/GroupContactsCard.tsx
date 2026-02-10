import { observer } from 'mobx-react-lite';
import {Badge, Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { groupContactsStore } from 'src/store/groupContactsStore';
import {GroupContactsDto} from 'src/types/dto/GroupContactsDto';

interface GroupContactsCardProps {
  id: GroupContactsDto['id'],
  withLink?: boolean
}

export const GroupContactsCard = observer (({
    id, withLink
  }: GroupContactsCardProps) => {
    const {name, description, photo, contactIds} = groupContactsStore.groupContacts.find((groupContact) => groupContact.id === id) || { name: '', description: '', photo: '', contactIds: [] };
    const handleDelete = () => {
      groupContactsStore.delete(id);
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
