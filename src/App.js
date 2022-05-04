// routes
import { Toaster } from 'react-hot-toast';
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';

// ----------------------------------------------------------------------

export default function App() {
  return (

    <ThemeConfig>
      <ScrollToTop />
      <GlobalStyles />
      <Toaster />
      <BaseOptionChartStyle />

      <Router />
    </ThemeConfig>

  );
}
