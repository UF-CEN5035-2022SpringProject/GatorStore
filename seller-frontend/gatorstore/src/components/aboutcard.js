import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';


export default function ActionAreaCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="300"
          image="https://eitrawmaterials.eu/wp-content/uploads/2016/09/person-icon.png"
          alt="person"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Vivaan
          </Typography>
          <Typography variant="body2" color="text.secondary">
           Body containing Details about the team member.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
