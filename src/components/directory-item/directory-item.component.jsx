import './directory-item.styles.scss'
import { Link } from 'react-router-dom';

const DirectoryItem = ({ category }) =>
{
    const {imageUrl , title} = category;
    return (
        <div className="directory-item-container">
        <div className="background-image" style = {{
                backgroundImage:`url(${imageUrl})`
            }} 
        />
        <div className="directory-body">
          <Link to={`/shop/${title.toLowerCase()}`}><h2>{title}</h2></Link>
          <p>Shop now</p>
        </div>
    </div>
    )

}

export default DirectoryItem;