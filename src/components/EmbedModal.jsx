import { useState, useEffect } from 'react';

function EmbedModal({ onClose }) {
  const [copied, setCopied] = useState(false);

  const embedUrl = window.location.origin + window.location.pathname + '?embed=true';
  const snippet = `<iframe src="${embedUrl}" width="100%" height="700" frameborder="0" style="border:none;border-radius:12px;" allowfullscreen></iframe>`;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="embed-overlay" onClick={onClose}>
      <div className="embed-modal" onClick={(e) => e.stopPropagation()}>
        <button className="embed-modal-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <h2>Embed Calculator</h2>
        <p>Copy the code below to embed this calculator on your website:</p>
        <textarea
          className="embed-snippet"
          readOnly
          value={snippet}
          rows={4}
          onClick={(e) => e.target.select()}
        />
        <button className="embed-copy-btn" onClick={handleCopy}>
          {copied ? 'Copied!' : 'Copy to Clipboard'}
        </button>
      </div>
    </div>
  );
}

export default EmbedModal;
