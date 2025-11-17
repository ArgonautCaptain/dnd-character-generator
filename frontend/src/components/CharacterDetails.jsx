import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
  Grid
} from '@mui/material';
import axios from 'axios';

const alignments = [
  'Chaotic Evil', 'Chaotic Neutral', 'Chaotic Good',
  'Neutral Evil', 'Pure Neutral', 'Neutral Good',
  'Lawful Evil', 'Lawful Neutral', 'Lawful Good'
];

const lifestyles = [
  'Wretched', 'Squalid', 'Poor', 'Modest',
  'Comfortable', 'Wealthy', 'Aristocratic'
];

const languages = [
  'Common', 'Dwarvish', 'Elvish', 'Giant', 'Gnomish', 'Goblin',
  'Halfling', 'Orc', 'Abyssal', 'Celestial', 'Draconic',
  'Deep Speech', 'Infernal', 'Primordial', 'Sylvan', 'Undercommon'
];

function CharacterDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    alignment: '',
    faith: '',
    lifestyle: '',
    languages: [],
    hair: '',
    skin: '',
    eyes: '',
    height: '',
    weight: '',
    age: '',
    gender: ''
  });

  useEffect(() => {
    fetchCharacter();
  }, [id]);

  const fetchCharacter = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/characters/${id}`);
      setFormData(prev => ({
        ...prev,
        ...response.data
      }));
    } catch (error) {
      console.error('Error fetching character:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/characters/${id}`, formData);
      navigate(`/character/${id}/abilities`);
    } catch (error) {
      console.error('Error updating character:', error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 2 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Character Details
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Character Details
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Alignment</InputLabel>
                <Select
                  name="alignment"
                  value={formData.alignment}
                  onChange={handleChange}
                  required
                  label="Alignment"
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 300,
                        width: 250,
                      },
                    },
                  }}
                >
                  {alignments.map(alignment => (
                    <MenuItem key={alignment} value={alignment}>{alignment}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Faith"
                name="faith"
                value={formData.faith}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Lifestyle</InputLabel>
                <Select
                  name="lifestyle"
                  value={formData.lifestyle}
                  onChange={handleChange}
                  required
                  label="Lifestyle"
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 300,
                        width: 250,
                      },
                    },
                  }}
                >
                  {lifestyles.map(lifestyle => (
                    <MenuItem key={lifestyle} value={lifestyle}>{lifestyle}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Languages</InputLabel>
                <Select
                  multiple
                  name="languages"
                  value={formData.languages}
                  onChange={handleChange}
                  required
                  label="Languages"
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 300,
                        width: 250,
                      },
                    },
                  }}
                >
                  {languages.map(language => (
                    <MenuItem key={language} value={language}>{language}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Physical Characteristics
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Hair"
                name="hair"
                value={formData.hair}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Skin"
                name="skin"
                value={formData.skin}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Eyes"
                name="eyes"
                value={formData.eyes}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label={'Height (e.g., 5\'10")'}
                name="height"
                value={formData.height}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Weight (lbs)"
                name="weight"
                type="number"
                value={formData.weight}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Gender</InputLabel>
                <Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  label="Gender"
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 300,
                        width: 250,
                      },
                    },
                  }}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            sx={{ mt: 3 }}
          >
            Next
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default CharacterDetails; 