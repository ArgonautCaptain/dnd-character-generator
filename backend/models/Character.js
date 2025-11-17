const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
  // Basic Information
  characterName: { type: String, required: true },
  race: { 
    type: String, 
    required: true,
    enum: ['Dragonborn', 'Hill Dwarf', 'Mountain Dwarf', 'High Elf', 'Wood Elf', 'Eladrin', 'Dark Elf', 
           'Rock Gnome', 'Forest Gnome', 'Half-Elf', 'Half-Orc', 'Lightfoot Halfling', 'Stout Halfling', 
           'Human', 'Tiefling']
  },
  class: { 
    type: String, 
    required: true,
    enum: ['Artificer', 'Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin', 
           'Ranger', 'Rogue', 'Sorcerer', 'Warlock', 'Wizard']
  },
  background: { 
    type: String, 
    required: true,
    enum: ['Acolyte', 'Charlatan', 'Criminal', 'Entertainer', 'Folk Hero', 'Guild Artisan', 
           'Hermit', 'Noble', 'Outlander', 'Sage', 'Sailor', 'Soldier', 'Urchin']
  },

  // Character Details
  alignment: { 
    type: String, 
    required: false,
    enum: ['Chaotic Evil', 'Chaotic Neutral', 'Chaotic Good', 'Neutral Evil', 'Pure Neutral', 
           'Neutral Good', 'Lawful Evil', 'Lawful Neutral', 'Lawful Good']
  },
  faith: { type: String, required: false },
  lifestyle: { 
    type: String, 
    required: false,
    enum: ['Wretched', 'Squalid', 'Poor', 'Modest', 'Comfortable', 'Wealthy', 'Aristocratic']
  },
  languages: [{ 
    type: String,
    required: false,
    enum: ['Common', 'Dwarvish', 'Elvish', 'Giant', 'Gnomish', 'Goblin', 'Halfling', 'Orc', 
           'Abyssal', 'Celestial', 'Draconic', 'Deep Speech', 'Infernal', 'Primordial', 
           'Sylvan', 'Undercommon']
  }],

  // Physical Characteristics
  hair: { type: String, required: false },
  skin: { type: String, required: false },
  eyes: { type: String, required: false },
  height: { type: String, required: false },
  weight: { type: Number, required: false },
  age: { type: Number, required: false },
  gender: { 
    type: String, 
    required: false,
    enum: ['male', 'female']
  },

  // Ability Scores
  abilityScores: {
    strength: { type: Number, required: false },
    dexterity: { type: Number, required: false },
    constitution: { type: Number, required: false },
    intelligence: { type: Number, required: false },
    wisdom: { type: Number, required: false },
    charisma: { type: Number, required: false }
  }
}, { timestamps: true });

module.exports = mongoose.model('Character', characterSchema); 