import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../Header/Header";
import { 
  Shirt, UserCircle, 
  MessageCircle, Scissors, Settings
} from "lucide-react";
import "./Dashboard.css";

interface FeatureCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  color: string;
  comingSoon?: boolean;
}

const Dashboard: React.FC = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    const username = localStorage.getItem("username");
    
    if (!token) {
      navigate("/login", { state: { from: "/dashboard" } });
      return;
    }
    
    if (username) {
      const name = username;
      setUsername(name.charAt(0).toUpperCase() + name.slice(1));
    }
  }, [navigate]);

  const featureCards: FeatureCard[] = [
    {
      id: "wardrobe",
      title: "My Wardrobe",
      description: "Manage your clothing items and create outfits",
      icon: <Shirt size={32} />,
      path: "/wardrobe",
      color: "#4f46e5"
    },
    {
      id: "style-analysis",
      title: "Style Analysis",
      description: "Discover your style preferences and color palette",
      icon: <Scissors size={32} />,
      path: "/profile/preferences",
      color: "#8b5cf6"
    },
  ];


  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    }
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
      return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
    }
    
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div className="dashboard-container">
      <Header />
      <main className="dashboard-main">
        <section className="dashboard-welcome">
          <h1>Welcome, {username || "there"}!</h1>
          <p>Explore your personalized fashion experience</p>
        </section>

        <section className="dashboard-features">
          <h2>Your Fashion Hub</h2>
          <div className="feature-cards">
            {featureCards.map(card => (
              <Link 
                to={card.path} 
                key={card.id}
                className="feature-card"
                style={{ 
                  borderColor: card.color,
                  background: `linear-gradient(45deg, ${card.color}08, ${card.color}15)`
                }}
              >
                <div className="feature-card-icon" style={{ color: card.color }}>
                  {card.icon}
                </div>
                <div className="feature-card-content">
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </div>
                {card.comingSoon && (
                  <div className="coming-soon-badge">
                    Coming Soon
                  </div>
                )}
              </Link>
            ))}
          </div>
        </section>

        <section className="dashboard-quick-actions">
          <h2>Quick Actions</h2>
          <div className="quick-action-buttons">
            <button 
              className="quick-action-button"
              onClick={() => navigate("/wardrobe/add")}
            >
              <Shirt size={20} />
              Add to Wardrobe
            </button>
            <button 
              className="quick-action-button"
              onClick={() => navigate("/chat")}
            >
              <MessageCircle size={20} />
              Fashion Chat
            </button>
          </div>
        </section>

        <section className="dashboard-suggested">
          <h2>Suggested For You</h2>
          <div className="suggested-content">
            <div className="suggested-card">
              <h3>Style Analysis</h3>
              <p>Discover your personal style and color palette</p>
              <button 
                className="suggested-action"
                onClick={() => navigate("/profile/preferences")}
              >
                Start Analysis
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard; 