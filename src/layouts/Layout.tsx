import { Layout as RALayout, CheckForApplicationUpdate } from 'react-admin';
import { AppBar } from './AppBar';
import { Sidebar } from './Sidebar';

export const Layout = ({ children }: { children: React.ReactNode }) => (
  <RALayout
    appBar={AppBar}
    sidebar={Sidebar}
    className="bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 bg-fixed"
  >
    {children}
    <CheckForApplicationUpdate />
  </RALayout>
);