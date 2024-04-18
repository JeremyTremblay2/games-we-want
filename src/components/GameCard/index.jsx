import PropTypes from 'prop-types'
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import './index.css'

const GameCard = ({ game }) => {
    return (
        <Card 
            sx={{ 
                width: '100%', 
                borderRadius: '16px', 
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                '&:hover': { 
                    transform: 'scale(1.02)',
                    boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
                } 
            }}
        >
            <CardMedia
                component="img"
                image={game.image}
                title={game.name}
                sx={{ 
                    height: '350px',
                    objectFit: 'cover', 
                    borderTopLeftRadius: '16px',
                    borderTopRightRadius: '16px',
                }}
            />
            <CardContent>
                <Typography 
                    gutterBottom 
                    variant="h5" 
                    component="div" 
                    sx={{ 
                        fontWeight: 'bold',
                    }}
                >
                    {game.name}
                </Typography>
                <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    textAlign="right" 
                    sx={{ 
                        fontStyle: 'italic', 
                        color: 'gray',
                    }}
                >
                    Released on {game.firstReleaseDate}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default GameCard

GameCard.propTypes = { 
    game: PropTypes.object
}

GameCard.defaultProps = {
    game: {}
}