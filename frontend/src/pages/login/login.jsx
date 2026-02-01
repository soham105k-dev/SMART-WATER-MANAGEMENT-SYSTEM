import "./login.css";
import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
        if(email === "test@test.com" && password === "password") {
            navigate('/dashboard');
        } else {
            throw new Error('Invalid credentials');
        }
    } catch (err) {
        setError('Invalid email or password');
    } finally {
        setIsLoading(false);
    }
};   


  const isAuthenticated = false; // Replace with actual authentication check

    if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
    }

    
  return (
        <div className="login-container">
            <div className="login-form">
                <h1 className="title">SWPMS</h1>
                <p className="subtitle">Solapur Municipal Corporation</p>

                <h2 className="form-title">Secure Login</h2>
                <p className="form-desc">Enter your credentials to access the dashboard</p>
                {error && <div className="error-message">{error}</div>}
            
        <form onSubmit={handleSubmit}>      
            <div className="input-group">
                <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
                {/* <label htmlFor="email">Email:</label> */}
                    <input
                    type="email"
                    placeholder = "admin@solapur.gov.in"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            <div className="input-group">
                <FontAwesomeIcon icon={faLock} className="input-icon" />
                {/* <label htmlFor="password">Password:</label> */}
                    <input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>

            <button type="submit" className="login-btn" > Sign In </button>
        </form>

        <p className="demo-text"> Demo Access: Use any email and password to login</p>
        <p className ="footer-text">Authorized personnel only. All access logged and monitered.</p>
        </div>
    </div>
  );
}

export default Login;