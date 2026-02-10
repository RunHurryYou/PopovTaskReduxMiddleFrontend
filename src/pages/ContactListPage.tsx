import { observer } from 'mobx-react-lite';
import { useMemo, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { ContactCard } from 'src/components/ContactCard';
import { FilterForm, FilterFormValues } from 'src/components/FilterForm';
import { ModalAddContact } from 'src/components/ModalAddContact';
import { contactsStore } from 'src/store/contactsStore';
import { groupContactsStore } from 'src/store/groupContactsStore';

export const ContactListPage = observer(() => {
  const [showModal, setShowModal] = useState(false);
  const [filterValues, setFilterValues] = useState<Partial<FilterFormValues>>({});
  
  const contacts = contactsStore.contacts
  const groupContacts = groupContactsStore.groupContacts

  const filteredContacts = useMemo(() => {
    if (!contacts || contacts.length === 0) return [];
    
    let result = [...contacts];

    if (filterValues.name) {
      const searchName = filterValues.name.toLowerCase();
      result = result.filter((contact) => 
        contact.name.toLowerCase().includes(searchName)
      );
    }

    if (filterValues.groupId && filterValues.groupId !== "Open this select menu") {
      const group = groupContacts.find(g => g.id === filterValues.groupId);
      if (group) {
        result = result.filter((contact) => 
          group.contactIds.includes(contact.id)
        );
      }
    }

    return result;
  }, [contacts, filterValues.groupId, filterValues.name, groupContacts]);

  const handleSubmit = (fv: Partial<FilterFormValues>) => {
    setFilterValues(fv);
  };

  const handleReset = () => {
    setFilterValues({});
  };

  return (
    <>
      <Row xxl={1}>
        <Col className="mb-3">
          <FilterForm 
            initialValues={{}} 
            onSubmit={handleSubmit}
            onReset={handleReset}
          />
          <Button onClick={() => setShowModal(true)}>Добавить</Button>
        </Col>
        <Col>
          <Row xxl={4} className="g-4">
            {filteredContacts.map((elem) => (
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
});