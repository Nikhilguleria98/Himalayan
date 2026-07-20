import { Outlet } from 'react-router-dom';
import Providers from './components/GlobalComp/providers';
import LayoutWrapper from './components/GlobalComp/LayoutWrapper';
import ScrollToTop from './Scroll';

export default function Layout() {
  return (
    <Providers>
      <LayoutWrapper>
        <ScrollToTop /> {/* Renders nested route components */}
        <Outlet /> {/* Renders nested route components */}
      </LayoutWrapper>
    </Providers>
  );
}
