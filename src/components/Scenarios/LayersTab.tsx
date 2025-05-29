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
import type { Layer, LayerProperties } from "../../pages/ScenarioCreatePage";

interface LayersTabProps {
  layers: Layer[];
  setLayers: React.Dispatch<React.SetStateAction<Layer[]>>;
}

// Явно определяем ключи свойств слоя
type LayerPropertyKey = keyof LayerProperties;

const DEFAULT_LAYER_PROPERTIES: LayerProperties = {
  "Плотность": "",
  "Толщина": "",
  "Проницаемость": "",
  "Пористость":"",
};

const LayersTab: React.FC<LayersTabProps> = ({ layers, setLayers }) => {
  const [selectedLayerId, setSelectedLayerId] = useState<number | null>(null);
  const [newLayerName, setNewLayerName] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const selectedLayer = layers.find((layer) => layer.id === selectedLayerId);

  const handleToggleActive = (id: number) => {
    setLayers((prev) =>
      prev.map((layer) => (layer.id === id ? { ...layer, active: !layer.active } : layer))
    );
  };

  const handleSelectLayer = (id: number) => {
    setSelectedLayerId(id);
  };

  // Типизированная версия обработчика изменений
  const handlePropertyChange = (key: LayerPropertyKey, value: string) => {
    if (!selectedLayer) return;

    setLayers((prev) =>
      prev.map((layer) =>
        layer.id === selectedLayer.id
          ? {
              ...layer,
              properties: {
                ...layer.properties,
                [key]: value,
              },
            }
          : layer
      )
    );
  };

  const handleAddLayer = () => {
    if (newLayerName.trim() === "") return;

    const newLayer: Layer = {
      id: Date.now(),
      name: newLayerName.trim(),
      active: false,
      properties: { ...DEFAULT_LAYER_PROPERTIES },
    };

    setLayers((prev) => [...prev, newLayer]);
    setNewLayerName("");
    setShowAddForm(false);
    setSelectedLayerId(newLayer.id);
  };

  return (
    <Box display="flex" gap={3} height="100%">
      {/* Левая панель - список слоев */}
      <Box flexBasis="30%" display="flex" flexDirection="column" height="100%">
        <Typography variant="h6">Слои</Typography>

        <Paper sx={{ height: 400, overflow: 'auto', mt: 1 }}>
          <List dense>
            {layers.map((layer) => (
              <ListItemButton
                key={layer.id}
                selected={layer.id === selectedLayerId}
                onClick={() => handleSelectLayer(layer.id)}
              >
                <Checkbox
                  checked={layer.active}
                  onChange={() => handleToggleActive(layer.id)}
                  onClick={(e) => e.stopPropagation()}
                />
                <ListItemText primary={layer.name} />
              </ListItemButton>
            ))}
          </List>
        </Paper>

        {showAddForm ? (
          <Box mt={2}>
            <TextField
              label="Имя слоя"
              value={newLayerName}
              onChange={(e) => setNewLayerName(e.target.value)}
              fullWidth
              size="small"
              autoFocus
            />
            <Box display="flex" gap={1} mt={1}>
              <Button 
                variant="contained" 
                onClick={handleAddLayer}
                disabled={!newLayerName.trim()}
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
            Добавить слой
          </Button>
        )}
      </Box>

      {/* Правая панель - свойства слоя */}
      <Box flexBasis="70%">
        <Typography variant="h6">Свойства слоя</Typography>
        
        {selectedLayer ? (
          <Paper sx={{ p: 2, mt: 1 }}>
            {(Object.keys(DEFAULT_LAYER_PROPERTIES) as LayerPropertyKey[]).map((key) => (
              <Box key={key} display="flex" alignItems="center" mb={2} gap={2}>
                <Typography sx={{ minWidth: "150px" }}>{key}</Typography>
                <TextField
                  value={selectedLayer.properties[key] || ""}
                  onChange={(e) => handlePropertyChange(key, e.target.value)}
                  size="small"
                  fullWidth
                />
              </Box>
            ))}
          </Paper>
        ) : (
          <Typography mt={2}>Выберите слой для редактирования</Typography>
        )}
      </Box>
    </Box>
  );
};

export default LayersTab;