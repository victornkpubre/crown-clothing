import { useNavigate } from 'react-router-dom';
import { BackgroundImage, Body, DirectoryItemContainer } from './directory-item.styles';


const DirectoryItem = ({directory}) => {
    const {imageUrl, title, route} = directory;
    const navigate = useNavigate();
    const navigationHandler = () => navigate(route);

    return (
        <DirectoryItemContainer onClick={navigationHandler} >
            <BackgroundImage imageUrl={imageUrl}/>
            <Body>
                <h2>{title}</h2>
                <p>Shop Now</p>
            </Body>
        </DirectoryItemContainer>
    );
}

export default DirectoryItem;