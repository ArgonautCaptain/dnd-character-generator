import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider
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

const randomNames = [
  'Aragorn', 'Gandalf', 'Legolas', 'Gimli', 'Frodo', 'Samwise', 'Merry', 'Pippin',
  'Boromir', 'Faramir', 'Galadriel', 'Elrond', 'Arwen', 'Thorin', 'Bilbo',
  'Drizzt', 'Bruenor', 'Catti-brie', 'Wulfgar', 'Regis', 'Artemis', 'Jarlaxle',
  'Raistlin', 'Caramon', 'Tanis', 'Sturm', 'Flint', 'Tasslehoff', 'Goldmoon',
  'Riverwind', 'Laurana', 'Gilthanas', 'Elistan', 'Tika', 'Otik', 'Fizban'
];

const alignments = [
  'Chaotic Evil', 'Chaotic Neutral', 'Chaotic Good', 'Neutral Evil', 'Pure Neutral',
  'Neutral Good', 'Lawful Evil', 'Lawful Neutral', 'Lawful Good'
];

const lifestyles = [
  'Wretched', 'Squalid', 'Poor', 'Modest', 'Comfortable', 'Wealthy', 'Aristocratic'
];

const languages = [
  'Common', 'Dwarvish', 'Elvish', 'Giant', 'Gnomish', 'Goblin', 'Halfling', 'Orc',
  'Abyssal', 'Celestial', 'Draconic', 'Deep Speech', 'Infernal', 'Primordial',
  'Sylvan', 'Undercommon'
];

const hairColors = [
  'Black', 'Brown', 'Blonde', 'Red', 'White', 'Silver', 'Gray', 'Copper',
  'Golden', 'Auburn', 'Chestnut', 'Platinum', 'Jet Black', 'Raven Black'
];

const skinColors = [
  'Pale', 'Fair', 'Light', 'Medium', 'Olive', 'Tan', 'Brown', 'Dark Brown',
  'Ebony', 'Copper', 'Bronze', 'Golden', 'Ashen', 'Blue-tinted', 'Green-tinted'
];

const eyeColors = [
  'Blue', 'Brown', 'Green', 'Hazel', 'Gray', 'Amber', 'Violet', 'Red',
  'Golden', 'Silver', 'Black', 'White', 'Heterochromatic'
];

const genders = ['male', 'female'];

function CreateCharacter() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    characterName: '',
    race: '',
    class: '',
    background: ''
  });
  const [randomDialogOpen, setRandomDialogOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateRandomAbilityScore = () => {
    const rolls = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1);
    rolls.sort((a, b) => b - a);
    return rolls.slice(0, 3).reduce((sum, roll) => sum + roll, 0);
  };

  const generateRandomHeight = (race) => {
    const baseHeights = {
      'Dragonborn': 66, 'Hill Dwarf': 44, 'Mountain Dwarf': 48, 'High Elf': 57,
      'Wood Elf': 54, 'Eladrin': 57, 'Dark Elf': 54, 'Rock Gnome': 35,
      'Forest Gnome': 35, 'Half-Elf': 57, 'Half-Orc': 58, 'Lightfoot Halfling': 31,
      'Stout Halfling': 31, 'Human': 56, 'Tiefling': 57
    };
    const baseHeight = baseHeights[race] || 56;
    const variation = Math.floor(Math.random() * 12) - 6;
    const totalInches = baseHeight + variation;
    const feet = Math.floor(totalInches / 12);
    const inches = totalInches % 12;
    return `${feet}'${inches}"`;
  };

  const generateRandomWeight = (race) => {
    const baseWeights = {
      'Dragonborn': 250, 'Hill Dwarf': 150, 'Mountain Dwarf': 180, 'High Elf': 130,
      'Wood Elf': 120, 'Eladrin': 130, 'Dark Elf': 120, 'Rock Gnome': 80,
      'Forest Gnome': 75, 'Half-Elf': 140, 'Half-Orc': 180, 'Lightfoot Halfling': 60,
      'Stout Halfling': 65, 'Human': 150, 'Tiefling': 140
    };
    const baseWeight = baseWeights[race] || 150;
    const variation = Math.floor(Math.random() * 40) - 20;
    return baseWeight + variation;
  };

  const generateRandomAge = (race) => {
    const ageRanges = {
      'Dragonborn': [15, 80], 'Hill Dwarf': [50, 350], 'Mountain Dwarf': [50, 350],
      'High Elf': [100, 750], 'Wood Elf': [100, 750], 'Eladrin': [100, 750],
      'Dark Elf': [100, 750], 'Rock Gnome': [40, 500], 'Forest Gnome': [40, 500],
      'Half-Elf': [20, 180], 'Half-Orc': [14, 75], 'Lightfoot Halfling': [20, 150],
      'Stout Halfling': [20, 150], 'Human': [16, 100], 'Tiefling': [16, 100]
    };
    const [min, max] = ageRanges[race] || [16, 100];
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const generateRandomLanguages = (race) => {
    const raceLanguages = {
      'Dragonborn': ['Common', 'Draconic'],
      'Hill Dwarf': ['Common', 'Dwarvish'],
      'Mountain Dwarf': ['Common', 'Dwarvish'],
      'High Elf': ['Common', 'Elvish'],
      'Wood Elf': ['Common', 'Elvish', 'Sylvan'],
      'Eladrin': ['Common', 'Elvish', 'Sylvan'],
      'Dark Elf': ['Common', 'Elvish', 'Undercommon'],
      'Rock Gnome': ['Common', 'Gnomish'],
      'Forest Gnome': ['Common', 'Gnomish', 'Sylvan'],
      'Half-Elf': ['Common', 'Elvish'],
      'Half-Orc': ['Common', 'Orc'],
      'Lightfoot Halfling': ['Common', 'Halfling'],
      'Stout Halfling': ['Common', 'Halfling'],
      'Human': ['Common'],
      'Tiefling': ['Common', 'Infernal']
    };
    const baseLanguages = raceLanguages[race] || ['Common'];
    const additionalLanguages = Math.floor(Math.random() * 2);
    const availableLanguages = languages.filter(lang => !baseLanguages.includes(lang));
    
    for (let i = 0; i < additionalLanguages; i++) {
      if (availableLanguages.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableLanguages.length);
        baseLanguages.push(availableLanguages[randomIndex]);
        availableLanguages.splice(randomIndex, 1);
      }
    }
    return baseLanguages;
  };

  const handleRandomClick = () => {
    setRandomDialogOpen(true);
  };

  const handleRandomConfirm = async () => {
    try {
      const randomRace = races[Math.floor(Math.random() * races.length)];
      const randomCharacter = {
        characterName: randomNames[Math.floor(Math.random() * randomNames.length)],
        race: randomRace,
        class: classes[Math.floor(Math.random() * classes.length)],
        background: backgrounds[Math.floor(Math.random() * backgrounds.length)],
        alignment: alignments[Math.floor(Math.random() * alignments.length)],
        lifestyle: lifestyles[Math.floor(Math.random() * lifestyles.length)],
        languages: generateRandomLanguages(randomRace),
        hair: hairColors[Math.floor(Math.random() * hairColors.length)],
        skin: skinColors[Math.floor(Math.random() * skinColors.length)],
        eyes: eyeColors[Math.floor(Math.random() * eyeColors.length)],
        height: generateRandomHeight(randomRace),
        weight: generateRandomWeight(randomRace),
        age: generateRandomAge(randomRace),
        gender: genders[Math.floor(Math.random() * genders.length)],
        abilityScores: {
          strength: generateRandomAbilityScore(),
          dexterity: generateRandomAbilityScore(),
          constitution: generateRandomAbilityScore(),
          intelligence: generateRandomAbilityScore(),
          wisdom: generateRandomAbilityScore(),
          charisma: generateRandomAbilityScore()
        }
      };

      await api.post("/characters", randomCharacter);
      setRandomDialogOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Error creating random character:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/characters", formData);
      navigate(`/character/${response.data._id}/details`);
    } catch (error) {
      console.error('Error creating character:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
      }
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Create a New Character
        </Typography>
        <Typography variant="body1" gutterBottom align="center">
          --OR--
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={handleRandomClick}
            sx={{ mb: 3 }}
          >
            Generate a Random Character
          </Button>
          <Divider sx={{ mb: 2 }} />

          <TextField
            fullWidth
            label="Character Name"
            name="characterName"
            value={formData.characterName}
            onChange={handleChange}
            required
            margin="normal"
          />

          <FormControl fullWidth margin="normal">
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

          <FormControl fullWidth margin="normal">
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

          <FormControl fullWidth margin="normal">
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

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            sx={{ mt: 3 }}
          >
            Create Character
          </Button>
        </Box>
      </Paper>

      <Dialog
        open={randomDialogOpen}
        onClose={() => setRandomDialogOpen(false)}
      >
        <DialogTitle>Random Character Generation</DialogTitle>
        <DialogContent>
          <Typography>
            Create a completely random character? This will generate random values for all fields.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRandomDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleRandomConfirm} color="primary">
            Generate
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default CreateCharacter; 