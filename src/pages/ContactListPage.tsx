import { useMemo, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { ContactCard } from 'src/components/ContactCard';
import { FilterForm, FilterFormValues } from 'src/components/FilterForm';
import { ModalAddContact } from 'src/components/ModalAddContact';
import { useGetContactsQuery } from 'src/store/contacts';
import { useGetGroupContactsQuery } from 'src/store/groupContacts';

export const ContactListPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [filterValues, setFilterValues] = useState<Partial<FilterFormValues>>({});
  
  const getContacts = useGetContactsQuery();
  const contacts = useMemo(() => getContacts.data || [], [getContacts.data]);
  const groupContactsHook = useGetGroupContactsQuery();
  const groupContacts = useMemo(() => groupContactsHook.data || [], [groupContactsHook.data]);

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
}