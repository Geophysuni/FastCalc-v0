import React, { useState } from "react";
import {
  Box,
  Checkbox,
  List,
  ListItemText,
  TextField,
  Button,
  ListItemButton,
  Typography,
  Paper,
} from "@mui/material";
import type { Well, WellProperties } from "../../pages/ScenarioCreatePage";

interface WellsTabProps {
  wells: Well[];
  setWells: React.Dispatch<React.SetStateAction<Well[]>>;
}

type WellPropertyKey = keyof WellProperties;

const DEFAULT_WELL_PROPERTIES: WellProperties = {
  "Дата ввода": "",
  "Стартовый дебит нефти": "",
  "Стартовый дебит жидкости": "",
  "Слой": "",
};

const WellsTab: React.FC<WellsTabProps> = ({ wells, setWells }) => {
  const [selectedWellId, setSelectedWellId] = useState<number | null>(null);
  const [newWellName, setNewWellName] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const selectedWell = wells.find((well) => well.id === selectedWellId);

  const handleToggleActive = (id: number) => {
    setWells((prev) =>
      prev.map((well) => (well.id === id ? { ...well, active: !well.active } : well))
    );
  };

  const handleSelectWell = (id: number) => {
    setSelectedWellId(id);
  };

  const handlePropertyChange = (key: WellPropertyKey, value: string) => {
    if (!selectedWell) return;

    setWells((prev) =>
      prev.map((well) =>
        well.id === selectedWell.id
          ? {
              ...well,
              properties: {
                ...well.properties,
                [key]: value,
              },
            }
          : well
      )
    );
  };

  const handleAddWell = () => {
    if (newWellName.trim() === "") return;

    const newWell: Well = {
      id: Date.now(),
      name: newWellName.trim(),
      active: false,
      properties: { ...DEFAULT_WELL_PROPERTIES },
    };

    setWells((prev) => [...prev, newWell]);
    setNewWellName("");
    setShowAddForm(false);
    setSelectedWellId(newWell.id);
  };

  return (
    <Box display="flex" gap={3} height="100%">
      {/* Левая панель - список скважин */}
      <Box flexBasis="30%" display="flex" flexDirection="column" height="100%">
        <Typography variant="h6">Скважины</Typography>

        <Paper sx={{ height: 400, overflow: 'auto', mt: 1 }}>
          <List dense>
            {wells.map((well) => (
              <ListItemButton
                key={well.id}
                selected={well.id === selectedWellId}
                onClick={() => handleSelectWell(well.id)}
              >
                <Checkbox
                  checked={well.active}
                  onChange={() => handleToggleActive(well.id)}
                  onClick={(e) => e.stopPropagation()}
                />
                <ListItemText 
                  primary={well.name} 
                />
              </ListItemButton>
            ))}
          </List>
        </Paper>

        {showAddForm ? (
          <Box mt={2}>
            <TextField
              label="Имя скважины"
              value={newWellName}
              onChange={(e) => setNewWellName(e.target.value)}
              fullWidth
              size="small"
              autoFocus
            />
            <Box display="flex" gap={1} mt={1}>
              <Button 
                variant="contained" 
                onClick={handleAddWell}
                disabled={!newWellName.trim()}
              >
                Добавить
              </Button>
              <Button 
                variant="outlined" 
                onClick={() => setShowAddForm(false)}
              >
                Отмена
              </Button>
            </Box>
          </Box>
        ) : (
          <Button
            variant="outlined"
            onClick={() => setShowAddForm(true)}
            sx={{ mt: 2 }}
            fullWidth
          >
            Добавить скважину
          </Button>
        )}
      </Box>

      {/* Правая панель - свойства скважины */}
      <Box flexBasis="70%">
        <Typography variant="h6">Свойства скважины</Typography>
        
        {selectedWell ? (
          <Paper sx={{ p: 2, mt: 1 }}>
            {(Object.keys(DEFAULT_WELL_PROPERTIES) as WellPropertyKey[]).map((key) => (
              <Box key={key} display="flex" alignItems="center" mb={2} gap={2}>
                <Typography sx={{ minWidth: "200px" }}>{key}</Typography>
                <TextField
                  value={selectedWell.properties[key] || ""}
                  onChange={(e) => handlePropertyChange(key, e.target.value)}
                  size="small"
                  fullWidth
                />
              </Box>
            ))}
          </Paper>
        ) : (
          <Typography mt={2}>Выберите скважину для редактирования</Typography>
        )}
      </Box>
    </Box>
  );
};

export default WellsTab;