import { Link } from 'react-router-dom';
import "./GenrePage.css"

export default function GenrePage(){
    return (
        <div className="genres">
            <div className="header12">
        <h2>Genres</h2></div>
        <div className="links12">
        <Link to='/genre/Action' className='action-btn'>Action</Link>
        <Link to='/genre/Comedy' className='comedy-btn'>Comedy</Link>
        <Link to='/genre/Romance' className='romance-btn'>Romance</Link>
        <Link to='/genre/Drama' className='drama-btn'>Drama</Link>
        <Link to='/genre/Family' className='drama-btn'>Family</Link>
        <Link to='/genre/Horror' className='horror-btn'>Horror</Link>
        <Link to='/genre/Science-fiction' className='science-fiction-btn'>Science Fiction</Link></div>
        </div>

    )
  }
