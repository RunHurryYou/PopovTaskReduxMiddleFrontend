import { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { ContactCard } from 'src/components/ContactCard';
import { FilterForm, FilterFormValues } from 'src/components/FilterForm';
import { ModalAddContact } from 'src/components/ModalAddContact';
import { useAppSelector } from 'src/store/hooks';
import { ContactDto } from 'src/types/dto/ContactDto';

export const ContactListPage = () => {
  const [showModal, setShowModal] = useState(false);
  const contacts = useAppSelector((state) => state.contacts);
  const groupContactsState = useAppSelector((state) => state.groupContacts);
  const [findContacts, setFindContacts] = useState<ContactDto[]>(contacts.ids.map((id) => contacts.entities[id]));

  useEffect(() => {
    setFindContacts(contacts.ids.map((id) => contacts.entities[id]));
  }, [contacts]);

  const onSubmit = (fv: Partial<FilterFormValues>) => {

    let newContacts = contacts.ids.map((id) => contacts.entities[id]);

    if (fv.name) {
      const fvName = fv.name.toLowerCase();
      newContacts = newContacts.filter((contact) => contact.name.toLowerCase().includes(fvName));
    }

    if (fv.groupId) {
      const groupId = fv.groupId;
      if(groupId !== "Open this select menu")
        newContacts = newContacts.filter((contact) => groupContactsState.entities[groupId].contactIds.includes(contact.id));
    }

    setFindContacts(newContacts);
  }

  return (
    <>
      <Row xxl={1}>
        <Col className="mb-3">
          <FilterForm initialValues={{}} onSubmit={onSubmit} />
          <Button onClick={() => setShowModal(true)}>Добавить</Button>
        </Col>
        <Col>
          <Row xxl={4} className="g-4">
            {findContacts.map((elem) => (
              <Col key={elem.id}>
                <ContactCard contact={elem} withLink />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
      <ModalAddContact
        show={showModal}
        onHide={() => setShowModal(false)}
      />
    </>
  );
}
