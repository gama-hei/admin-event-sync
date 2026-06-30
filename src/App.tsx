import { Admin, Resource } from 'react-admin';
import { Layout } from './layouts/Layout';
import dataProvider from './provider/dataProvider';
import authProvider from './provider/authProvider';
import { theme } from './theme';
import { Dashboard } from './pages';

import {
  EventList,
  EventCreate,
  EventEdit,
  EventShow,
  SessionList,
  SessionCreate,
  SessionEdit,
  RoomList,
  RoomCreate,
  RoomEdit,
  SpeakerList,
  SpeakerCreate,
  SpeakerEdit,
} from './ressources/';
import { LoginPage } from './pages/Login';

export const App = () => (
  <Admin
    layout={Layout}
    dataProvider={dataProvider}
    authProvider={authProvider}
    loginPage={LoginPage}
    theme={theme}
    title="EventSync Admin"
    dashboard={Dashboard}
  >
    <Resource
      name="events"
      list={EventList}
      create={EventCreate}
      edit={EventEdit}
      show={EventShow}
      options={{ label: 'Événements' }}
    />
    <Resource
      name="sessions"
      list={SessionList}
      create={SessionCreate}
      edit={SessionEdit}
      options={{ label: 'Sessions' }}
    />
    <Resource
      name="rooms"
      list={RoomList}
      create={RoomCreate}
      edit={RoomEdit}
      options={{ label: 'Salles' }}
    />
    <Resource
      name="speakers"
      list={SpeakerList}
      create={SpeakerCreate}
      edit={SpeakerEdit}
      options={{ label: 'Intervenants' }}
    />
  </Admin>
);