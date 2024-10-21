import { useState } from 'react';
import downwardTriangle from '../assets/downwardTriangle.png';
import '../styles.css';

function SingleOptionInSecondTopMostSection({optionName, optionURL}) {
    const [isHoveringOnComponent, setIsHoveringOnComponent] = useState(0);
    
    function takeToPage() {
        window.location.href = optionURL;
    }


    function toggleIsHoveringOnComponent() {
        setIsHoveringOnComponent(!isHoveringOnComponent);
    }
    

    return (
    <>
        <div onClick={takeToPage} onMouseEnter={toggleIsHoveringOnComponent} onMouseLeave={toggleIsHoveringOnComponent}
        style={{borderStyle: isHoveringOnComponent ? 'solid' : 'none', borderColor: 'white', cursor: 'pointer', display: 'flex',
        alignItems: 'start', gap: '0.4em', padding: '0.2em 0.4em'}}>
                <b style={{color: 'white'}}>{optionName}</b>
        </div>
    </>
    )
}

export default SingleOptionInSecondTopMostSection
