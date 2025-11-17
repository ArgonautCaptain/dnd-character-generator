import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider
} from '@mui/material';
import axios from 'axios';

function CharacterSheet() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    fetchCharacter();
  }, [id]);

  const fetchCharacter = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/characters/${id}`);
      setCharacter(response.data);
    } catch (error) {
      console.error('Error fetching character:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/characters/${id}`);
      navigate('/');
    } catch (error) {
      console.error('Error deleting character:', error);
    }
  };

  if (!character) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(`/character/${id}/edit`)}
          sx={{ mr: 1 }}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => setDeleteDialogOpen(true)}
        >
          Delete
        </Button>
      </Box>

      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          {character.characterName}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={3} sx={{ width: '100%' }}>
          <Grid item xs={12} md={6} sx={{ width: '100%' }}>
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', gap: 1, width: '100%' }}>
              {character.abilityScores && [
                { label: 'STR', value: character.abilityScores.strength },
                { label: 'DEX', value: character.abilityScores.dexterity },
                { label: 'CON', value: character.abilityScores.constitution },
                { label: 'INT', value: character.abilityScores.intelligence },
                { label: 'WIS', value: character.abilityScores.wisdom },
                { label: 'CHA', value: character.abilityScores.charisma },
              ].map((ability) => (
                <Box key={ability.label} sx={{
                  flex: 1,
                  p: 1,
                  border: '2px solid #333',
                  borderRadius: 2,
                  textAlign: 'center',
                  background: '#222',
                  color: '#fff',
                  minWidth: 0,
                  boxShadow: 2,
                }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold', letterSpacing: 1, color: '#fff' }}>
                    {ability.label}
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#fff' }}>
                    {ability.value}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#fff' }}>
                    {'('}{Math.floor((ability.value - 10) / 2) > 0 ? '+' + Math.floor((ability.value - 10) / 2) : Math.floor((ability.value - 10) / 2)}{')'}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} md={6} sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <Box sx={{ flex: 1, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
                <Typography variant="h6">Basic Information</Typography>
                <Typography>Race: {character.race}</Typography>
                <Typography>Class: {character.class}</Typography>
                <Typography>Background: {character.background}</Typography>
                <Typography>Alignment: {character.alignment}</Typography>
                <Typography>Age: {character.age}</Typography>
                <Typography>Gender: {character.gender}</Typography>
              </Box>

              <Box sx={{ flex: 1, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
                <Typography variant="h6">Physical Characteristics</Typography>
                <Typography>Height: {character.height}</Typography>
                <Typography>Weight: {character.weight} lbs</Typography>
                <Typography>Hair: {character.hair}</Typography>
                <Typography>Eyes: {character.eyes}</Typography>
                <Typography>Skin: {character.skin}</Typography>
              </Box>

              <Box sx={{ flex: 1, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
                <Typography variant="h6">Additional Information</Typography>
                <Typography>Faith: {character.faith}</Typography>
                <Typography>Lifestyle: {character.lifestyle}</Typography>
                <Typography>Languages: {character.languages.join(', ')}</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Character</DialogTitle>
        <DialogContent>
          Are you sure you want to delete {character.characterName}?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default CharacterSheet; 