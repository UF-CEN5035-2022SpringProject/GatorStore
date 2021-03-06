import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/sellerStoreList.css';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import Avatar from '@mui/material/Avatar';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';

import settings from '../settings'


function SellerStoreList() {
  function StoreEntry(storeInfo) {
    return (
      <div className="StoreEntry flexCenter rowFlex">
        <div style={{ flex: 0.7 }} className="flexCenter">
          <Avatar sx={{ bgcolor: 'navy', width: 80, height: 80}}>{storeInfo.initials}</Avatar>
        </div>
        <div style={{ flex: 3 }}>
          <Link to={'/store/' + storeInfo.storeId}><h1 className="StoreEntryTitle">{storeInfo.name} <OpenInNewIcon /></h1></Link>
          <div className="StoreEntryDetailRow">
            <p><b>Birthday:</b> {storeInfo.createDate}</p>
            <p>|</p>
            <p><b>ID:</b> {storeInfo.storeId}</p>
          </div>
        </div>
        <div style={{ flex: 1, marginRight: 10}} className="flexCenter">
          <div style={{display:"flex", flexDirection: "row"}}>
            <Button component={Link} to={'/' + storeInfo.storeId + "/orders"} startIcon={<ShoppingBagIcon />} style={{marginRight: 15}} variant="contained" color="primary" sx={{ marginBottom: 1 }}>Orders</Button>
            <Button component={Link} to={'/' + storeInfo.storeId + "/livestreams"} startIcon={<VideoLibraryIcon />} variant="contained" color="warning" sx={{ marginBottom: 1 }}>Livestreams</Button>
          </div>
          <Button startIcon={<DeleteIcon />} onClick={() => {
            DeleteStore(storeInfo.storeId);
          }} variant="contained" color="secondary">Delete</Button>
        </div>
      </div>
    );
  }

  // Hook for overlay
  const [currentOverlay, ChangeCurrentOverlay] = useState("none");
  // Effect for overlay (to freeze scrolling when an overlay is open)
  useEffect(() => {
    document.body.style.overflowY = (currentOverlay !== "none") ? "hidden" : "auto";    
  }, [currentOverlay]);

  // Twin hook to get the store name out of Overlay():
  const [newStore, SetNewStore] = useState("");

  function Overlay() {
    const [newStoreName, SetNewStoreName] = useState(""); // state for name for new store

    return (
      <div>
        {currentOverlay === 'none' && (
          <div style={{display: 'none'}} />
        )}

        {currentOverlay === 'createNewStore' && (
          <div class="create-store-overlay">
            <div class="transparentBG"/>
            <div class="overlay-container" style={{top: '35vh'}}>
              <p>Enter a name for your new store:</p>
              <TextField id="NameField" variant="outlined" color="primary" placeholder="Store Name" size="small" onChange={e => {SetNewStoreName(e.target.value);}} style={{width: "100%", marginBottom: 15}}/>
              <div style={{textAlign: "center"}}>
                  <Button variant="contained" color="warning" onClick={() => {
                      ChangeCurrentOverlay("none");
                  }} size="large" style={{marginRight: "10%"}}>Cancel</Button>
                  
                  <Button variant="contained" color="primary" onClick={() => {
                    if (newStoreName !== "") { // if a name was typed
                      SetNewStore(newStoreName);

                      // Create store:
                      CreateNewStore(newStoreName);

                      ChangeCurrentOverlay("newStoreConfirmation");
                    } else { // give warning that name is required
                      document.getElementById("NameField").style.border = "red solid 2px";
                      document.getElementById("NameField").placeholder = "A store name is required";
                    }
                  }} size="large">Create</Button>
                </div>
            
            </div>
          </div>
        )}

        {currentOverlay === 'newStoreConfirmation' && ( 
          <div class="create-store-overlay">
            <div class="transparentBG"/>
            <div class="overlay-container" style={{top: '35vh'}}>
              <h3><b>{newStore}</b> was successfully created!</h3>

              <div style={{textAlign: "center"}}>
                <Button variant="contained" color="warning" onClick={() => {
                    ChangeCurrentOverlay("none");
                }} size="large">Ok</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  function CreateNewStore(name) {
    // Get JWT Token for POST request header:
    var jwtToken = window.sessionStorage.getItem("user-jwtToken");

    // Call API:
    const requestOptions = {
      method: 'POST',
      headers: {
        'Authorization': jwtToken
      },
      body: JSON.stringify({ name: name }) 
    };
    fetch(settings.apiHostURL + 'store/create', requestOptions)
      .then(response => response.json())
      .then(response => {
        if (response.status !== 0) {
          alert("ERROR: Create Store API did not respond with 'success' status code.");
        } else {
          SetStoreArray([]);
          ChangeStorePage(0);
          GetPage(0)
        }
      })
      .catch((error) => {
        console.error(error);
        //alert("ERROR: Back-end is not online or did not respond.");
      });
  }

  function DeleteStore(storeID) {
    console.log("The API to delete a store is yet to be implemented")
  }

  const [storeArray, SetStoreArray] = useState([]);

  const [currStorePage, ChangeStorePage] = useState(0);
  var maxPage = 1; // default

  // on load: get store page 0:
  useEffect(() => {
    GetPage(0);
  }, []);

  function GetPage(pageNum) {
    var jwtToken = window.sessionStorage.getItem("user-jwtToken");
    var userId = window.sessionStorage.getItem("user-id");
    // Call API to get store list:
    const requestOptions = {
      method: 'GET',
      headers: {
        'Authorization': jwtToken
      }
    };
    fetch(settings.apiHostURL + 'user/' + userId + '/store-list?page=' + pageNum, requestOptions)
      .then(response => response.json())
      .then(response => {
        if (response.status === 0 && pageNum <= response.result.maxPage && response.result.storeList != null) {
          if (pageNum > 0) {
            SetStoreArray(storeArray.concat(response.result.storeList));
          } else {
            SetStoreArray(response.result.storeList);
          }

          // Set max page number so that this fetch isn't even called if it is an invalid page number
          maxPage = response.result.maxPage;
        } else {
          console.log("ERROR: Get Store list API did not respond with 'success' status code.");
        }
      })
      .catch((error) => {
        console.error(error);
        //alert("ERROR: Back-end is not online or did not respond.");
      });
  }
  
  // Calls on GetPage() to get a new product page upon the user scrolling down.
  function ScrollDown() {
    // Only request more products if current page number is below max:
    if (currStorePage <= maxPage) {
      ChangeStorePage(currStorePage + 1);
      GetPage(currStorePage);
    }
  }

  function StoreList() {
    return (
      <div class="store-list-container" onScroll={(e) => {
        if (e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight) {
          ScrollDown();
        }
      }}>
        <div className="storeListContainer">
          {storeArray && storeArray.length > 0 && ( storeArray.map(function (store) {
                return(
                  <StoreEntry initials={store.name.substring(0, 3)} name={store.name} createDate={store.createTime.substring(0,10)} storeId={store.id}/>
                );
              })
          )}
          {storeArray.length == 0 && (
            <div>- You have no stores. Why not make some? -</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="RootFlexContainer">
      <Header />

      <Overlay/>

      <div className="flexCenter colFlex">
        <div className="storeListSubHeader">
          <h1>Your Stores</h1>
          <Button startIcon={<AddIcon/>} color="primary" variant="contained" size="medium" onClick={() => {
            ChangeCurrentOverlay("createNewStore");
          }}>New Store</Button>
        </div>
       
        <StoreList />
      </div>
      <Footer />
    </div>
  );
}

export default SellerStoreList;