import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  TextField,
  Divider
} from '@mui/material';
import axios from 'axios';

function Home() {
  const [characters, setCharacters] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [characterToDelete, setCharacterToDelete] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/characters');
      setCharacters(response.data);
    } catch (error) {
      console.error('Error fetching characters:', error);
    }
  };

  const handleDeleteClick = (character) => {
    setCharacterToDelete(character);
    setDeleteConfirmation('');
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/characters/${characterToDelete._id}`);
      setDeleteDialogOpen(false);
      setCharacterToDelete(null);
      setDeleteConfirmation('');
      fetchCharacters();
    } catch (error) {
      console.error('Error deleting character:', error);
    }
  };

  const isDeleteEnabled = deleteConfirmation === characterToDelete?.characterName;

  return (
    <Container maxWidth="xl" sx={{ mt: 2 }}>
      {characters.length === 0 ? (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h5" color="text.secondary">
            You haven't created any characters yet
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate('/create')}
            sx={{ mt: 2 }}
          >
            Create Your First Character
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {characters.map((character) => (
            <Grid item key={character._id} xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {character.characterName}
                  </Typography>
                  <Typography color="text.secondary">
                    {character.race} {character.class}
                  </Typography>
                  <Typography variant="body2">
                    Background: {character.background}
                  </Typography>
                </CardContent>
                <Divider />
                <CardActions>
                  <Button
                    size="small" 
                    color="inherit"
                    onClick={() => navigate(`/character/${character._id}`)}>
                    View
                  </Button>
                  <Button
                    size="small" 
                    color="inherit"
                    onClick={() => navigate(`/character/${character._id}/edit`)}>
                    Edit
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleDeleteClick(character)}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog
        open={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false);
          setDeleteConfirmation('');
        }}
      >
        <DialogTitle>Delete Character</DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 2 }}>
            Are you sure you want to delete {characterToDelete?.characterName}?
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Please type the character's name to confirm deletion:
          </Typography>
          <TextField
            fullWidth
            value={deleteConfirmation}
            onChange={(e) => setDeleteConfirmation(e.target.value)}
            placeholder="Enter character name"
            error={deleteConfirmation !== '' && !isDeleteEnabled}
            helperText={deleteConfirmation !== '' && !isDeleteEnabled ? "Name doesn't match" : ""}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setDeleteDialogOpen(false);
            setDeleteConfirmation('');
          }}
          color="inherit"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            disabled={!isDeleteEnabled}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Home; 