import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider
} from '@mui/material';
import api from '../api/apiClient';


const abilities = [
  'strength',
  'dexterity',
  'constitution',
  'intelligence',
  'wisdom',
  'charisma'
];

function AbilityScores() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rolls, setRolls] = useState([]);
  const [assignedScores, setAssignedScores] = useState({
    strength: '',
    dexterity: '',
    constitution: '',
    intelligence: '',
    wisdom: '',
    charisma: ''
  });

  const rollDice = () => {
    // Generate rolls and create a map to track duplicates
    const rollValues = Array(6).fill(0).map(() => Math.floor(Math.random() * 20) + 1);
    const valueCounts = {};

    const newRolls = rollValues.map((value, index) => {
      // Create a unique identifier for each roll
      const count = (valueCounts[value] || 0) + 1;
      valueCounts[value] = count;
      return {
        id: `${value}-${count}`, // Create a unique ID using value and count
        value: value
      };
    });

    setRolls(newRolls);
    setAssignedScores({
      strength: '',
      dexterity: '',
      constitution: '',
      intelligence: '',
      wisdom: '',
      charisma: ''
    });
  };

  const getAvailableRolls = (currentAbility) => {
    // Get all roll IDs that haven't been assigned to other abilities
    const assignedRollIds = Object.entries(assignedScores)
      .filter(([ability, value]) => ability !== currentAbility && value !== '')
      .map(([_, value]) => value.id);

    return rolls
      .filter(roll => !assignedRollIds.includes(roll.id))
      .sort((a, b) => a.value - b.value);
  };

  const handleScoreAssignment = (ability, rollId) => {
    if (rollId === '') {
      // Handle unassigning
      setAssignedScores(prev => ({
        ...prev,
        [ability]: ''
      }));
      return;
    }

    const selectedRoll = rolls.find(roll => roll.id === rollId);
    if (!selectedRoll) return;

    setAssignedScores(prev => ({
      ...prev,
      [ability]: selectedRoll
    }));
  };

  const handleSubmit = async () => {
    try {
      // Convert the assigned scores to just their values for the API
      const abilityScoresToSubmit = Object.entries(assignedScores).reduce((acc, [ability, roll]) => ({
        ...acc,
        [ability]: roll?.value || ''
      }), {});

      await api.put(`/characters/${id}`, {
        abilityScores: abilityScoresToSubmit
      });
      navigate(`/character/${id}`);
    } catch (error) {
      console.error('Error updating ability scores:', error);
    }
  };

  const isFormValid = () => {
    return abilities.every(ability => assignedScores[ability] !== '');
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Ability Scores
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body1" gutterBottom>
          Roll the dice to find your ability scores. Then assign them to the abilities below.
        </Typography>

        <Box sx={{ mb: 4, mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={rollDice}
            sx={{ mb: 2, display: 'block', mx: 'auto', fontSize: '1.2rem' }}
          >
            Roll Dice!
          </Button>

          {rolls.length > 0 && (
            <Grid container spacing={2} sx={{ mb: 4 }}>
              {rolls.map((roll) => (
                <Grid key={roll.id} sx={{
                  width: { xs: '16.666%' },
                  minWidth: '80px',
                  maxWidth: '100px',
                  margin: '0 auto'
                }}>
                  <Card>
                    <CardContent>
                      <Typography variant="h5" align="center">
                        {roll.value}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>

        <Grid container spacing={3}>
          {abilities.map(ability => (
            <Grid key={ability} sx={{
              width: { xs: '100%', md: '50%' },
              maxWidth: { md: '300px' },
              margin: '0 auto'
            }}>
              <FormControl fullWidth>
                <InputLabel>{ability.charAt(0).toUpperCase() + ability.slice(1)}</InputLabel>
                <Select
                  value={assignedScores[ability]?.id || ''}
                  onChange={(e) => handleScoreAssignment(ability, e.target.value)}
                  label={ability.charAt(0).toUpperCase() + ability.slice(1)}
                  disabled={rolls.length === 0}
                >
                  {getAvailableRolls(ability).map((roll) => (
                    <MenuItem key={roll.id} value={roll.id}>
                      {roll.value}
                    </MenuItem>
                  ))}
                  <MenuItem value="">
                    <em>Unassigned</em>
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
          ))}
        </Grid>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          sx={{ mt: 3 }}
          onClick={handleSubmit}
          disabled={!isFormValid()}
        >
          Complete Character
        </Button>
      </Paper>
    </Container>
  );
}

export default AbilityScores; 