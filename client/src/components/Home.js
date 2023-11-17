import MainImage from '../photos/homePic.jpg';
import './home.css';

function Home () {
    return ( 
        <div>
            <img 
            className='mainImage'
            src= {MainImage}/>
        </div>
     );
}

export default Home ;