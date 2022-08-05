import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux"; // useSelector hook allows us interact from a component with the Redux store.
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { selectIsCartOpen } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { signOutStart } from "../../store/user/user.action";
import { NavigationContainer,NavLink,NavLinks,LogoContainer} from './navigation.styles';
const Navigation = () => {
    const dispatch = useDispatch();
    // useSelector is a hook that we pass a selector function and a selector function is something that essentially extracts off the values
    // that we want from the whole entire Redux store. (Note :  most of the selectors are just functions that take state and then return the value that is deeply nested that we want)

    // Whenever the state object changes by reference due to redux,
    // every time whenever we update any of our reducer values, we always return a brand new state object with the changed values.
    // When that happends, the selector will rerun current user updates and then react will re render this component.
    const currentUser = useSelector(selectCurrentUser);

    const isCartOpen = useSelector(selectIsCartOpen);
    // userContext as a hook tells component whenever a value inside of context updates re-render
    // console.log(currentUser);
    const signOutUser = () => dispatch(signOutStart());
    return (
      <Fragment>
        <NavigationContainer>
            <LogoContainer to='/'>
                <CrwnLogo className="logo"/>
            </LogoContainer>
            <NavLinks>
            <NavLink to='/shop'>
                SHOP
            </NavLink>
            
                    {currentUser ? (<NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>)
                        :(<NavLink to='/auth'>
                            SIGN IN
                        </NavLink>)}
                    {currentUser ? (<NavLink to='/order'>MY ORDER</NavLink>)
                        :("")}
                    <CartIcon/>
            </NavLinks>
                {isCartOpen && <CartDropdown />}
        </NavigationContainer>
        <Outlet />
      </Fragment>
    );
}
  
export default Navigation;