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
  Grid,
  Tabs,
  Tab
} from '@mui/material';
import api from '../api/apiClient';

const races = [
  'Dragonborn', 'Hill Dwarf', 'Mountain Dwarf', 'High Elf', 'Wood Elf', 'Eladrin', 'Dark Elf',
  'Rock Gnome', 'Forest Gnome', 'Half-Elf', 'Half-Orc', 'Lightfoot Halfling', 'Stout Halfling',
  'Human', 'Tiefling'
];

const classes = [
  'Artificer', 'Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin',
  'Ranger', 'Rogue', 'Sorcerer', 'Warlock', 'Wizard'
];

const backgrounds = [
  'Acolyte', 'Charlatan', 'Criminal', 'Entertainer', 'Folk Hero', 'Guild Artisan',
  'Hermit', 'Noble', 'Outlander', 'Sage', 'Sailor', 'Soldier', 'Urchin'
];

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

function EditCharacter() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    characterName: '',
    race: '',
    class: '',
    background: '',
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
    gender: '',
    abilityScores: {
      strength: '',
      dexterity: '',
      constitution: '',
      intelligence: '',
      wisdom: '',
      charisma: ''
    }
  });

  useEffect(() => {
    fetchCharacter();
  }, [id]);

  const fetchCharacter = async () => {
    try {
      const response = await api.get(`/characters/${id}`);
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching character:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('abilityScores.')) {
      const ability = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        abilityScores: {
          ...prev.abilityScores,
          [ability]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/characters/${id}`, formData);
      navigate(`/character/${id}`);
    } catch (error) {
      console.error('Error updating character:', error);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Edit Character
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab label="Basic Information" />
            <Tab label="Character Details" />
            <Tab label="Ability Scores" />
          </Tabs>
        </Box>

        <Box component="form" onSubmit={handleSubmit}>
          {activeTab === 0 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Character Name"
                  name="characterName"
                  value={formData.characterName}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Race</InputLabel>
                  <Select
                    name="race"
                    value={formData.race}
                    onChange={handleChange}
                    required
                    label="Race"
                  >
                    {races.map(race => (
                      <MenuItem key={race} value={race}>{race}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Class</InputLabel>
                  <Select
                    name="class"
                    value={formData.class}
                    onChange={handleChange}
                    required
                    label="Class"
                  >
                    {classes.map(cls => (
                      <MenuItem key={cls} value={cls}>{cls}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Background</InputLabel>
                  <Select
                    name="background"
                    value={formData.background}
                    onChange={handleChange}
                    required
                    label="Background"
                  >
                    {backgrounds.map(background => (
                      <MenuItem key={background} value={background}>{background}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          )}

          {activeTab === 1 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Alignment</InputLabel>
                  <Select
                    name="alignment"
                    value={formData.alignment}
                    onChange={handleChange}
                    required
                    label="Alignment"
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
                  >
                    {languages.map(language => (
                      <MenuItem key={language} value={language}>{language}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          )}

          {activeTab === 2 && (
            <Grid container spacing={3}>
              {Object.entries(formData.abilityScores).map(([ability, value]) => (
                <Grid item xs={12} md={6} key={ability}>
                  <TextField
                    fullWidth
                    label={ability.charAt(0).toUpperCase() + ability.slice(1)}
                    name={`abilityScores.${ability}`}
                    type="number"
                    value={value}
                    onChange={handleChange}
                    required
                  />
                </Grid>
              ))}
            </Grid>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            sx={{ mt: 3 }}
          >
            Save Changes
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default EditCharacter; 