import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useGetContactsQuery } from 'src/store/contacts';
import { useAddGroupContactMutation } from 'src/store/groupContacts';
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto';

interface ModalAddGroupProps {
  show: boolean;
  onHide: () => void;
}

const initialFormData: GroupContactsDto = {
    id: '',
    name: '',
    description: '',
    photo: '',
    contactIds: []
}

export const ModalAddGroup: React.FC<ModalAddGroupProps> = ({ show, onHide }) => {
  const contacts = useGetContactsQuery().data || undefined;
  const [addGroup] = useAddGroupContactMutation();
  const [formData, setFormData] = useState<GroupContactsDto>(initialFormData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContactSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setFormData(prev => ({
      ...prev,
      contactIds: selectedOptions
    }));
  };

  const handleSubmit = () => {
    console.log('Данные группы:', formData);
    formData.id = crypto.randomUUID();
    addGroup(formData);
    setFormData(initialFormData);
    onHide();
  };

  const handleClose = () => {
    setFormData(initialFormData);
    onHide();
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Добавить новую группу контактов</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Название группы</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Введите название группы"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Описание</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Введите описание группы"
              rows={3}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Фото группы (URL)</Form.Label>
            <Form.Control
              type="url"
              name="photo"
              value={formData.photo}
              onChange={handleInputChange}
              placeholder="Введите URL фотографии группы"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Выберите контакты</Form.Label>
            <Form.Select
              multiple
              value={formData.contactIds}
              onChange={handleContactSelect}
            >
              {contacts && contacts.map(contact => (
                <option key={contact.id} value={contact.id}>
                  {contact.name} ({contact.phone})
                </option>
              ))}
            </Form.Select>
            <Form.Text className="text-muted">
              {formData.contactIds.length > 0 
                ? `Выбрано контактов: ${formData.contactIds.length}` 
                : 'Для выбора нескольких контактов удерживайте Ctrl (Cmd на Mac)'}
            </Form.Text>
          </Form.Group>

          {formData.contactIds.length > 0 && (
            <Form.Group className="mb-3">
              <Form.Label>Выбранные контакты:</Form.Label>
              <div className="border p-2 rounded bg-light">
                {formData.contactIds.map(id => {
                  return (
                    <div key={id} className="badge bg-primary me-1 mb-1">
                      {contacts ? contacts.find(contact => contact.id === id)?.name : 'Неизвестный контакт'}
                    </div>
                  );
                })}
              </div>
            </Form.Group>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Отмена
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Создать группу
        </Button>
      </Modal.Footer>
    </Modal>
  );
};