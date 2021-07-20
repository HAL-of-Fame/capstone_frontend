import { Link } from 'react-router-dom';
import "./GenrePage.css"

export default function GenrePage(){
    return (
        <div className="genres">
            <div className="header12">
        <h2>Genres</h2></div>
        <div className="links12">
        <Link to='/genre/action' className='action-btn'>Action</Link>
        <Link to='/genre/comedy' className='comedy-btn'>Comedy</Link>
        <Link to='/genre/romance' className='romance-btn'>Romance</Link>
        <Link to='/genre/drama' className='drama-btn'>Drama</Link>
        <Link to='/genre/horror' className='horror-btn'>Horror</Link>
        <Link to='/genre/science-fiction' className='science-fiction-btn'>Science Fiction</Link></div>
        </div>

    )
  }