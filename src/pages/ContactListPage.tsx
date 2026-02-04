import { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { ContactCard } from 'src/components/ContactCard';
//import { FilterFormValues } from 'src/components/FilterForm';
//import { ContactDto } from 'src/types/dto/ContactDto';
import { ModalAddContact } from 'src/components/ModalAddContact';
import { useAppSelector } from 'src/store/hooks';

export const ContactListPage = () => {
  const [showModal, setShowModal] = useState(false);
  const contacts = useAppSelector((state) => state.contacts);

  // const onSubmit = (fv: Partial<FilterFormValues>) => {
  //   let findContacts: ContactDto[] = contacts.ids.map((id) => contacts.entities[id]);

  //   if (fv.name) {
  //     const fvName = fv.name.toLowerCase();
  //     findContacts = findContacts.filter(({ name }) => (
  //       name.toLowerCase().indexOf(fvName) > -1
  //     ))
  //   }

  //   if (fv.groupId) {
  //     const groupContacts = groupContactsState[0].find(({ id }) => id === fv.groupId);

  //     if (groupContacts) {
  //       findContacts = findContacts.filter(({ id }) => (
  //         groupContacts.contactIds.includes(id)
  //       ))
  //     }
  //   }

  //   console.log(findContacts);
  // }

  return (
    <>
      <Row xxl={1}>
        <Col className="mb-3">
          {/* <FilterForm groupContactsList={groupContactsState[0]} initialValues={{}} onSubmit={onSubmit} /> */}
          <Button onClick={() => setShowModal(true)}>Добавить</Button>
        </Col>
        <Col>
          <Row xxl={4} className="g-4">
            {contacts.ids.map((id) => (
              <Col key={id}>
                <ContactCard contact={contacts.entities[id]} withLink />
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
