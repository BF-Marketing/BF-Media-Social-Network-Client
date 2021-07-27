import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './context/auth'

import Home from './pages/Home';
import NotFound from './components/NotFound';

function App() {

    return (
        <AuthProvider>
            <Router>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='*' component={NotFound} />
                </Switch>
            </Router>
        </AuthProvider>
    );
}

export default App;
