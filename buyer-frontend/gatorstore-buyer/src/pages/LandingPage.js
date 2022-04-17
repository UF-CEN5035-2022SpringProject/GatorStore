import React, {useState, useEffect} from 'react';
import Header from '../components/Header.js';
import Footer from '../components/Footer';
import ActionAreaCard from'../components/aboutcard';
import {Grid} from "@material-ui/core";
import ImageSlider from '../components/ImageSlider';
import { SliderData } from '../components/SliderData';
import settings from '../settings'
import {Link} from 'react-router-dom'

function LandingPage() {
    const [storeList, SetRecommendStores] = useState([]);
    useEffect(() => {
        GetRecommendList();
    }, []);

    function GetRecommendList() {
        // call API
        const requestOptions = {
          method: 'GET',
          header: {}
        };
        fetch(settings.apiHostURL + 'store/recommend-list', requestOptions) // SA1
        .then(response => response.json())
        .then(response => {
            if (response.status === 0) {
                SetRecommendStores(response.result.storeList);
            } else {
                alert("ERROR: YouTube API did not respond with 'success' status code 0.");
            }
        })
        .catch((error) => {
            console.error(error);
        });
    }
    return( 
    <div className="RootFlexContainer">
        <Header/>

        <div>
            <ImageSlider slides={SliderData} />
        </div>
        <div style={{width: "92%", margin: "0 auto 0"}}>
            <h2 style={{marginBottom: "30px"}}>Stores You are interested:</h2>
            <Grid container>
                {storeList && storeList.length > 0 && storeList.map((store)=>
                    <Grid component={Link} to={`/store/${store.id}`} item xs={3}>
                        <ActionAreaCard
                            storeName={store.name}
                        />
                    </Grid>
                )}      
            </Grid>
        </div>

        <Footer/>
    </div>
    );
    }

export default LandingPage;
