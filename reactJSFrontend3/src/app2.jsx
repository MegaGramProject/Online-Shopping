import App from './App';
import { useParams } from 'react-router-dom';


function App2(){
    const params = useParams();
    return <App params={params} />;
};

export default App2;