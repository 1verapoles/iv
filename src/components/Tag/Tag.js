import { TiDeleteOutline } from 'react-icons/ti';
import './Tag.scss';

function Tag({id, tagname, deleteTag}) {
  return (
    <div className="tag-wrapper">
     <div className="tag">{tagname}</div>
     <TiDeleteOutline className="icon" onClick={() => {deleteTag(id, tagname);}} size={20} />
    </div>
  );
}

export default Tag;
