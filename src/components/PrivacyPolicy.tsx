import React from 'react';
import './PrivacyPolicy.css';

export interface PrivacyPolicyProps {
  /** Page title – defaults to “Privacy Policy” */
  title?: string;

  /** Content of the policy (any JSX). If you only have plain text, wrap it in <p> or similar. */
  content: React.ReactNode;

  /** Label for the Accept button – defaults to “Accept”. */
  acceptButtonLabel?: string;

  /** Label for the Decline button – defaults to “Decline”. */
  declineButtonLabel?: string;

  /**
   * Callback fired when the user clicks **Accept**.
   * Usually you’ll navigate to your form page here.
   */
  onAccept: () => void;

  /**
   * Optional callback fired when the user clicks **Decline**.
   * If omitted, the component will redirect to https://google.com by default.
   */
  onDecline?: () => void;
}

/**
 * A full‑screen landing page that shows a scrollable privacy policy
 * and lets the visitor accept or decline it.
 */
const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({
  title = 'Privacy Policy',
  content,
  acceptButtonLabel = 'Accept',
  declineButtonLabel = 'Decline',
  onAccept,
  onDecline,
}) => {
  const handleDecline = () => {
    if (onDecline) {
      onDecline();
    } else {
      // Default behaviour – redirect to Google
      window.location.href = 'https://google.com';
    }
  };

  return (
    <div className="privacy-policy-wrapper">
      <h1>{title}</h1>

      {/* The scrollable container */}
      <div className="policy-content">{content}</div>

      {/* Buttons at the bottom – always visible */}
      <div className="buttons">
        <button type="button" onClick={onAccept} className="accept-btn">
          {acceptButtonLabel}
        </button>
        <button type="button" onClick={handleDecline} className="decline-btn">
          {declineButtonLabel}
        </button>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
