import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { contactsStore } from 'src/store/contactsStore';
import { ContactDto } from 'src/types/dto/ContactDto';

interface ModalAddProps {
  show: boolean;
  onHide: () => void;
}

const initialFormData: ContactDto = {
  id: '',
  phone: '',
  name: '',
  birthday: '',
  address: '',
  photo: '',
  favorite: false
};

export const ModalAddContact: React.FC<ModalAddProps> = ({ show, onHide }) => {
  const [formData, setFormData] = useState<ContactDto>(initialFormData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    formData.id = crypto.randomUUID();
    contactsStore.add(formData);
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
        <Modal.Title>Добавить новый контакт</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Имя</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Введите имя"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Телефон</Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Введите телефон"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Дата рождения</Form.Label>
            <Form.Control
              type="date"
              name="birthday"
              value={formData.birthday}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Адрес</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Введите адрес"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Фото (URL)</Form.Label>
            <Form.Control
              type="url"
              name="photo"
              value={formData.photo}
              onChange={handleInputChange}
              placeholder="Введите URL фотографии"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Отмена
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Сохранить контакт
        </Button>
      </Modal.Footer>
    </Modal>
  );
};