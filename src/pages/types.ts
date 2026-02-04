import {State} from 'src/types/common';
import {GroupContactsDto} from 'src/types/dto/GroupContactsDto';

export interface CommonPageProps {
  groupContactsState: State<GroupContactsDto[]>
}
