import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import PrivacyPolicy from './components/PrivacyPolicy';
import FormPage from './components/FormPage';

const policyContent = (
  <>
    <p>
      We value your privacy. This policy explains how we collect, store,
      and use your data. By clicking “Accept”, you agree to our terms.
    </p>

    <h2>Information We Collect</h2>
    <ul>
      <li>Name and contact details.</li>
      <li>IP address (for security).</li>
      <li>Usage data from the form itself.</li>
    </ul>

    <p>
      For more details, see our{' '}
      <a href="https://example.com/full-privacy" target="_blank">
        full privacy policy
      </a>.
    </p>
  </>
);


const PolicyWrapper: React.FC = () => {
  const navigate = useNavigate();

  return (
    <PrivacyPolicy
      title="Example Privacy Policy"
      content={policyContent}
      acceptButtonLabel="I Agree"
      declineButtonLabel="No, Thanks"
      onAccept={() => navigate('/form')}
    />
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PolicyWrapper />} />
        <Route path="/form" element={<FormPage />} />
      </Routes>
    </Router>
  );
};

export default App;
