// pages/NotFound.jsx
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="empty-state" style={{ paddingTop: 100 }}>
          <div className="empty-state__icon">🎬</div>
          <h2>404 — Page Not Found</h2>
          <p>The page you're looking for doesn't exist.</p>
          <button className="btn btn-primary" onClick={() => navigate('/')}>Back to Home</button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
