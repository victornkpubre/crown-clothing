import {Outlet} from 'react-router-dom';
import { Fragment} from 'react';
import {LogoContainer, NavLinks, NavLink, NavigationContainer} from './navigation.style.jsx';
import {ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import {signOutUser} from '../../utils/firebase/firebase.utils';
import CartIcon from '../../components/car-icon/cart-icon.component';
import CartDropDown from '../../components/cart-dropdown/cart-dropdown.component';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/user/user.selector.js';
import { selectIsCartOpen } from '../../store/cart/cart.selector.js';

const Navigation = () => {
    const currentUser = useSelector(selectCurrentUser);
    const isCartOpen = useSelector(selectIsCartOpen);
    
   
    return (
      <Fragment>
        <NavigationContainer>
            <LogoContainer to='/' >
                <CrwnLogo className='logo' />
            </LogoContainer>
            <NavLinks>
                <NavLink to='/shop' >
                    SHOP
                </NavLink>
                {currentUser ? 
                    <NavLink onClick={signOutUser}>
                        SIGN OUT
                    </NavLink>:
                    <NavLink to='/auth' >
                        SIGN IN
                    </NavLink>
                }
                <CartIcon/>
            </NavLinks>
            {
                isCartOpen && <CartDropDown/>
            }
        </NavigationContainer>
        <Outlet/>
      </Fragment>
    )
}

export default Navigation;