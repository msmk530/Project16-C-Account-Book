import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import PaymentProvider from './store/PaymentMethod/paymentMethodContext';
import DateInfoProvider from './store/DateInfo/dateInfoContext';
import TransactionInfoProvider from './store/AccountBook/accountBookDataContext';
import ThemeProvider from './store/Theme/themeContext';
import './app.scss';
// import AccountBookListPage from './pages/AccountBook';
// import CalendarPage from './pages/Calendar';
// import LoginPage from './pages/Login';
// import TransactionPage from './pages/Transaction';
// import ChartPage from './pages/Chart';
// import SettingPage from './pages/SettingPage';

import GithubLoginProcess from './pages/Login/GithubLoginProcess';
import NaverLoginProcess from './pages/Login/NaverLoginProcess';

const LoginPage = lazy(() => import('./pages/Login'));
const CalendarPage = lazy(() => import('./pages/Calendar'));
const AccountBookListPage = lazy(() => import('./pages/AccountBook'));
const TransactionPage = lazy(() => import('./pages/transaction'));
const ChartPage = lazy(() => import('./pages/Chart'));
const SettingPage = lazy(() => import('./pages/SettingPage'));
const App = () => {
  if (!localStorage.getItem('theme')) {
    localStorage.setItem('theme', 'dark');
  }

  return (
    <ThemeProvider>
      <DateInfoProvider>
        <TransactionInfoProvider>
          <PaymentProvider>
            <Router>
              <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                  <Route exact path="/" component={AccountBookListPage} />
                  <Route exact path="/login" component={LoginPage} />
                  <Route
                    exact
                    path="/auth/github"
                    component={GithubLoginProcess}
                  />
                  <Route
                    exact
                    path="/auth/naver"
                    component={NaverLoginProcess}
                  />
                  <Route exact path="/calendar">
                    <CalendarPage />
                  </Route>
                  <Route
                    exact
                    path="/transaction"
                    component={TransactionPage}
                  />
                  <Route exact path="/chart" component={ChartPage} />
                  <Route exact path="/setting" component={SettingPage} />
                </Switch>
              </Suspense>
            </Router>
          </PaymentProvider>
        </TransactionInfoProvider>
      </DateInfoProvider>
    </ThemeProvider>
  );
};

export default App;
