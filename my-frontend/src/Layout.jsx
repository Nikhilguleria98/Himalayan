import { Outlet } from 'react-router-dom';
import Providers from './components/GlobalComp/providers';
import LayoutWrapper from './components/GlobalComp/LayoutWrapper';

export default function Layout() {
  return (
    <Providers>
      <LayoutWrapper>
        <Outlet /> {/* Renders nested route components */}
      </LayoutWrapper>
    </Providers>
  );
}
