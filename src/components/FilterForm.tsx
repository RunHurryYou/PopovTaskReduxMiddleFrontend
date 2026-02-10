import {Formik} from 'formik';
import {Button, Col, Form, InputGroup, Row} from 'react-bootstrap';
import {FormikConfig} from 'formik/dist/types';
import { groupContactsStore } from 'src/store/groupContactsStore';
import { observer } from 'mobx-react-lite';

export interface FilterFormValues {
  name: string,
  groupId: string
}

export const FilterForm = observer<FormikConfig<Partial<FilterFormValues>>>(({
  onSubmit,
  initialValues = {}
}) => {
  const groupContacts = groupContactsStore.groupContacts;
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({handleChange, handleSubmit}) => (
        <Form onSubmit={handleSubmit} onChange={handleSubmit}>
          <Row xxl={4} className="g-4">
            <Col>
              <InputGroup className="mb-3">
                <Form.Control
                  id={'name'}
                  name={'name'}
                  onChange={handleChange}
                  placeholder="name"
                  aria-label="name"
                />
              </InputGroup>
            </Col>
            <Col>
              <Form.Select
                id={'groupId'}
                name={'groupId'}
                aria-label="Поиск по группе"
                onChange={handleChange}
              >
                <option>Open this select menu</option>
                {groupContacts.map((group) => (
                  <option value={group.id} key={group.id}>{group.name}</option>
                ))}
              </Form.Select>
            </Col>
            <Col>
              <Button variant={'primary'} type={'submit'}>Применить</Button>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
})
