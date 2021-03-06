import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import '../styles/app.css';
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import GoogleIcon from '@mui/icons-material/Google';
import StorefrontIcon from '@mui/icons-material/Storefront';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import PushPinIcon from '@mui/icons-material/PushPin';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { makeStyles } from '@material-ui/core/styles';
import settings from '../settings';

const useStyles = makeStyles({
  searchBar: {
    backgroundColor: 'white',
    borderRadius: '5px',
    width: 300
  }
})

function SearchBar() {
  const classes = useStyles();
  return <TextField className={classes.searchBar} variant ="outlined" color="primary" placeholder="Search" size="small"/>
}

function SignedInDropdown(userData) {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null); // hook for the user menu dropdown
  const open = Boolean(anchorEl);

  const handleOpenMenu = e => {
    setAnchorEl(e.currentTarget); // tells you which element has been clicked in the menu
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const SignOut = () => {
    window.sessionStorage.clear();
    window.location.href = settings.applicationRootURL;
  };

  return (<>
    <Button         
    color="primary" variant="contained" size="medium"
    startIcon={<PersonIcon />}
    id="basic-button"
    aria-controls={open ? 'basic-menu' : undefined}
    aria-haspopup="true"
    aria-expanded={open ? 'true' : undefined}
    onClick={handleOpenMenu}
    >
    {userData.name}
    </Button>
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
    >
      <div style={{padding: 10, color: 'blue'}}>{userData.email}</div>
      <MenuItem component="a" href="/home"><HomeIcon style={{marginRight: 20}}/> Home</MenuItem>
      <MenuItem component="a" href="/store/gatorstore-1"><StorefrontIcon style={{marginRight: 20}}/> My Favorite Store</MenuItem>
      <MenuItem component="a" href="/orders"><ShoppingCartIcon style={{marginRight: 20}}/> My Orders</MenuItem>
      <MenuItem onClick={SignOut}><LogoutIcon style={{marginRight: 20}}/>Logout</MenuItem>
    </Menu>
  </>);
}

function GoogleButton() { // for when user is NOT signed in
  return (<div className="g-signin">
    <a id="loginButton" style={{textDecoration: 'none'}} href={`https://accounts.google.com/o/oauth2/auth?access_type=offline&client_id=138444517704-gg6649ok973letdlh55bpte8bna7721o.apps.googleusercontent.com&redirect_uri=${settings.googleLoginRedirectURL}&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&state=state`}>
      <button className='login'>
        <GoogleIcon style={{verticalAlign: 'middle', marginRight: 10}}/> Sign-In 
      </button>
    </a>
  </div>);
}

function LoadSessionActions() {
  // User has NOT signed in:
  if (sessionStorage.getItem('user-name') === null) {
    return (<GoogleButton />);
  }
  else { // User is signed in:
    let name = window.sessionStorage.getItem('user-name');
    let email = window.sessionStorage.getItem('user-email');
    let id = window.sessionStorage.getItem('user-id');
    let jwtToken = window.sessionStorage.getItem('user-jwtToken');

    return (<SignedInDropdown name={name} email={email}/>);
  }
}

export default function Header() {
  return (<div className="header">
      <div className="headerLogo flexCenter">GatorStore</div>
      <div className="searchBarContainer flexCenter">
        <SearchBar />
        <Button color="primary" variant="contained" size="medium"><SearchIcon/></Button>
      </div>
      <div className="accountButton flexCenter">
        <LoadSessionActions />
      </div>
  </div>);
}
