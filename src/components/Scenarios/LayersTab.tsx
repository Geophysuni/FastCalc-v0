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
import type { Layer } from "../../pages/ScenarioCreatePage";

const DEFAULT_PROPERTIES = {
  "Плотность": "",
  "Толщина": "",
  "Проницаемость": "",
};

interface LayersTabProps {
  layers: Layer[];
  setLayers: React.Dispatch<React.SetStateAction<Layer[]>>;
}

const LayersTab: React.FC<LayersTabProps> = ({ layers, setLayers }) => {
  const [selectedLayerId, setSelectedLayerId] = useState<number | null>(layers.length > 0 ? layers[0].id : null);
  const [newLayerName, setNewLayerName] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const handleToggleActive = (id: number) => {
    setLayers((prev) =>
      prev.map((layer) => (layer.id === id ? { ...layer, active: !layer.active } : layer))
    );
  };

  const handleSelectLayer = (id: number) => {
    setSelectedLayerId(id);
  };

  const selectedLayer = layers.find((layer) => layer.id === selectedLayerId);

  const handlePropertyChange = (key: string, value: string) => {
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
      properties: { ...DEFAULT_PROPERTIES },
    };

    setLayers((prev) => [...prev, newLayer]);
    setNewLayerName("");
    setShowAddForm(false);
    setSelectedLayerId(newLayer.id);
  };

  const handleSaveProperties = () => {
    alert("Свойства слоя сохранены (мок)");
  };

  const handleSaveAll = () => {
    alert("Вся конфигурация слоёв сохранена (мок)");
  };

  return (
    <Box display="flex" gap={3} height="100%">
      {/* Левый блок - Список слоёв */}
      <Box flexBasis="30%" display="flex" flexDirection="column" height="100%">
        <Typography variant="h6">Слои</Typography>

        <Paper
          variant="outlined"
          sx={{
            flex: 1,
            overflowY: "auto",
            maxHeight: 400,
            p: 1,
            mt: 1,
          }}
        >
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

        {/* Кнопка добавления слоя */}
        {showAddForm ? (
          <Box mt={2}>
            <TextField
              label="Имя слоя"
              value={newLayerName}
              onChange={(e) => setNewLayerName(e.target.value)}
              fullWidth
              size="small"
            />
            <Button variant="contained" onClick={handleAddLayer} sx={{ mt: 1 }}>
              Сохранить
            </Button>
          </Box>
        ) : (
          <Button variant="outlined" onClick={() => setShowAddForm(true)} sx={{ mt: 2 }}>
            Добавить слой
          </Button>
        )}

        {/* Кнопка сохранения конфигурации (теперь под кнопкой добавления) */}
        <Button
          variant="outlined"
          color="primary"
          onClick={handleSaveAll}
          sx={{ mt: 2, width: '100%' }}  // mt={2} добавляет отступ сверху
        >
          Сохранить конфигурацию слоёв и перейти к скважинам
        </Button>
      </Box>

      {/* Правый блок - Свойства выбранного слоя */}
      <Box flexBasis="70%" display="flex" flexDirection="column" height="100%">
        <Typography variant="h6">Свойства слоя</Typography>

        {selectedLayer ? (
          <>
            <Box flex={1} mt={2}>
              {Object.entries(DEFAULT_PROPERTIES).map(([key]) => (
                <Box key={key} display="flex" alignItems="center" mb={2} gap={2}>
                  <Typography sx={{ minWidth: "150px" }}>{key}</Typography>
                  <TextField
                    value={selectedLayer.properties?.[key] ?? ""}
                    onChange={(e) => handlePropertyChange(key, e.target.value)}
                    size="small"
                    fullWidth
                  />
                </Box>
              ))}
              {/* Кнопка сохранения параметров слоя (в правой части) */}
              <Box display="flex" justifyContent="flex-end" mt="auto">
                <Button variant="contained" onClick={handleSaveProperties}>
                  Сохранить параметры слоя
                </Button>
              </Box>
            </Box>

            
          </>
        ) : (
          <Typography mt={2}>Выберите слой для редактирования</Typography>
        )}
      </Box>
    </Box>
  );
};
export default LayersTab;
