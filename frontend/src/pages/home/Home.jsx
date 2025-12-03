import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        switch(data.userType) {
          case 'admin':
            window.location.href = '/admin/dashboard';
            break;
          case 'hospital':
            window.location.href = '/hospital/dashboard';
            break;
          case 'student':
            window.location.href = '/student/dashboard';
            break;
          case 'doctor':
            window.location.href = '/doctor/dashboard';
            break;
          default:
            setError('Type d\'utilisateur inconnu');
        }
      } else {
        setError(data.message || 'Email ou mot de passe incorrect');
      }
    } catch (err) {
      setError('Erreur de connexion au serveur');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      {/* Background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'url("https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=80&w=2091")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        zIndex: 0
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to right, rgba(30, 58, 138, 0.92), rgba(59, 130, 246, 0.85))',
          zIndex: 1
        }}></div>
      </div>

      {/* Header */}
      <header style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 3rem',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '45px',
            height: '45px',
            background: '#3b82f6',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: 'white'
          }}>M</div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: 'white', margin: 0 }}>MedStage</h1>
        </div>
        
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2rem',
          color: 'white',
          flexWrap: 'wrap'
        }}>
          <a href="#accueil" style={{ color: 'white', textDecoration: 'none', fontSize: '0.95rem' }}>Accueil</a>
          <a href="#apropos" style={{ color: 'white', textDecoration: 'none', fontSize: '0.95rem' }}>À propos</a>
          <a href="#contact" style={{ color: 'white', textDecoration: 'none', fontSize: '0.95rem' }}>Contact</a>
          <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem' }}>
            <span>📧 contact@stagemedical.dz</span>
            <span>📞 +213 5555 85498 95</span>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '3rem',
        gap: '3rem',
        minHeight: 'calc(100vh - 80px)',
        flexWrap: 'wrap'
      }}>
        {/* Left Section */}
        <div style={{ flex: 1, color: 'white', maxWidth: '600px', minWidth: '300px' }}>
          <h2 style={{
            fontSize: '3.5rem',
            fontWeight: 'bold',
            marginBottom: '1.5rem',
            lineHeight: 1.2,
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)'
          }}>BIENVENUE SUR MEDSTAGE</h2>
          <p style={{
            fontSize: '1.25rem',
            color: '#bfdbfe',
            marginBottom: '3rem',
            lineHeight: 1.6
          }}>
            Plateforme de gestion des stages médicaux pour les étudiants en médecine 
            de la wilaya de Boumerdès
          </p>

          {/* Feature Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            marginTop: '3rem'
          }}>
            {[
              { icon: '🏥', title: 'Gestion des Hôpitaux', desc: 'Coordination efficace entre les établissements hospitaliers et les étudiants' },
              { icon: '💎', title: 'Suivi des Stages', desc: 'Système de suivi complet pour les stages médicaux et les évaluations' },
              { icon: '🎓', title: 'Espace Étudiant', desc: 'Interface dédiée pour gérer vos demandes de stage et vos documents' },
              { icon: '👨‍⚕️', title: 'Portail Docteur', desc: 'Gestion et encadrement des stagiaires en toute simplicité' }
            ].map((feature, idx) => (
              <div key={idx} style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(15px)',
                padding: '1.75rem',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{feature.icon}</div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem', color: 'white' }}>
                  {feature.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#bfdbfe', lineHeight: 1.5 }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section - Login */}
        <div style={{ width: '100%', maxWidth: '450px', minWidth: '300px' }}>
          <div style={{
            background: 'white',
            borderRadius: '20px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
            padding: '2.5rem'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1e3a8a', marginBottom: '0.5rem' }}>
                Connexion
              </h3>
              <p style={{ color: '#6b7280', fontSize: '0.95rem' }}>Accédez à votre espace personnel</p>
            </div>

            {error && (
              <div style={{
                padding: '1rem 1.25rem',
                background: '#fee2e2',
                borderLeft: '4px solid #ef4444',
                borderRadius: '8px',
                marginBottom: '1.5rem'
              }}>
                <p style={{ fontWeight: 600, color: '#991b1b', marginBottom: '0.25rem' }}>Erreur</p>
                <p style={{ fontSize: '0.9rem', color: '#dc2626' }}>{error}</p>
              </div>
            )}

            <div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  color: '#374151',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  fontSize: '0.95rem'
                }}>Adresse Email</label>
                <div style={{ position: 'relative' }}>
                  <span style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#9ca3af',
                    fontSize: '1.25rem'
                  }}>📧</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                    placeholder="exemple@stageapp.dz"
                    style={{
                      width: '100%',
                      padding: '0.875rem 1rem 0.875rem 3rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '10px',
                      fontSize: '1rem',
                      outline: 'none'
                    }}
                  />
                </div>
                <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: '#6b7280' }}>
                  Exemples: admin@stageapp.dz / etudiant@stageapp.fr / hopital@stageapp.fr
                </p>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  color: '#374151',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  fontSize: '0.95rem'
                }}>Mot de passe</label>
                <div style={{ position: 'relative' }}>
                  <span style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#9ca3af',
                    fontSize: '1.25rem'
                  }}>🔒</span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                    placeholder="••••••••"
                    style={{
                      width: '100%',
                      padding: '0.875rem 1rem 0.875rem 3rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '10px',
                      fontSize: '1rem',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.5rem',
                flexWrap: 'wrap',
                gap: '0.5rem'
              }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#4b5563', cursor: 'pointer' }}>
                  <input type="checkbox" style={{ width: '1.125rem', height: '1.125rem', cursor: 'pointer' }} />
                  <span>Se souvenir de moi</span>
                </label>
                <a href="#" style={{ color: '#3b82f6', textDecoration: 'none', fontSize: '0.9rem' }}>
                  Mot de passe oublié?
                </a>
              </div>

              <button
                onClick={handleLogin}
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '1rem',
                  background: loading ? '#93c5fd' : 'linear-gradient(to right, #3b82f6, #2563eb)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                {loading ? (
                  <>
                    <svg style={{ animation: 'spin 1s linear infinite' }} width="20" height="20" viewBox="0 0 24 24">
                      <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Connexion en cours...
                  </>
                ) : (
                  'Se connecter'
                )}
              </button>
            </div>

            <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '2px solid #e5e7eb' }}>
              <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#6b7280', marginBottom: '1rem' }}>
                Connexion automatique selon votre profil
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
                {[
                  { label: 'Admin', bg: '#f3e8ff', border: '#a855f7', color: '#7e22ce' },
                  { label: 'Hôpital', bg: '#dbeafe', border: '#3b82f6', color: '#1e40af' },
                  { label: 'Étudiant', bg: '#d1fae5', border: '#10b981', color: '#047857' },
                  { label: 'Docteur', bg: '#fed7aa', border: '#f97316', color: '#c2410c' }
                ].map((badge, idx) => (
                  <div key={idx} style={{
                    padding: '0.625rem',
                    borderRadius: '8px',
                    textAlign: 'center',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    background: badge.bg,
                    border: `2px solid ${badge.border}`,
                    color: badge.color
                  }}>{badge.label}</div>
                ))}
              </div>
            </div>
          </div>

          <p style={{ textAlign: 'center', color: 'white', fontSize: '0.9rem', marginTop: '1.5rem' }}>
            Première visite? Contactez l'administration pour obtenir vos identifiants
          </p>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        position: 'absolute',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        color: 'white',
        fontSize: '0.85rem',
        zIndex: 10,
        textAlign: 'center'
      }}>
        <p>© 2024 MedStage- Gestion des Stages Médicaux | Wilaya de Boumerdès</p>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  
  );

}
